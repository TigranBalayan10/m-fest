import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    console.log("Received search parameters:", res);

    const { model, make, year, milage, priceRange } = res;
    const where: Prisma.CarListWhereInput = {};

    if (model) {
      where.model = { contains: model };
    }
    if (make) {
      where.make = { contains: make };
    }
    if (year) {
      where.year = { equals: parseInt(year) };
    }
    if (milage) {
      const mileageValue = parseInt(milage.replace(/[<,]/g, ""));
      where.milage = { lte: mileageValue };
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.match(/\d+/g)?.map(Number) || [];
      if (minPrice && maxPrice) {
        where.price = { gte: minPrice, lte: maxPrice };
      } else {
        console.warn("Invalid priceRange format:", priceRange);
      }
    }

    console.log("Prisma query:", where);

    const result = await prisma.carList.findMany({
      where,
    });

    console.log("Search results:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in search route:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the search request" },
      { status: 500 }
    );
  }
}
