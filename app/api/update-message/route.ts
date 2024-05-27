import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  try {
    // Update the message data
    const markedAsRead = await prisma.contact.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isNew: false,
      },
    });
    console.log(markedAsRead, "markedAsRead");
    return NextResponse.json(markedAsRead);
  } catch (error) {
    // If an error occurred, send a response with the error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
