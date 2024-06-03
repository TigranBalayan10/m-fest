import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateInbox } from "@/lib/actions";

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

    revalidateInbox();
    console.log("Revalidated inbox");
    return NextResponse.json({ messageData });
  } catch (error) {
    console.error("Error fetching message data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching message data" },
      { status: 500 }
    );
  }
}
