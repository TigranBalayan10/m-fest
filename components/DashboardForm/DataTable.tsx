"use server"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import CarTableRow from "./CarTableRow";



async function getCars() {
  const cars = await prisma.carList.findMany({});
  
  return cars;
}


const DataTable = async () => {
  const cars = await getCars();
  return (
    <Card className="bg-slate-300 p-4 flex flex-col items-center">
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
          {cars.map((car, index) => (
            <CarTableRow key={index} car={car} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DataTable;
