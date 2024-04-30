"use client"

import { z } from "zod";

export const ImageSchema = z.object({
  id: z.number().min(1, { message: "ID is required" }),
  url: z.string().min(1, { message: "URL is required" }),
  publicId: z.string().min(1, { message: "Public ID is required" }),
  carListId: z.string().min(1, { message: "Car List ID is required" }),
});

export const CarListSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  make: z.string().min(1, { message: "Make is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  milage: z.string().min(1, { message: "Milage is required" }),
  vin: z.string().min(1, { message: "VIN is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  exteriorInterior: z
    .string()
    .min(1, { message: "Exterior/Interior is required" }),
});
