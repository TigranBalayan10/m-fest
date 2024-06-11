import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: any,
  { params }: { params: { financingId: string } }
) {
  const financingId = params.financingId;
  try{
    const getFinancingRequest = await prisma.financing.findUnique({
      where: { id: financingId },
      include: {
        personal: true,
        contact: true,
        car: true,
      },
    });

    console.log("Financing request data fetched successfully.");
    console.log(getFinancingRequest);

    return NextResponse.json({ getFinancingRequest });

  }catch (error){
    console.error("Error fetching financing request data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching financing request data" },
      { status: 500 }
    );
  }
}
