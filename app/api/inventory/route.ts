import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function GET() {
  "use server";
  const carData = await prisma.carList.findMany();
  revalidatePath("/api/inventory");
  return NextResponse.json({ carData });
}
