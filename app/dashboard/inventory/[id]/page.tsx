"use client";

import CarDetail from "@/components/Inventory/CarDetail";
import { Card } from "@/components/ui/card";
import useSWR from "swr";



const InventoryDetails = ({ params }: { params: { id: string } }) => {

    async function fetcher() {
        const response = await fetch(`/api/inventory/${params.id}`);
        const data = await response.json();
        return data;

    }

    const { data, isLoading, error } = useSWR(`/api/inventory/${params.id}`, fetcher);
    const car = data?.getCarById;

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <Card className="inventory-page mx-4 md:py-3 sm:mx-auto mt-5 shadow-lg bg-stone-200 px-3 py-7 sm:px-6 lg:px-4 h-auto overflow-auto">
            <CarDetail car={car} />
        </Card>
    )
}

export default InventoryDetails