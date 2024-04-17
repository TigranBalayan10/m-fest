export interface carlist {
  title: string;
  href: string;
  description: string;
  image: string;
  price: string | number;
  mileage: string;
  year: string;
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
