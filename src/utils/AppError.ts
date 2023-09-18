import { NextResponse } from "next/server";
export const appError = (message: string, statusCode: number = 400) => {
  return NextResponse.json({
    message,
    code: statusCode,
  });
};
