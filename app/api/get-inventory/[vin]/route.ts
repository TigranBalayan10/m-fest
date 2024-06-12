import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: any,
  { params }: { params: { vin: string } }
) {
  const carVin = params.vin;
  const getCarByVin = await prisma.carList.findUnique({
    where: { vin: carVin },
  });

  console.log(getCarByVin);
  return NextResponse.json({ getCarByVin });
}
