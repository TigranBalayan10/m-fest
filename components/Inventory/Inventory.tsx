"use client"

import CarCard from "./CarCard";
import { Car } from "@/lib/types";
import useSWR from "swr";

async function fetcher() {
  const response = await fetch('/api/inventory');
  const data = await response.json();
  return data;

}



const CarsForSale = () => {
  
  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-teal-200 h-full container mx-auto p-4">
        {data?.carData?.map((car: Car, index: number) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsForSale;
