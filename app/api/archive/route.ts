"use server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateInventoryArchive } from "@/lib/actions";

export async function GET() {
  try {
    const archivedInventory = await prisma.carList.findMany({
      where: {
        isArchive: true,
      },
    });
    return NextResponse.json({ archivedInventory });
  } catch (error) {
    console.error("Error fetching archived inventory:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching archived inventory" },
      { status: 500 }
    );
  }
}
