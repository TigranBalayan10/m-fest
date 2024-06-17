import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any) {
  let res = await request.json();

  const ids = res.ids;
  try {
    const archivedCar = await prisma.carList.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isArchive: true,
      },
    });
    console.log("Archived cars successfully.");
    return NextResponse.json(archivedCar);
  } catch (error) {
    console.error("Error archiving cars:", error);
    return NextResponse.json(
      { error: "An error occurred while archiving cars" },
      { status: 500 }
    );
  }
}
