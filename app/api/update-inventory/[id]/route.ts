import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any, { params }: { params: any }) {
  const id = params.id;
  // Parse the body of the request
  let res = await request.json();
  const {
    model,
    make,
    description,
    price,
    milage,
    vin,
    year,
    exteriorInterior,
    imageUrls,
    isHot,
    isSold,
  } = res.values;

  const updatedCar = await prisma.carList.update({
    where: { id: id },
    data: {
      model,
      make,
      description,
      price,
      milage,
      vin,
      year,
      exteriorInterior,
      imageUrls,
      isHot,
      isSold,
    },
  });
  return NextResponse.json({ updatedCar, message: "Car updated successfully"});
}
