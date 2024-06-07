import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any, { params }: { params: any }) {
  console.log("Request to delete customer with id:", params.customerId);
  try {
    const id = params.customerId;
    console.log("Deleting customer with id:", id);
    // Delete the associated messages first
    await prisma.message.deleteMany({
      where: {
        customerId: id,
      },
    });
    // Delete the customer data
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: id,
      },
      include: {
        message: true,
      },
    });
    console.log("Deleted customer:", deletedCustomer);
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    if (error) {
      console.error("Error deleting customer:", error); // Log the error object
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    } else {
      console.error("Error deleting customer:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
