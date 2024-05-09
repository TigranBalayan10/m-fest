import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { name, email, phone, message } = res.values;
  console.log('res', res)
  const result = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      message,
    },
  });
  return NextResponse.json({ result });
}
