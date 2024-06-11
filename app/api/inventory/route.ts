import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateAll, revalidateInventory } from "@/lib/actions";

export async function GET() {
  try {
    const carData = await prisma.carList.findMany({
      where: {
        isArchive: false,
      },
      orderBy: [
        {
          isHot: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
    revalidateAll();
    console.log("Revalidated inventory page.");
    return NextResponse.json({ carData });
  } catch (error) {
    console.error("Error fetching car data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching car data" },
      { status: 500 }
    );
  }
}
