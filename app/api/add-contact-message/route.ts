import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  try {
    const { name, email, phone, content } = res.values;

    console.log("res", res);

    // Create the customer
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
      },
    });

    // Create a new message associated with the customer
    const message = await prisma.message.create({
      data: {
        content,
        customer: {
          connect: { id: customer.id },
        },
      },
    });
    return NextResponse.json({ customer, message});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
