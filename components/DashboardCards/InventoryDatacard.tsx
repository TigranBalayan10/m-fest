"use client"
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "@/components/ui/separator";
import { MdInventory, MdWhatshot, MdLocalShipping, MdArchive  } from "react-icons/md";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa6";
import { Car } from "@/lib/types";




const InventoryDataCard = () => {
    const { data, isLoading, error } = useSWR("/api/inventory");
    const { data: archivedData } = useSWR("/api/archive");
    const inventoryQuantity = data?.carData?.length;
    const hotDeals = data?.carData?.filter((car: Car) => car.isHot === true).length;
    const soldCars = data?.carData?.filter((car: Car) => car.isSold === true).length;
    const archivedCars = archivedData?.archivedInventory?.length;


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center mb-2">Inventory</CardTitle>
                <Separator />
            </CardHeader>
            {error && <p className="text-center text-red-500">An error occurred while fetching data: {error}</p>}
            {isLoading ? (
                <FaSpinner className="animate-spin h-6 w-6 mx-auto mb-5" />
            ) : (
                <CardContent className="px-6 py-4 flex justify-between gap-6 items-center text-center">
                    <Link href="dashboard/inventory" className="flex flex-col items-center hover:underline">
                        <span className="inline-flex items-center text-2xl font-semibold">
                            <MdInventory className="mr-2 mb-2" />
                        </span>
                        <span className="text-sm text-gray-500">{inventoryQuantity} cars for sale</span>
                    </Link>
                    <div className="flex flex-col items-center">
                        <span className="inline-flex items-center text-2xl font-semibold">
                            <MdWhatshot className="mr-2 mb-2" />
                        </span>
                        <span className="text-sm text-gray-500">{hotDeals} hot deals</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="inline-flex items-center text-2xl font-semibold">
                            <MdLocalShipping className="mr-2 mb-2" />
                        </span>
                        <span className="text-sm text-gray-500">{soldCars} sold</span>
                    </div>
                    <Link href="dashboard/archive" className="flex flex-col items-center hover:underline">
                        <span className="inline-flex items-center text-2xl font-semibold">
                            <MdArchive className="mr-2 mb-2" />
                        </span>
                        <span className="text-sm text-gray-500">{archivedCars} archived</span>
                    </Link>
                </CardContent>
            )}
        </Card>
    )
}

export default InventoryDataCard