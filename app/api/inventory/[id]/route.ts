import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: any,
  { params }: { params: { id: string } }
) {
  const carId = params.id;
  const getCarById = await prisma.carList.findUnique({
    where: { id: carId },
  });
  return NextResponse.json({ getCarById });
}
