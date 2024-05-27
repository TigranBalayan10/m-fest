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

    const customer4 = await prisma.customer.create({
      data: {
        name: "Michael Johnson",
        email: "michael@example.com",
        phone: "4567890123",
      },
    });

    const customer5 = await prisma.customer.create({
      data: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "3210987654",
      },
    });

    const customer6 = await prisma.customer.create({
      data: {
        name: "David Thompson",
        email: "david@example.com",
        phone: "6543210987",
      },
    });

    const customer7 = await prisma.customer.create({
      data: {
        name: "Olivia Martinez",
        email: "olivia@example.com",
        phone: "0123456789",
      },
    });

    const customer8 = await prisma.customer.create({
      data: {
        name: "Daniel Anderson",
        email: "daniel@example.com",
        phone: "9012345678",
      },
    });

    const customer9 = await prisma.customer.create({
      data: {
        name: "Sophia Taylor",
        email: "sophia@example.com",
        phone: "5678901234",
      },
    });

    const customer10 = await prisma.customer.create({
      data: {
        name: "James Wilson",
        email: "james@example.com",
        phone: "2345678901",
      },
    });

    // Create contacts and associate them with the created customers
    await prisma.contact.createMany({
      data: [
        {
          message:
            "Hello, I have been using your product for a while now and I must say that I am thoroughly impressed with its features and performance. However, I have a few questions regarding the upcoming update and how it will affect my current workflow. Could you please provide me with more information on the changes and any potential impact it may have? I would greatly appreciate any insights you can offer.",
          customerId: customer1.id,
        },
        {
          message:
            "I am interested in upgrading my current plan to the premium version. I have been considering this for some time and I believe it would greatly benefit my business. Could you please provide me with more details on the additional features and benefits that come with the premium plan? Also, I would like to know if there are any discounts or promotions currently available for upgrading. Thank you for your assistance.",
          customerId: customer2.id,
        },
        {
          message:
            "I recently encountered an issue while using your software. I was in the middle of working on an important project when the application suddenly crashed. I tried reopening it but it kept crashing every time. I have tried troubleshooting the issue on my end but have had no success. This is causing a significant disruption to my work and I would appreciate any help you can provide in resolving this problem. Please let me know what steps I can take to fix this issue. Thank you for your prompt attention to this matter.",
          customerId: customer3.id,
        },
        {
          message:
            "I have been a loyal customer of your company for several years now and have always been satisfied with the level of service provided. However, I recently noticed that my account was charged an unexpected fee. I reviewed my billing history and couldn't find any explanation for this charge. Could you please look into this matter and provide me with some clarification? I would appreciate if you could resolve this issue promptly and ensure that it doesn't happen again in the future.",
          customerId: customer4.id,
        },
        {
          message:
            "I am writing to inquire about the status of my recent order. I placed an order on your website a week ago and haven't received any updates about its shipping status. The estimated delivery date has already passed, and I am concerned about the delay. Could you please provide me with an update on when I can expect to receive my order? If there are any issues or further delays, please let me know so I can plan accordingly. Thank you for your assistance.",
          customerId: customer5.id,
        },
        {
          message:
            "I recently purchased one of your products and have been using it for a few days now. While I am generally satisfied with its performance, I noticed that it lacks a specific feature that I believe would greatly enhance its usability. I wanted to reach out and suggest that you consider adding this feature in a future update. I believe it would provide significant value to users like myself and make the product even more appealing. Please let me know if you would like further details on my suggestion.",
          customerId: customer6.id,
        },
        {
          message:
            "I have been trying to reach customer support for the past few days regarding an issue I am facing with your service. Despite multiple attempts, I haven't been able to get through to a representative. This is quite frustrating as I need urgent assistance. Could you please ensure that someone gets back to me as soon as possible? I would appreciate a prompt response and resolution to my problem. Thank you for your attention to this matter.",
          customerId: customer7.id,
        },
        {
          message:
            "I am currently evaluating your product for potential use in my organization. While I find its features impressive, I have a few questions regarding its scalability and integration capabilities. Could you please provide me with more information on how well your product handles large-scale deployments and how easily it integrates with other systems? Additionally, I would like to know about any case studies or success stories you have from similar organizations. This information would greatly assist me in making an informed decision.",
          customerId: customer8.id,
        },
        {
          message:
            "I have been a subscriber to your service for the past few months and have generally been happy with it. However, I recently noticed that the quality of the service has deteriorated. I have been experiencing frequent outages and slow performance, which is affecting my ability to use the service effectively. I wanted to bring this to your attention and request that you look into these issues. I would appreciate if you could resolve them promptly to ensure a smooth experience for users like myself.",
          customerId: customer9.id,
        },
        {
          message:
            "I am writing to express my appreciation for the exceptional customer service I received from your team. I had an issue with my account and reached out to your support team for assistance. The representative who handled my case was extremely helpful, knowledgeable, and patient. They went above and beyond to resolve my problem quickly and efficiently. I am truly impressed with the level of service provided and wanted to commend your team for their outstanding work. Thank you for the excellent support!",
          customerId: customer10.id,
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
