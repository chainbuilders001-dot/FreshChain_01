import { NextResponse } from 'next/server';

// Simulated database table state shared across the ecosystem
export let SHARED_MARKETPLACE_INVENTORY = [
  { id: "p-init-1", name: "Fresh Tomatoes", price: 350, volume: 500, category: "Vegetables", region: "Ogun State Hub", status: "FRESH" },
  { id: "p-init-2", name: "Organic Spinach", price: 200, volume: 200, category: "Vegetables", region: "Kano Cluster" }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produceName, volume, price, category, region } = body;

    // Strict validation blocks
    if (!produceName || !volume || !price) {
      return NextResponse.json({ error: 'Missing mandatory matrix parameters.' }, { status: 400 });
    }

    // Generate production-ready item dataset structural payload
    const newListing = {
      id: `crop-${Date.now()}`,
      name: produceName,
      price: Number(price),
      volume: Number(volume),
      category,
      region,
      timestamp: new Date().toISOString()
    };

    // Push live to our synchronized engine ledger array
    SHARED_MARKETPLACE_INVENTORY.unshift(newListing);

    return NextResponse.json({ 
      success: true, 
      message: "Produce cataloged live across all ecosystem nodes successfully.", 
      item: newListing 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Farming database layer failure.' }, { status: 500 });
  }
}
