import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";

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
  const file: File | null = data.get("image") as unknown as File;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  if (!fs.existsSync(dishesImagesFolder)) {
    fs.mkdirSync(dishesImagesFolder);
  }
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);
  const fileHash = crypto.randomBytes(16).toString("hex");
  const fileName = `${fileHash}-${file.name}`;
  const imagePath = path.join(dishesImagesFolder, fileName);
  try {
    await writeFile(imagePath, buffer);
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  console.log(`open ${imagePath} to see the uploaded file`);
  return NextResponse.json({ imagePath });
}
