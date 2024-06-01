import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  try {
    // Update the message data
    const archivedMessages = await prisma.message.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isArchive: true,
      },
    });
    console.log(archivedMessages, "Archived Messages");
    return NextResponse.json(archivedMessages);
  } catch (error) {
    // If an error occurred, send a response with the error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
