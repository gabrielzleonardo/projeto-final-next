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
  

  return NextResponse.json(data);
}
