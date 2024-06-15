import React from "react";
import { Car } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaArrowLeftLong } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import DetailCarousel from "@/components/Inventory/DetailCarousel";

interface CarDetailProps {
  car: Car;
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {

  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname === (`/dashboard/inventory/${car.id}`) ? (
        null) : (
        <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0" onClick={() => router.back()}><FaArrowLeftLong className="mr-1" />Back</Button>
      )}
      <CardHeader>
        <CardTitle>Car Details</CardTitle>
        <CardDescription>
          Detailed information about the car
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:grid md:grid-cols-3 gap-6 md:container">
          <div className="md:col-span-2">
            <div className="flex flex-col">
              <DetailCarousel car={car} />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <h1 className="text-3xl font-bold mb-2 mt-2 md:mt-0">{car.year} {car.model}</h1>
              <Link className="my-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium" href="#">
                See CarFax Report
                <FaArrowUpRightFromSquare className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-col mx-3 mt-2 gap-1">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Stock Number</h3>
                <p className="text-sm font-semibold">{car.stockNumber}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Make</h3>
                <p className="text-sm font-semibold">{car.make}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Model</h3>
                <p className="text-sm font-semibold">{car.model}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="text-sm font-semibold">{car.year}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Mileage</h3>
                <p className="text-sm font-semibold">{car.milage.toLocaleString()} miles</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Drivetrain</h3>
                <p className="text-sm font-semibold">{car.drivetrain.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Transmission</h3>
                <p className="text-sm font-semibold">{car.transmission}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Engine</h3>
                <p className="text-sm font-semibold">{car.engine}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="text-sm font-bold">{car.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">MPG</h3>
                <p className="text-sm font-bold">{car.mpg}</p>
              </div>
            </div>
            {pathname === (`/dashboard/inventory/${car.id}`) ? (
              <div className="flex flex-col md:flex-row gap-1 ml-2 items-center mt-4">
                <Link href={`/dashboard/edit-inventory/${car.id}`}>
                  <Button variant="outline" className="w-full md:w-auto">Edit Car</Button>
                </Link>
                <Link href="/dashboard/inventory">
                  <Button variant="outline" className="w-full md:w-auto">Cancel</Button>
                </Link>
              </div>
            )
              : (
                <div className="my-4">
                  <Link href={`/contact-us?car_info=${car.vin}-${car.make}-${car.model}`} shallow>
                    <Button className="mt-2 w-full">Contact Seller</Button>
                  </Link>
                  <Link href={`/financing?vin=${car.vin}`} shallow>
                    <Button className="mt-2 w-full">Financing</Button>
                  </Link>
                </div>
              )}
          </div>
        </div>
      </CardContent >
    </>
  );
}

export default CarDetail;