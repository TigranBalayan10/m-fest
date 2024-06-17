import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request: any) {
  let res = await request.json();
  console.log(res);
  const ids = res.ids;

  // Fetch the cars data first
  const cars = await prisma.carList.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  // Delete each image from Cloudinary for each car
  for (const car of cars) {
    const imageUrls = car.imageUrls || [];
    for (const imageUrl of imageUrls) {
      await cloudinary.uploader.destroy(imageUrl);
    }
  }

  // Delete the cars data
  try {
    const deleteInventory = await prisma.carList.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    console.log(deleteInventory, "Deleted Inventory");
    return NextResponse.json(deleteInventory);
  } catch (error) {
    // If an error occurred, send a response with the error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
