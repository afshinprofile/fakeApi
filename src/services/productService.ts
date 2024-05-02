import prisma from "../../prisma/client";
import { generateBlurHashFromUrl } from "../utils/blurhash";

export async function getProductsWithBlurHash() {
  try {
    const products = await prisma.product.findMany();

    const productsWithPlaceholders = await Promise.all(
      products.map(async (product) => {
        const blurHash = await generateBlurHashFromUrl(product.img_url);
        return {
          ...product,
          img_placeholder: blurHash || "",
        };
      })
    );

    return productsWithPlaceholders;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
