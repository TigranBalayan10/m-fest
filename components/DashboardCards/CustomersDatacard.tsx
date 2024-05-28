"use client";

import { fetcher } from "@/lib/swrFetcher";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import useSWR from "swr"

const CustomersDataCard = () => {
    const { data, isLoading, error } = useSWR("/api/get-customers?days=7", fetcher);
    const customersQuantity = data?.customerData?.length;
    const newCustomersQuantity = data?.recentCustomers?.length;
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">All time: {customersQuantity} customers</div>
                <p className="text-sm text-gray-500">+ {newCustomersQuantity} customers today</p>
            </CardContent>
        </Card>
    )
}

export default CustomersDataCard