"use client"

import { z } from "zod";

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
