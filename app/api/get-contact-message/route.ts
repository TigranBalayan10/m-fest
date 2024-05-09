import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const contactData = await prisma.contact.findMany();
  return NextResponse.json({ contactData });
}
