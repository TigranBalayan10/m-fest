import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res", res);
  try {
    const { financing } = res;
    const { personal, contact, car } = financing;
    const { firstName, middleName, lastName, ssnItin, dob } = personal;
    const { month, day, year } = dob;
    const { phone, email, address, city, state, zip } = contact;
    const { vin } = car;

    // Create the Personal Financing
    const FinancingPersonal = await prisma.financingPersonal.create({
      data: {
        firstName,
        middleName,
        lastName,
        ssnItin,
        dob: `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}`,
      },
    });

    // Create a new message associated with the customer
    const FinancingContact = await prisma.financingContactInfo.create({
      data: {
        phone,
        email,
        address,
        city,
        state,
        zip,
      },
    });

    // Create a new Financing record and connect it to the Personal and Contact records
    const financingData = await prisma.financing.create({
      data: {
        personal: {
          connect: { id: FinancingPersonal.id },
        },
        contact: {
          connect: { id: FinancingContact.id },
        },
        car: {
          connect: { vin },
        },
      },
      include: {
        personal: true,
        contact: true,
        car: true,
      },
    });

    return NextResponse.json({ financingData });
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
