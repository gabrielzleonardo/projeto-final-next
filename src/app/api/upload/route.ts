import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { appError } from "@/utils/AppError";
import { uploadFolder, tempFolder } from "@/utils/folders/paths";

const handleFileUpload = async (file: File) => {
  if (!file) {
    return appError("Imagem não encontrada");
  }
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileHash = crypto.randomBytes(16).toString("hex");
  const fileName = `${fileHash}-${file.name}`;
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
  const file: File | null = formData.get("file") as unknown as File;
  const fileName = await handleFileUpload(file);

  return NextResponse.json(fileName);
}
