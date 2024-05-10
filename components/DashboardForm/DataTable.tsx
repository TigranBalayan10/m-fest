import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import { CldImage } from "next-cloudinary";
import AlertDelete from "@/components/CustomUi/AlertDelete";
import { useEffect, useState } from "react";
import Link from "next/link";
import DataTableSkeleton from "@/components/DashboardForm/DataTableSkeleton";

interface Car {
  id: string;
  title: string;
  vin: string;
  make: string;
  milage: string;
  year: string;
  exteriorInterior: string;
  price: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

const DataTable = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [loadingCarData, setLoadingCarData] = useState(true);

  const url = process.env.NODE_ENV === 'production' 
  ? "https://m-fest-179hiwk6r-tigran-balayans-projects.vercel.app/api/inventory"
  : "http://localhost:3000/api/inventory";

  useEffect(() => {
    async function getCarList() {
      const response = await fetch(url);
      const data = await response.json();
      setCarData(data.carData);
      setLoadingCarData(false);
    }

    getCarList();
  }, []);

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
          {loadingCarData ? (
            <DataTableSkeleton />
          ) : (
            carData.map((car) => {
              const dateOptions: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              };

              const carWithDateString = {
                ...car,
                createdAt: new Intl.DateTimeFormat("en-US", dateOptions).format(
                  new Date(car.createdAt),
                ),
                updatedAt: new Intl.DateTimeFormat("en-US", dateOptions).format(
                  new Date(car.updatedAt),
                ),
              };

              return (
                <TableRow key={car.id}>
                  <TableCell>
                    <Avatar>
                      <CldImage
                        src={car.imageUrls[0]}
                        width="100"
                        height="100"
                        crop="fill"
                        alt={car.title}
                      />
                      <AvatarFallback>{car.title.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{car.title}</TableCell>
                  <TableCell>{car.vin}</TableCell>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.milage}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.exteriorInterior}</TableCell>
                  <TableCell>${car.price}</TableCell>
                  <TableCell className="text-right">
                    {carWithDateString.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Link href={`/dashboard/edit-inventory/${car.id}`}>
                        <Settings color="black" />
                      </Link>
                    </Button>
                    <AlertDelete title={car.title} carId={car.id} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DataTable;
