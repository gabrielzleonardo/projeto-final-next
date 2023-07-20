import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { getImage } from "@/lib/formidable";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(request: Request) {
  const imageUploaded = await getImage(request);

  const imageData = await uploadImage(imageUploaded.path);

  const result = await prisma.image.create({
    data: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
  });

  NextResponse.json(result);
}
