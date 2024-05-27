import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  "use server";
  const contactData = await prisma.contact.findMany({
    include: {
      customer: true,
    },
  });

  const newMessages = await prisma.contact.findMany({
    where: {
      isNew: true,
    },
    include: {
      customer: true,
    },
  });

  const archivedMessages = await prisma.contact.findMany({
    where: {
      isArchive: true,
    },
    include: {
      customer: true,
    },
  });

  revalidatePath("/get-all-messages");
  return NextResponse.json({ contactData, newMessages, archivedMessages });
}


