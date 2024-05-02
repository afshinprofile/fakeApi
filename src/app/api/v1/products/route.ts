import { getProductsWithBlurHash } from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsWithPlaceholders = await getProductsWithBlurHash();
    return NextResponse.json(productsWithPlaceholders);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
