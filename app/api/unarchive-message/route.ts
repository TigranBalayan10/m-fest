import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  try {
    // Update the message data
    const unArchiveMessages = await prisma.message.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isArchive: false,
      },
    });

    console.log(unArchiveMessages, "unArchiveMessages");

    // Fetch the updated messages in the desired order
    const updatedMessages = await prisma.message.findMany({
      where: {
        id: { in: ids },
      },
      orderBy: {
        createdAt: "asc", // Order by createdAt in ascending order
      },
    });

    return NextResponse.json(updatedMessages);
  } catch (error) {
    // If an error occurred, send a response with the error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
