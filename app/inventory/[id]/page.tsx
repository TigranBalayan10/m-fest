"use client"

import CarDetail from "@/components/Inventory/CarDetail"
import { Card } from "@/components/ui/card"
import useSWR from "swr"
import "../styles.css";


const InventoryById = ({ params }: { params: { id: string } }) => {
  async function fetcher() {
    const response = await fetch(`/api/inventory/${params.id}`);
    const data = await response.json();
    return data;

  }

  const { data, isLoading, error } = useSWR(`/api/inventory/${params.id}`, fetcher);
  console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="inventory-page mx-4 md:py-5 sm:mx-auto mt-5 shadow-lg bg-stone-200 px-4 py-7 sm:px-6 lg:px-8 h-auto overflow-auto">
        <CarDetail car={data?.getCarById} />
    </Card>
  )
}

export default InventoryById