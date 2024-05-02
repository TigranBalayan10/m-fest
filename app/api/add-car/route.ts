import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { title, make, description, price, milage, vin, year, exteriorInterior, imageUrls } = res.values;
  console.log(res);
  const result = await prisma.carList.create({
    data: {
      title,
      make,
      description,
      price,
      milage,
      vin,
      year,
      exteriorInterior,
      imageUrls
    },
  });
  return NextResponse.json({ result });
}
