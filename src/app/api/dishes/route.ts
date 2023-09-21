import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { appError } from "@/utils/AppError";

const handleDishImage = async (image: File) => {
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
  return fileName;
};

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
  const data =  request.body
  console.log(data)


  // const image: File | null = data.get("image") as unknown as File;
  // const price = data.get("price") as string;
  // const name = data.get("name") as string;
  // const description = data.get("description") as string;
  // const category = data.get("category") as string;
  // const ingredients = data.get("ingredients") as string;

  // const imageName = handleDishImage(image);

  return NextResponse.json(data);
}
