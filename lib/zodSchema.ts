"use client";

import { z } from "zod";
import {
  Customer,
  Message,
} from "@prisma/client";

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
  mpg: z.string().min(1, { message: "MPG is required" }),
  exteriorInterior: z
    .string()
    .trim()
    .min(1, { message: "Exterior/Interior is required" }),
  isHot: z.boolean().optional(),
  isSold: z.boolean().optional(),
  imageUrls: z
    .array(z.string())
    .min(5, { message: "At least 5 Images are required" }),
});

// Customer schema
export const CustomerSchema: z.ZodSchema<Customer> = z.lazy(() =>
  z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    Message: MessageSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// Message schema
export const MessageSchema: z.ZodType<Message> = z.lazy(() =>
  z.object({
    id: z.string().cuid(),
    content: z.string(),
    isNew: z.boolean(),
    isArchive: z.boolean(),
    customerId: z.string(),
    customer: CustomerSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export const MarkedReadSchema = z.object({
  ids: z.array(z.string()),
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
  content: z.string().min(1, { message: "Message is required" }),
});

const DobSchema = z.object({
  month: z.string().min(1, { message: "Month is required" }),
  day: z.string().min(1, { message: "Day is required" }),
  year: z.string().min(1, { message: "Year is required" }),
});

// FinancingPersonalSchema
const FinancingPersonalSchema = z.object({
  firstName: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: "First name is required" }),
  middleName: z.string().trim().toUpperCase().optional(),
  lastName: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: "Last name is required" }),
  ssnItin: z
    .string()
    .min(9, { message: "SSN/ITIN must be 9 characters" })
    .max(9, { message: "SSN/ITIN must be 9 characters" })
    .trim()
    .regex(/^\d{9}$/, { message: "SSN/ITIN must contain only numbers" }),
  dob: DobSchema,
});

// FinancingContactInfoSchema
const FinancingContactInfoSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d{10,}$/, { message: "Phone number must contain only numbers" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .regex(/^\d+\s+[a-zA-Z\s]+$/, {
      message:
        "Invalid address format. Address must start with numbers followed by a street name",
    }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zip: z
    .string()
    .min(5, { message: "ZIP code must be at least 5 characters" })
    .regex(/^\d+$/, { message: "ZIP code must contain only numbers" }),
});

// FinancingSchema
const FinancingSchema = z.object({
  personal: FinancingPersonalSchema,
  contact: FinancingContactInfoSchema,
});

// FinancingFormSchema
export const FinancingFormSchema = z.object({
  financing: FinancingSchema,
});

export const SearchSchema = z.object({
  model: z.string().trim().optional(),
  make: z.string().trim().optional(),
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

const VinDecodedTrimSchema = z.object({
  id: z.number(),
  make_model_id: z.number(),
  name: z.string().trim(),
});

export const VinDecodedSchema = z
  .object({
    year: z.number(),
    make: z.string().trim().toUpperCase(),
    model: z.string().trim().optional(),
    trim: z.string().trim(),
  })
  .extend({
    trims: z.array(VinDecodedTrimSchema),
  });

const EngineDataSchema = z.object({
  id: z.number(),
  make_model_trim_id: z.number(),
  engine_type: z.string(),
  fuel_type: z.string(),
  cylinders: z.string(),
  size: z.string(),
  horsepower_hp: z.number(),
  horsepower_rpm: z.number(),
  torque_ft_lbs: z.number(),
  torque_rpm: z.number(),
  valves: z.number(),
  valve_timing: z.string(),
  cam_type: z.string(),
  drive_type: z.string(),
  transmission: z.string(),
});

export const EngineResponseSchema = z.object({}).extend({
  data: z.array(EngineDataSchema),
});

const milageDataSchema = z.object({
  id: z.number(),
  make_model_trim_id: z.number(),
  fuel_tank_capacity: z.string().nullable(),
  combined_mpg: z.number().nullable(),
  epa_city_mpg: z.number().nullable(),
  epa_highway_mpg: z.number().nullable(),
  range_city: z.number().nullable(),
  range_highway: z.number().nullable(),
  battery_capacity_electric: z.nullable(z.string()),
  epa_time_to_charge_hr_240v_electric: z.nullable(z.string()),
  epa_kwh_100_mi_electric: z.nullable(z.string()),
  range_electric: z.nullable(z.string()),
  epa_highway_mpg_electric: z.nullable(z.string()),
  epa_city_mpg_electric: z.nullable(z.string()),
  epa_combined_mpg_electric: z.nullable(z.string()),
});
export const MilageResponseSchema = z.object({}).extend({
  data: z.array(milageDataSchema),
});

export type SearchData = z.infer<typeof SearchSchema>;
export type CarListData = z.infer<typeof CarListSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type VinNumber = z.infer<typeof VinSchema>;
export type VinDecodedData = z.infer<typeof VinDecodedSchema>;
export type ContactData = z.infer<typeof ContactUsSchema>;
export type FinancingPersonalType = z.infer<typeof FinancingPersonalSchema>;
export type FinancingContactInfoType = z.infer<
  typeof FinancingContactInfoSchema
>;
export type FinancingType = z.infer<typeof FinancingSchema>;
export type FinancingFormType = z.infer<typeof FinancingFormSchema>;
