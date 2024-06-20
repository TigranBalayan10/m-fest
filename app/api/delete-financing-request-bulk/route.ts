import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  try {

    // Delete the financing data
    const deletedFinancing = await prisma.financing.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log("Deleted financing request:", deletedFinancing);
    return NextResponse.json({ count: deletedFinancing.count });
  } catch (error) {
    console.error("Error deleting financing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}