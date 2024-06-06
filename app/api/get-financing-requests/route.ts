import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateFinancingRequests } from "@/lib/actions";

export async function GET() {
  try {
    const financingData = await prisma.financing.findMany({
      include: {
        personal: true,
        contact: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    revalidateFinancingRequests();
    console.log("Revalidated financing requests.");
    return NextResponse.json({ financingData });
  } catch (error) {
    console.error("Error fetching message data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching message data" },
      { status: 500 }
    );
  }
}
