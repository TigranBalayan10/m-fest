import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any, { params }: { params: any }) {
  const id = params.id;
  const archivedCar = await prisma.carList.update({
    where: {
      id: id,
    },
    data: {
      isArchive: true,
    },
  });
  console.log(archivedCar);
  return NextResponse.json(archivedCar);
}
