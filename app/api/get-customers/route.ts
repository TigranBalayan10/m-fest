import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const customerData = await prisma.customer.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({ customerData });
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
