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

interface DataTableProps {
  showArchived?: boolean;
}


async function fetcher() {
  const response = await fetch('/api/inventory');
  const data = await response.json();
  return data;
}



const DataTable: React.FC<DataTableProps> = ({ showArchived }) => {
  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);
  if (isLoading) {
    return <DataTableSkeleton />;
  }
  if (error) return <div>Error: {error.message}</div>
  const filteredData = data?.carData?.filter((item: Car) => item.isArchive === showArchived);

  if (filteredData.length === 0) {
    return (
      <div className="overflow-x-auto rounded-lg border shadow-sm max-w-full">
        <div className="p-4">
          <h2 className="text-gray-800 font-semibold">No car data found</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm max-w-full p-4">
      <Table>
        <TableCaption>A list of your recently added cars for sale</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="hidden md:table-cell">Model</TableHead>
            <TableHead className="hidden md:table-cell">VIN</TableHead>
            <TableHead>Make</TableHead>
            <TableHead className="hidden md:table-cell">Milage</TableHead>
            <TableHead className="hidden md:table-cell">Year</TableHead>
            <TableHead className="hidden md:table-cell">Exterior/Interior</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell text-right">Published Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((car: Car, index: number) => (
            <CarTableRow key={index} car={car} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
