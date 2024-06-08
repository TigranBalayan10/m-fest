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
  return NextResponse.json({ result });
}
