import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { appError } from "@/utils/AppError";

const tempFolder = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "temp"
);

const handleImageUpload = async (image: File) => {
  if (!image) {
    return appError("Imagem não encontrada");
  }
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
  }
  const bytes = await image.arrayBuffer();

  const buffer = Buffer.from(bytes);
  const fileHash = crypto.randomBytes(16).toString("hex");
  const fileName = `${fileHash}-${image.name}`;
  const imagePath = path.join(tempFolder, fileName);
  try {
    await writeFile(imagePath, buffer);
  } catch (error) {
    return appError("Erro ao salvar imagem");
  }
  return fileName;
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image: File | null = formData.get("image") as unknown as File;
  const imageName = await handleImageUpload(image);

  return NextResponse.json(imageName);
}
