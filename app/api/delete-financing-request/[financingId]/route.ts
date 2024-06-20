import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any, { params }: { params: any }) {

  try {
    const id = params.financingId;
    console.log("Deleting financing request with id:", id);
    const deletedFinancingRequest = await prisma.financing.delete({
      where: {
        id: id,
      },
    });
    console.log("Deleted financing request:", deletedFinancingRequest);
    return NextResponse.json(deletedFinancingRequest);
  } catch (error) {
    if (error) {
      console.error("Error deleting financing request:", error); // Log the error object
      return NextResponse.json(
        { error: "Financing request not found" },
        { status: 404 }
      );
    } else {
      console.error("Error deleting financing request:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
