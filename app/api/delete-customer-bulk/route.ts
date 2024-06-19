import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  try {
    // Delete the associated messages first
    await prisma.message.deleteMany({
      where: {
        customerId: {
          in: ids,
        },
      },
    });

    // Delete the customer data
    const deletedCustomers = await prisma.customer.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log("Deleted customers:", deletedCustomers);
    return NextResponse.json({ count: deletedCustomers.count });
  } catch (error) {
    console.error("Error deleting customers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}