import { getProductsWithBlurHash } from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const req = request;
  try {
    const productsWithPlaceholders = await getProductsWithBlurHash();
    return NextResponse.json(productsWithPlaceholders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products: " + error },
      { status: 500 }
    );
  }
}
