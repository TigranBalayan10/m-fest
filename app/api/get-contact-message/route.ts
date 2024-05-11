import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  "use server";
  const contactData = await prisma.contact.findMany();
  revalidatePath("/get-contact-message");
  return NextResponse.json({ contactData });
}
