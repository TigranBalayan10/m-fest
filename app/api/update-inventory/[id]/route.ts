import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any, { params }: { params: any }) {
  const id = params.id;
  // Parse the body of the request
  let carData = await request.json();
  console.log({ id }, "id");
  console.log({ carData }, "carData"); // Log the carData object

  const updatedCar = await prisma.carList.update({
    where: { id: id },
    data: { ...carData },
  });
  console.log({ updatedCar }, "updatedCar");
  return NextResponse.json({ updatedCar });
}
