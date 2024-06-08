"use client"

import CarCard from "./CarCard";
import useSWR from "swr";
import CarCardSkeleton from "./CarCardSkeleton";
import { CarListData } from "@/lib/zodSchema";
import { fetcher } from "@/lib/swrFetcher";


const DealsHot = () => {
    const { data, error, isLoading } = useSWR('/api/inventory', fetcher);

    const hotCars = data?.carData.filter((car: any) => car.isHot === true)

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
            <h1 className="text-2xl font-bold text-center text-gray-200">
                Deals of the Week
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full container mx-auto p-4">
                {hotCars?.length > 0 ? (
                    hotCars?.map((car: CarListData, index: number) => (
                        <CarCard key={index} car={car} />
                    ))
                ) : (
                    <div className="text-gray-300 font-sans font-thin text-center text-lg">
                        <p>No hot deals found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DealsHot