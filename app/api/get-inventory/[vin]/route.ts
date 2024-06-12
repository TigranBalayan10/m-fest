import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: any,
  { params }: { params: { vin: string } }
) {
  const carVin = params.vin;

  try {
    const getCarByVin = await prisma.carList.findUnique({
      where: { vin: carVin },
    });

    if (!getCarByVin) {
      return NextResponse.json(
        { message: "No car found with the provided VIN" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: getCarByVin });
  } catch (error) {
    console.error("Error fetching car by VIN:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching car information" },
      { status: 500 }
    );
  }
}
