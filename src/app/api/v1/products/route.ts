import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
