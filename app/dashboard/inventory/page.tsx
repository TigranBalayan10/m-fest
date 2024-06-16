"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useSWR from "swr";

const DashboardInventory =  () => {
  const { data, error } = useSWR("/api/inventory");
  const inventoryData = data?.carData;

  if (error) {
    return <div>Error loading inventory data</div>;
  }

  if (!inventoryData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="mt-6">
      <CardTitle className="mb-4 text-center">Inventory</CardTitle>
      <DataTable columns={columns} data={inventoryData} />
    </div>
  );
};

export default DashboardInventory;