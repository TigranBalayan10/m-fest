// pages/api/deleteImage.js
import cloudinaryInstance from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  if (req.method === "POST") {
    const { imageUrl } = req.body;

    try {
      const response = await cloudinaryInstance.uploader.destroy(imageUrl);
      console.log({ response }, "response");
    } catch (error) {
      console.log({ error }, "error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  return NextResponse.json({ message: "Image deleted successfully" });
}
