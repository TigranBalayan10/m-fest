"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import CarTableRow from "./CarTableRow";
import { Car } from "@/lib/types";
import DataTableSkeleton from "@/components/DashboardForm/DataTableSkeleton";
import useSWR from "swr";


async function fetcher() {
  const response = await fetch('/api/inventory');
  const data = await response.json();
  return data;

}



const DataTable =  () => {
  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);
  if (isLoading) {
    return <DataTableSkeleton />;
  }
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableCaption>A list of your recently added cars for sale</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Milage</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Exterior/Interior</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Published Date</TableHead>
            <TableHead className="text-right">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.carData?.map((car: Car, index: number) => (
            <CarTableRow key={index} car={car} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
