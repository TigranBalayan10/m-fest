import { FinancingDataTypes } from "./Types/FinancingFormTypes";

export interface Car {
  id?: string;
  stockNumber?: number;
  make: string;
  model: string;
  description: string;
  price: number;
  milage: number;
  vin: string;
  drivetrain: string;
  transmission: string;
  engine: string;
  mpg: string;
  year: number;
  exteriorInterior: string;
  imageUrls: string[];
  isArchive?: boolean;
  isHot?: boolean;
  isSold?: boolean;
  financing?: FinancingDataTypes[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
