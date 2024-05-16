"use client";

import { z } from "zod";

export const CarListSchema = z.object({
  id: z.string().optional(),
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
  imageUrls: z
    .array(z.string())
    .min(2, { message: "At least 2 Images are required" }),
});

export const ContactUsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export const SearchSchema = z.object({
  model: z.string().optional(),
  make: z.string().optional(),
  year: z.string().optional(),
  milage: z.string().optional(),
  priceRange: z.string().optional(),
});

export const LoginSchema = z.object({
  username: z.string().min(1,{ message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SearchData = z.infer<typeof SearchSchema>;
export type CarListData = z.infer<typeof CarListSchema>;
