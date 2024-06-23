"use client"

import FinancingRequestCard from "@/components/DashboardFinancing/FinancingRequestCard"
import { FaSpinner, FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Separator } from "@/components/ui/separator";

const FinancingDetails = ({ params }: { params: { financingId: string } }) => {
    const router = useRouter();
    const { data, isLoading, error } = useSWR(
        `/api/get-financing-requests/${params.financingId}`);

    const financingRequest = data?.getFinancingRequest;

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
        <div className="flex flex-col min-h-screen">
            <FinancingRequestCard financing={financingRequest} />
        </div>
    );
};

export default FinancingDetails;