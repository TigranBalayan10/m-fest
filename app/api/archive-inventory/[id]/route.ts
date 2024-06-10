import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateInventory } from "@/lib/actions";

export async function PUT(request: any, { params }: { params: any }) {
  const id = params.id;
  try {
    const archivedCar = await prisma.carList.update({
      where: {
        id: id,
      },
      data: {
        isArchive: true,
      },
    });
    revalidateInventory();
    console.log("Archived and Revalidated Inventory page.");
    return NextResponse.json(archivedCar);
  } catch (error) {
    console.error("Error archiving car:", error);
    return NextResponse.json(
      { error: "An error occurred while archiving car" },
      { status: 500 }
    );
  }
}
