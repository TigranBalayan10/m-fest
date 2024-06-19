"use client";

import { CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/DataTable/CustomerColumns";
import useSWR from "swr";
import DataTableSkeleton from "@/components/DashboardForm/DataTableSkeleton";
import { Customer } from "@/lib/Types/ContactUsTypes";

const CustomerDataTable = () => {
  const { data, error, isLoading } = useSWR("/api/get-customers");
  const customerData = data?.customerData;

  if (error) {
    return <div>Error loading inventory data: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="mt-6">
        <CardTitle className="mb-4 text-center">Customers</CardTitle>
        <DataTableSkeleton />
      </div>
    );
  }


  return (
    <div className="mt-6">
      <CardTitle className="mb-4 text-center">Customers</CardTitle>
      <DataTable<Customer, unknown>
            columns={columns}
            data={customerData}
            smallScreenColumnIds={["name", "phone", "actions"]}
            filterColumn="name"
            filterPlaceholder="Filter by name..."
            deleteEndpoint="/api/delete-customer-bulk"
            mutateEndpoint="/api/get-customers"
        />
    </div>
  );
};

export default CustomerDataTable;