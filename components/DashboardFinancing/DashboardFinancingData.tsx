"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/swrFetcher";
import useSWR from "swr";
import DataTableSkeleton from "../DashboardForm/DataTableSkeleton";
import { FinancingDataTypes } from "@/lib/Types/FinancingFormTypes";
import DashboardFinancingTableRow from "./DashboardFinancingTableRow";
import Link from "next/link";


const DashboardFinancingData = () => {

    const { data, error, isLoading } = useSWR("/api/get-financing-requests", fetcher);

    if (isLoading) {
        return <DataTableSkeleton />;
    }

    if (error) {
        console.error("Error fetching financing data:", error);
        return <div>Error: Failed to fetch financing data</div>;
    }

    if (data?.length === 0) {
        return (
            <div className="overflow-x-auto rounded-lg border shadow-sm max-w-full">
                <div className="p-4">
                    <h2 className="text-gray-800 font-semibold">No financing requests</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border shadow-sm max-w-full p-4">
            <Table>
                <TableCaption>A list of recently requested financing applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead className="hidden md:table-cell">Middle Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead className="hidden md:table-cell">SSN/ITIN</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Address</TableHead>
                        <TableHead className="hidden md:table-cell text-right">Published Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.financingData?.map((financing: FinancingDataTypes, index: number) => (
                        <DashboardFinancingTableRow financing={financing} key={index} />
                    )
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DashboardFinancingData