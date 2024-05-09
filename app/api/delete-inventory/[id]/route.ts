import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request: any, { params }: { params: any }) {
  const id = params.id;

  // Fetch the car data first
  const car = await prisma.carList.findUnique({
    where: {
      id: id,
    },
  });
  console.log(`Deleting car: ${car?.id} - ${car?.make}`);
  // Get the imageUrl[] which contains the Cloudinary publicIds
  const imageUrls = car?.imageUrls || [];
  // Delete each image from Cloudinary
  for (const imageUrl of imageUrls) {
    console.log(`Deleting image from Cloudinary: ${imageUrl}`);
    await cloudinary.uploader.destroy(imageUrl);
    console.log(`Deleted image from Cloudinary: ${imageUrl}`);
  }
  // Delete the car data
  const deletedCar = await prisma.carList.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(deletedCar);
}
