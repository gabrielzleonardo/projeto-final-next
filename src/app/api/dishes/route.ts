import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { appError } from "@/utils/AppError";
import prisma from "@/lib/prisma";
import { uploadFolder, tempFolder } from "@/utils/folders/paths";

// export async function GET(request: NextRequest) {
//   const dish = await prisma.dish.findUnique({
//     where: {
//       id: 1,
//     },
//   });

//   return NextResponse.json(dish);
// }

const moveFile = async (file: string) => {
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  await writeFile(
    path.resolve(uploadFolder, file),
    fs.readFileSync(path.resolve(tempFolder, file))
  ).then(() => {
    fs.unlinkSync(path.resolve(tempFolder, file));
  });
};

export async function POST(request: NextRequest) {
  const { name, category, ingredients, price, description, image } =
    await request.json();
  if (!category) return appError("Categoria não informada");
  const categoryId = await prisma.category
    .findUnique({
      where: {
        value: category,
      },
    })
    .then((category) => category!.id);

    ingredients.forEach(async (ingredient: string) => {
      const ingredientId = await prisma.ingredient
        .findUnique({
          where: {
            name: ingredient,
          },
        })
        .then((ingredient) => ingredient!.id);
      await prisma.ingredientsOnDishes.create({
        data: {
          ingredientId,
          dishId: 1,
        },
      });
    }
  );

  const dish = await prisma.dish.create({
    data: {
      name,
      categoryId,
      image,
      price,
      description,
    },
  });

  moveFile(image);

  // create a funciton to move the file to the public folder

  return NextResponse.json(dish);
}
