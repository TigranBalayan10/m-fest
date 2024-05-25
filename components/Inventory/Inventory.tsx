"use client"

import CarCard from "./CarCard";
import { Car } from "@/lib/types";
import useSWR from "swr";
import CarCardSkeleton from "./CarCardSkeleton";

async function fetcher() {
  const response = await fetch('/api/inventory');
  const data = await response.json();
  return data;

}



const CarsForSale = () => {

  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);

  if (isLoading) {
    return (
      <div className="mt-5 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 card-bg h-full container mx-auto p-4">
          {Array.from({ length: 3 }, (_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="mt-5 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 h-full container mx-auto p-4">
        {data?.carData?.length > 0 ? (
          data?.carData?.map((car: Car, index: number) => (
            <CarCard key={index} car={car} />
          ))
        ) : (
          <div className="text-gray-300 font-sans font-thin text-center text-lg">No cars found</div>
        )}
      </div>


    </div>
  );
};

export default CarsForSale;
