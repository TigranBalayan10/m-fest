"use client";

import { CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/DataTable/columns";
import useSWR from "swr";
import DataTableSkeleton from "@/components/DashboardForm/DataTableSkeleton";

const InventoryArchiveDataTable = () => {
  const { data, error, isLoading } = useSWR("/api/archive");
  const inventoryArchiveData = data?.archivedInventory;

  if (error) {
    return <div>Error loading archive data: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="mt-6">
        <CardTitle className="mb-4 text-center">Inventory Archive</CardTitle>
        <DataTableSkeleton />
      </div>
    );
  }


  return (
    <div className="mt-6">
      <CardTitle className="mb-4 text-center">Inventory Archive</CardTitle>
      <DataTable
            columns={columns}
            data={inventoryArchiveData}
            smallScreenColumnIds={["make", "price", "actions"]}
            filterColumn="make"
            filterPlaceholder="Filter by make..."
            deleteEndpoint="/api/delete-inventory-bulk"
            mutateEndpoint="/api/archive"
        />
    </div>
  );
};

export default InventoryArchiveDataTable;