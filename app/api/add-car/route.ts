import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const {
    model,
    make,
    description,
    price,
    milage,
    vin,
    drivetrain,
    transmission,
    engine,
    mpg,
    year,
    exteriorInterior,
    imageUrls,
    isHot,
    isSold,
  } = res.values;

  try {
    // Check if a car with the same VIN already exists
    const existingCar = await prisma.carList.findUnique({
      where: { vin },
    });

    if (existingCar) {
      return NextResponse.json(
        { message: "A car with this VIN already exists. Please check VIN and try again" },
        { status: 400 }
      );
    }

    const result = await prisma.carList.create({
      data: {
        model,
        make,
        description,
        price,
        milage,
        vin,
        drivetrain,
        transmission,
        engine,
        mpg,
        year,
        exteriorInterior,
        imageUrls,
        isHot,
        isSold,
      },
    });

    return NextResponse.json({ result, message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the car" },
      { status: 500 }
    );
  }
}
