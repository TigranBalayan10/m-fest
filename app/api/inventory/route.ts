import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const carData = await prisma.carList.findMany();
  return NextResponse.json({ carData });
}
