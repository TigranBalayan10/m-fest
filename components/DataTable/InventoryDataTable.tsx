"use client";

import { CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/DataTable/columns";
import useSWR from "swr";
import DataTableSkeleton from "@/components/DashboardForm/DataTableSkeleton";

const InventoryDataTable = () => {
  const { data, error, isLoading } = useSWR("/api/inventory");
  const inventoryData = data?.carData;

  if (error) {
    return <div>Error loading inventory data: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="mt-6">
        <CardTitle className="mb-4 text-center">Inventory</CardTitle>
        <DataTableSkeleton />
      </div>
    );
  }


  return (
    <div className="mt-6">
      <CardTitle className="mb-4 text-center">Inventory</CardTitle>
      <DataTable
            columns={columns}
            data={inventoryData}
            smallScreenColumnIds={["make", "price", "actions"]}
            filterColumn="make"
            filterPlaceholder="Filter by name..."
            deleteEndpoint="/api/delete-inventory-bulk"
            archiveEndpoint="/api/archive-inventory-bulk"
            mutateEndpoint="/api/inventory"
        />
    </div>
  );
};

export default InventoryDataTable;