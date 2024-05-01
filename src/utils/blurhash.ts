import { encode } from "blurhash";
import sharp from "sharp";

export async function generateBlurHashFromUrl(
  imageUrl: string
): Promise<string | undefined> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const resizedImage = await sharp(imageBuffer)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer({ resolveWithObject: true });

    const { data, info } = resizedImage;
    const blurHash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      4
    );

    return blurHash;
  } catch (error) {
    console.error("Error generating BlurHash:", error);
    return undefined;
  }
}
