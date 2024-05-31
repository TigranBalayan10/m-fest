import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const messageData = await prisma.customer.findMany({
      include: {
        Message: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log("messageData", messageData);
    return NextResponse.json({ messageData });
  } catch (error) {
    console.error("Error fetching message data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching message data" },
      { status: 500 }
    );
  }
}
