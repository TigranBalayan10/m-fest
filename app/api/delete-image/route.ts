// pages/api/deleteImage.js
// import { cloudinaryInstance} from '@/lib/cloudinary';
import { NextResponse } from "next/server";
import cloudinary from '@/lib/cloudinary';


export async function POST(req: any, res: any) {
  if (req.method === "POST") {
    const { imageUrl } = await req.json();
    console.log( imageUrl , "imageUrl Backend");
    try {
      const response = await cloudinary.uploader.destroy(imageUrl);
      console.log({ response }, "response");
    } catch (error) {
      console.log({ error }, "error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  return NextResponse.json({ message: "Image deleted successfully" });
}
