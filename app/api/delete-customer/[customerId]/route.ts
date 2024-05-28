import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any, { params }: { params: any }) {
  try {
    const id = params.customerId;

    // Delete the customer data
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    } else {
      console.error("Error deleting customer:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}