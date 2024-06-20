"use client"

import FinancingRequestCard from "@/components/DashboardFinancing/FinancingRequestCard"
import { FaSpinner } from "react-icons/fa6";
import useSWR from "swr";

const FinancingDetails = ({ params }: { params: { financingId: string } }) => {
    const { data, isLoading, error } = useSWR(
        `/api/get-financing-requests/${params.financingId}`);

    const financingRequest = data?.getFinancingRequest;

    console.log(financingRequest);

    if (isLoading) {
        return (
            <div className="">
                <FaSpinner className="animate-spin inline-block mr-2 text-black" />
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
        <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
            <FinancingRequestCard financing={financingRequest} />
        </div>
    );
};

export default FinancingDetails;