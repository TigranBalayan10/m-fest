export interface CarList {
  title: string;
  href: string;
  description: string;
  image: string;
  price: string | number;
  mileage: string;
  year: string;
  vin: string;
  exteriorInterior: string;
  imageCarousel: string[];
}

export interface searchData {
  value: string;
  label: string;
}

export interface carData {
  model_series: string;
  years: string;
  vehicle_class: string;
}

export interface Car {
  id: string;
  model: string;
  vin: string;
  make: string;
  milage: string;
  drivetrain: string;
  transmission: string;
  engine: string;
  description?: string;
  year: string;
  exteriorInterior: string;
  price: string;
  imageUrls: string[];
  isArchive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
