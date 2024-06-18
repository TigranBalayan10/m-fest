import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateCustomers } from "@/lib/actions";

export async function GET(request: Request) {
  try {
    const customerData = await prisma.customer.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        message: true
      },
    });

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    const recentCustomers = customerData.filter((customer) => {
      const createdAt = new Date(customer.createdAt);
      return createdAt >= oneDayAgo;
    });

    revalidateCustomers();
    console.log("Revalidated customers");
    return NextResponse.json({ customerData, recentCustomers });
  } catch (error) {
    console.error("Error fetching customer data:", error);
    const errorMessage = "An error occurred while fetching customer data.";
    const errorResponse = {
      error: true,
      message: errorMessage,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
