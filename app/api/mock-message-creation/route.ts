import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Create customers individually using create()
    const customer1 = await prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      },
    });

    const customer2 = await prisma.customer.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
      },
    });

    const customer3 = await prisma.customer.create({
      data: {
        name: "Emily Davis",
        email: "emily@example.com",
        phone: "7890123456",
      },
    });

    // Create contacts and associate them with the created customers
    await prisma.contact.createMany({
      data: [
        {
          message: "Hello, I have been using your product for a while now...",
          customerId: customer1.id,
        },
        {
          message:
            "I am interested in upgrading my current plan to the premium version...",
          customerId: customer2.id,
        },
        {
          message:
            "I recently encountered an issue while using your software...",
          customerId: customer3.id,
        },
        {
          message:
            "I am writing to inquire about the possibility of integrating your API...",
          customerId: customer1.id,
        },
      ],
    });

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while seeding the database" },
      { status: 500 }
    );
  }
}
