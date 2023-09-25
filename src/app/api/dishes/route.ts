import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { appError } from "@/utils/AppError";
import prisma from "@/lib/prisma";
import { uploadFolder, tempFolder } from "@/utils/folders/paths";

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

// export async function GET(request: NextRequest) {
//   const dish = await prisma.dish.findUnique({
//     where: {
//       id: 1,
//     },
//   });

//   return NextResponse.json(dish);
// }

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, category, ingredients, price, description, image, id } = data;

  if (!category) return appError("Categoria não informada");
  const categoryId = await prisma.category
    .findUnique({
      where: {
        value: category,
      },
    })
    .then((category) => category!.id);

  const dish = await prisma.dish.create({
    data: {
      name,
      categoryId,
      image,
      price,
      description,
    },
  });

  ingredients.forEach(async (ingredient: string) => {
    try {
      const ing = await prisma.ingredient.upsert({
        where: {
          name: ingredient,
        },
        update: {},
        create: {
          name: ingredient,
        },
      });

      await prisma.ingredientsOnDishes.upsert({
        where: {
          ingredientId_dishId: {
            ingredientId: ing.id,
            dishId: dish.id,
          },
        },
        update: {},
        create: {
          ingredientId: ing.id,
          dishId: dish.id,
        },
      });
    } catch (error: any) {
      return appError(error);
    }
  });

  moveFile(image);

  return NextResponse.json(dish);
}
