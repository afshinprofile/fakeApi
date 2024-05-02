import prisma from "../../prisma/client";
import { generateBlurHashFromUrl } from "../utils/blurhash";

// تابع برای دریافت محصولات و افزودن img_placeholder
export async function getProductsWithBlurHash() {
  try {
    const products = await prisma.product.findMany();

    // افزودن img_placeholder به محصولات
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
