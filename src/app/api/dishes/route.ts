import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { appError } from "@/utils/AppError";

const dishesImagesFolder = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "public",
  "dishes-images"
);

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const image: File | null = data.get("image") as unknown as File;
  if (!image) {
    return appError("Imagem não encontrada");
  }
  if (!fs.existsSync(dishesImagesFolder)) {
    fs.mkdirSync(dishesImagesFolder);
  }
  const bytes = await image.arrayBuffer();

  const buffer = Buffer.from(bytes);
  const fileHash = crypto.randomBytes(16).toString("hex");
  const fileName = `${fileHash}-${image.name}`;
  const imagePath = path.join(dishesImagesFolder, fileName);
  try {
    await writeFile(imagePath, buffer);
  } catch (error) {
    return appError("Erro ao salvar imagem");
  }
  return NextResponse.json({ success: true });
}
