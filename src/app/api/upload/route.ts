import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req:Request, res:Response) {
  const imageUploaded = await getImage(req);

  const imageData = await uploadImage(imageUploaded.path);

  const result = await prisma.image.create({
    data: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
  });

  res.json(result);
}