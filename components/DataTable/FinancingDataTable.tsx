"use client";

import { CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/DataTable/FinancingColumns";
import useSWR from "swr";
import DataTableSkeleton from "@/components/DashboardForm/DataTableSkeleton";
import { FinancingDataTypes } from "@/lib/Types/FinancingFormTypes";

const FinancingDataTable = () => {
    type FinancingDataType = FinancingDataTypes;
    const { data, error, isLoading } = useSWR("/api/get-financing-requests");
    const financingData = data?.financingData;

    const flattenedData = financingData?.map((item: FinancingDataType) => ({
        ...item,
        'phone': item.contact.phone,
        "firstName": item.personal.firstName,
        "lastName": item.personal.lastName,
    }));

    if (error) {
        return <div>Error loading inventory data: {error}</div>;
    }

    if (isLoading) {
        return (
            <div className="mt-6">
                <CardTitle className="mb-4 text-center">Financing Request</CardTitle>
                <DataTableSkeleton />
            </div>
        );
    }


    return (
        <div className="mt-6">
            <CardTitle className="mb-4 text-center">Financing Requests</CardTitle>
            <DataTable
                columns={columns}
                data={flattenedData}
                smallScreenColumnIds={["firstName", "phone", "actions"]}
                filterColumn="phone"
                filterPlaceholder="Filter by phone..."
                deleteEndpoint="/api/delete-financing-request-bulk"
                mutateEndpoint="/api/get-financing-requests"
            />
        </div>
    );
};

export default FinancingDataTable;