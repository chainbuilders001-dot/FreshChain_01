import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";
import { Category } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryQuery = searchParams.get("category");

    const filter: { category?: Category } = {};
    if (categoryQuery && Object.values(Category).includes(categoryQuery as Category)) {
      filter.category = categoryQuery as Category;
    }

    const products = await prisma.product.findMany({
      where: filter,
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve product inventory listings.", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      pricePerUnit,
      stockQuantity,
      harvestDate,
      farmerId,
    } = body;

    if (!title || !category || !pricePerUnit || !stockQuantity || !harvestDate || !farmerId) {
      return NextResponse.json(
        { error: "Missing required listing payload attributes." },
        { status: 400 }
      );
    }

    // Dynamic freshness score algorithm based on actual harvest elapsed time
    const harvestTime = new Date(harvestDate).getTime();
    const currentTime = Date.now();
    const hoursElapsed = Math.max(0, (currentTime - harvestTime) / (1000 * 60 * 60));
    
    // Linear decay model: starts at 100, drops 0.5 points per hour since harvesting
    const calculatedFreshnessScore = Math.max(0, Math.min(100, Math.round(100 - hoursElapsed * 0.5)));

    // Simulating block generation step for supply chain immutability ledger
    const blockchainHash = "0x" + Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    const newProduct = await prisma.product.create({
      data: {
        title,
        description: description || "",
        category: category as Category,
        pricePerUnit: parseFloat(pricePerUnit),
        stockQuantity: parseFloat(stockQuantity),
        freshnessScore: calculatedFreshnessScore,
        harvestDate: new Date(harvestDate),
        blockchainHash,
        farmerId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to secure and register product record.", details: error.message },
      { status: 500 }
    );
  }
}
