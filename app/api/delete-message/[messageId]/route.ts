import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: any, { params }: { params: any }) {
  const messageId = params.messageId;

  // Delete the message data
  const deleteMessage = await prisma.contact.delete({
    where: {
      id: messageId,
    },
  });

  return NextResponse.json(deleteMessage);
}
