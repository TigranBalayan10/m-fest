import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ContactUsSchema } from "@/lib/zodSchema";

export async function POST(request: Request) {
  const res = await request.json();
  try {
    const { name, email, phone, message } = res.values;

    console.log("res", res);

    // Check if a customer with the given email already exists
    let customer = await prisma.customer.findFirst({
      where: { email },
    });

    
    // If the customer doesn't exist, create a new one
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name,
          email,
          phone,
        },
      });
    }
    
    console.log("customer", customer);
    // Create the contact and associate it with the customer
    const result = await prisma.contact.create({
      data: {
        message,
        customer: {
          connect: { id: customer.id },
        },
      },
    });

    return NextResponse.json({ result });
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
