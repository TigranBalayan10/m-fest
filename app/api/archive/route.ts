"use server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const archivedInventory = await prisma.carList.findMany({
    where: {
      isArchive: true,
    },
  });
  if (process.env.NODE_ENV === "production") {
    revalidatePath("/api/archive");
  }
  console.log(archivedInventory);
  return NextResponse.json({ archivedInventory });
}
