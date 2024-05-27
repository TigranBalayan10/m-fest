import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  // Delete the message data
  try {
    const deleteMessages = await prisma.contact.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    console.log(deleteMessages, "Deleted Messages");
    return NextResponse.json(deleteMessages);
  } catch (error) {
    // If an error occurred, send a response with the error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
