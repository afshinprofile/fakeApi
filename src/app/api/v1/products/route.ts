import { getProductsWithBlurHash } from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsWithPlaceholders = await getProductsWithBlurHash();
    const response = new NextResponse(
      JSON.stringify(productsWithPlaceholders),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET", 
          "Access-Control-Allow-Headers": "Content-Type", 
          "Access-Control-Allow-Credentials": "true", 
        },
      }
    );

    return response;
  } catch (error) {
    const response = new NextResponse(
      JSON.stringify({ error: `Failed to fetch products: ${error}` }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", 
        },
      }
    );

    return response;
  }
}

export const dynamic = "force-dynamic";
