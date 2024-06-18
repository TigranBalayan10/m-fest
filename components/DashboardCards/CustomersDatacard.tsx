"use client"
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "@/components/ui/separator";
import { FaSpinner, FaUserGroup, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";




const CustomersDataCard = () => {
    const { data, isLoading, error } = useSWR("/api/get-customers?days=7");
    const customersQuantity = data?.customerData?.length;
    const newCustomersQuantity = data?.recentCustomers?.length;
    const messages = data?.customerData?.flatMap((customer: { message: [] | null }) => customer.message || []);
    const messagesQuantity = messages && messages.length;
    const newMessagesQuantity = messages?.filter((message: any) => message?.isNew === true).length;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center mb-2">Customers & Messages</CardTitle>
                <Separator />
            </CardHeader>
            {error && <p className="text-center text-red-500">An error occurred while fetching data: {error}</p>}
            {isLoading ? (
                <FaSpinner className="animate-spin h-6 w-6 mx-auto mb-5" />
            ) : (
                <CardContent className="px-6 py-4 flex justify-center gap-6 items-center text-center">
                    <Link href="dashboard/customers" className="flex flex-col items-center hover:underline">
                        <span className="inline-flex items-center text-2xl font-semibold">
                            <FaUserGroup className="mr-2" />
                            {customersQuantity}
                        </span>
                        <span className="text-sm text-gray-500">+{newCustomersQuantity} new customers</span>
                    </Link>
                    <Link href="dashboard/inbox" className="flex flex-col items-center hover:underline">
                        <span className="inline-flex items-center text-2xl font-semibold">
                            <FaEnvelope className="mr-2" />
                            {messagesQuantity}
                        </span>
                        <span className="text-sm text-gray-500">+{newMessagesQuantity} new messages</span>
                    </Link>
                </CardContent>
            )}
        </Card>
    )
}

export default CustomersDataCard