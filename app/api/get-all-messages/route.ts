import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const contactData = await prisma.contact.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const newMessages = await prisma.contact.findMany({
    where: {
      isNew: true,
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const archivedMessages = await prisma.contact.findMany({
    where: {
      isArchive: true,
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return NextResponse.json({ contactData, newMessages, archivedMessages });
}


