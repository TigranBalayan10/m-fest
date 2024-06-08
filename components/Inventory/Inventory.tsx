"use client"

import CarCard from "./CarCard";
import { CarListData, SearchData } from "@/lib/zodSchema";
import useSWR from "swr";
import CarCardSkeleton from "./CarCardSkeleton";
import { fetcher } from "@/lib/swrFetcher";

interface InventoryProps {
  searchResults: CarListData[];
  searchParams: SearchData;
}

const CarsForSale: React.FC<InventoryProps> = ({ searchResults, searchParams }) => {

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


  const renderNoResultsMessage = () => {
    if (searchResults?.length === 0 && Object.keys(searchParams).length > 0) {
      return (
        <div className="text-gray-300 font-sans font-thin text-center text-lg">
          <p>No cars found matching the search criteria.
            <br />
            Please try with different one.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-5 flex-grow">
      <h1 className="text-2xl font-bold text-center text-gray-200">Our Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full container mx-auto p-4">
        {searchResults?.length > 0 ? (
          searchResults?.map((car: CarListData, index: number) => (
            <CarCard key={index} car={car} />
          ))
        ) : (
          renderNoResultsMessage() || (
            data?.carData?.length > 0 ? (
              data.carData.map((car: CarListData, index: number) => (
                <CarCard key={index} car={car} />
              ))
            ) : (
              <div className="text-gray-300 font-sans font-thin text-center text-lg">
                No cars available
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default CarsForSale;
