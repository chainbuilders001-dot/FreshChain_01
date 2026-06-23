import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { OrderStatus, EscrowStatus } from "@prisma/client";

// Core webhook signature check for high-trust production routing
const FLUTTERWAVE_WEBHOOK_HASH = process.env.FLUTTERWAVE_SECRET_HASH || "FLW_SECRET_WEBHOOK_HASH";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify webhook source credibility using standard Flutterwave verification headers
    const signature = request.headers.get("verif-hash");
    if (!signature || signature !== FLUTTERWAVE_WEBHOOK_HASH) {
      console.warn("WARNING: Unauthorized or missing Flutterwave signature hash mismatch attempt.");
      return NextResponse.json(
        { error: "Invalid cryptographic verification credentials." },
        { status: 401 }
      );
    }

    const payload = await request.json();
    console.log("Flutterwave webhook event received:", payload);

    const { event, data } = payload;

    // Check if the charge was completed successfully
    if (event !== "charge.completed" || data?.status !== "successful") {
      return NextResponse.json(
        { status: "IGNORED", message: "Only successful charges are processed." },
        { status: 200 }
      );
    }

    // Attempt to locate order by metadata orderId or by payment reference tracking ID
    const orderId = data.meta?.orderId || data.tx_ref;
    if (!orderId) {
      return NextResponse.json(
        { error: "Missing tracking order reference identifiers." },
        { status: 400 }
      );
    }

    // 2. Perform atomic database updates inside a secure Prisma Transaction block
    const transactionResult = await prisma.$transaction(async (tx) => {
      // Look up target order
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } },
      });

      if (!order) {
        throw new Error(`Order with ID ${orderId} does not exist in the database.`);
      }

      // Check if order is already processed to prevent duplicate wallet increments
      if (order.status === OrderStatus.PAID) {
        return { status: "ALREADY_PROCESSED", orderId: order.id };
      }

      // a) Update Order model status to PAID
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.PAID },
      });

      // b) Create EscrowTransaction logger entry validating Flutterwave payload references
      const escrowLog = await tx.escrowTransaction.create({
        data: {
          referenceHash: data.tx_ref || `TX-${Date.now()}`,
          flutterwaveRef: String(data.flw_ref || data.id),
          status: EscrowStatus.IN_ESCROW,
          amount: Number(data.amount),
          orderId: order.id,
        },
      });

      // c) Credit the farmer's internal digital wallet balance state
      for (const item of order.items) {
        const lineItemHarvestAmount = item.price * item.quantity;
        
        await tx.user.update({
          where: { id: item.product.farmerId },
          data: {
            walletBalance: {
              increment: lineItemHarvestAmount,
            },
          },
        });
      }

      return { status: "SUCCESS_VERIFIED", orderId: order.id, escrowId: escrowLog.id };
    });

    return NextResponse.json(
      { message: "Transaction processed successfully.", details: transactionResult },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Flutterwave webhook routing exception triggered:", error);
    return NextResponse.json(
      { error: "Webhook ingestion loop failure.", errorMsg: error.message },
      { status: 500 }
    );
  }
}
