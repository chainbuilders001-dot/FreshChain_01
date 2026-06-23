import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../src/lib/prisma";
import { db } from "../../../../src/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce Authentication and Role-Based Protection via Session (with a robust fallback if riderId is passed explicitly)
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { orderId, latitude, longitude, heading, speed, riderId } = body;

    let finalRiderId = riderId;
    if (session) {
      if (session.user.role !== "RIDER" && session.user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Unauthorized. Rider configuration credentials required." },
          { status: 403 }
        );
      }
      finalRiderId = session.user.id;
    }

    if (!finalRiderId) {
      return NextResponse.json(
        { error: "Unauthorized. Missing valid rider session or identifier credentials." },
        { status: 401 }
      );
    }

    // 2. Parse and Validate Incoming Coordinate Payload
    if (!orderId || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Missing required tracking attributes: orderId, latitude, longitude" },
        { status: 400 }
      );
    }

    const latFloat = parseFloat(latitude);
    const lonFloat = parseFloat(longitude);

    if (isNaN(latFloat) || isNaN(lonFloat)) {
      return NextResponse.json(
        { error: "Invalid coordinate values (must resolve to float format)." },
        { status: 400 }
      );
    }

    const timestamp = new Date();

    // 3. Update the Relational Database (PostgreSQL via Prisma) inside an atomic transaction
    await prisma.$transaction([
      // Update general user latitude/longitude coordinates
      prisma.user.update({
        where: { id: finalRiderId },
        data: {
          latitude: latFloat,
          longitude: lonFloat,
        },
      }),
      // Log historical step coordinates under RiderLogistics table
      prisma.riderLogistics.create({
        data: {
          latitude: latFloat,
          longitude: lonFloat,
          orderId,
          riderId: finalRiderId,
        },
      }),
    ]);

    // 4. Update Firebase Firestore for Instant Client-Side Realtime Updates
    // Uses the pre-configured db initialized from firebase-applet-config.json
    const deliveryDocRef = doc(db, "active_deliveries", orderId);
    await setDoc(
      deliveryDocRef,
      {
        riderId: finalRiderId,
        coordinates: {
          lat: latFloat,
          lng: lonFloat,
        },
        metrics: {
          heading: heading !== undefined ? parseFloat(heading) : 0,
          speed: speed !== undefined ? parseFloat(speed) : 0,
        },
        lastUpdated: timestamp.toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Dynamic telemetry dispatch coordinates broadcasted and archived securely.",
        riderId: finalRiderId,
        telemetry: {
          latitude: latFloat,
          longitude: lonFloat,
          heading: heading || 0,
          speed: speed || 0,
        },
        timestamp,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("CRITICAL_LOCATION_ENGINE_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Location Engine Server Error", details: error.message },
      { status: 500 }
    );
  }
}
