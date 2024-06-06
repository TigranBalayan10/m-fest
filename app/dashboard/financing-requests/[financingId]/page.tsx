"use client"

import FinancingRequestCard from "@/components/DashboardFinancing/FinancingRequestCard"
import { FaSpinner } from "react-icons/fa6";
import useSWR from "swr";
import { fetcher } from "@/lib/swrFetcher";
import { Card } from "@/components/ui/card";

const FinancingDetails = ({ params }: { params: { financingId: string } }) => {
    const { data, isLoading, error } = useSWR(
        `/api/get-financing-requests/${params.financingId}`,
        fetcher
    );

    const financingRequest = data?.getFinancingRequest;

    console.log(financingRequest);

    if (isLoading) {
        return (
            <div className="text-white">
                <FaSpinner className="animate-spin inline-block mr-2" />
                Loading...
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!financingRequest) {
        return <div>Financing request not found.</div>;
    }

    return (
        <Card>
            <FinancingRequestCard financing={financingRequest} />
        </Card>
    );
};

export default FinancingDetails;