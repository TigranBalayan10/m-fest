"use client";

import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader,TableBody, Table } from "@/components/ui/table"
import { IoIosSearch } from "react-icons/io";
import useSWR from "swr";
import { fetcher } from "@/lib/swrFetcher";
import CustomersList from "@/components/Customers/CustomersList";
import { Customer } from "@/lib/Types/ContactUsTypes";

export default function CustomerList() {

  const { data, isLoading, error } = useSWR("/api/get-customers", fetcher);

  const allCustomers = data?.customerData;

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Failed to load</div>
  }

  if (allCustomers?.length === 0 || !allCustomers) {
    return <div className="text-gray-400 p-4 text-center">No Customers</div>;
  }

  console.log(allCustomers);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="relative w-full max-w-md">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search customers..."
            type="search"
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead  className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCustomers.map((customer: Customer, index: number) => (
              <CustomersList key={index} customer={customer} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}