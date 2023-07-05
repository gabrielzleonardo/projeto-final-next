import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export async function GET() {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 8);
  if (
    validator.isEmpty(name) ||
    validator.isEmpty(email) ||
    validator.isEmpty(password)
  ) {
    return NextResponse.json({
      message: "Preencha todos os campos",
    });
  }

  if (!validator.isEmail(email)) {
    return NextResponse.json({
      message: "Email inválido",
    });
  }
  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
