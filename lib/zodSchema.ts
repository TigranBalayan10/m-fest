"use client";

import { nullable, z } from "zod";

export const CarListSchema = z.object({
  id: z.string().optional(),
  model: z.string().min(1, { message: "Model is required" }),
  make: z.string().min(1, { message: "Make is required" }),
  description: z.string().optional(),
  price: z
    .string()
    .regex(/^\d+$/, { message: "Price must be a positive number" })
    .min(1, { message: "Price is required" }),
  milage: z
    .string()
    .regex(/^\d+$/, { message: "Milage must be a positive number" })
    .min(1, { message: "Milage is required" }),
  year: z
    .string()
    .regex(/^\d+$/, { message: "Year must be a positive number" })
    .min(4, { message: "Year must be a 4-digit number" })
    .refine((value) => Number(value) >= 1900, {
      message: "Year must be 1900 or later",
    }),
  vin: z
    .string()
    .trim()
    .toUpperCase()
    .min(17, { message: "VIN must be 17 characters" })
    .max(17, { message: "VIN must be 17 characters" }),
  drivetrain: z.string().min(1, { message: "Drivetrain is required" }),
  transmission: z.string().min(1, { message: "Transmission is required" }),
  engine: z.string().min(1, { message: "Engine is required" }),
  exteriorInterior: z
    .string()
    .trim()
    .min(1, { message: "Exterior/Interior is required" }),
  imageUrls: z
    .array(z.string())
    .min(5, { message: "At least 5 Images are required" }),
});

export const ContactUsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  email: z.string().trim().toLowerCase().email({ message: "Invalid email" }),
  phone: z
    .string()
    .regex(/^[0-9]+$/, { message: "Invalid phone number" })
    .length(10, { message: "Phone number must be 10 digits" })
    .transform(
      (val) => `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6, 10)}`
    ),
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
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const VinSchema = z.object({
  vin: z
    .string()
    .min(17, { message: "VIN must be at least 17 characters" })
    .max(17, { message: "VIN must be at most 17 characters" }),
});

export type SearchData = z.infer<typeof SearchSchema>;
export type CarListData = z.infer<typeof CarListSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type VinNumber = z.infer<typeof VinSchema>;
