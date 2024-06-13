import React from "react";
import { Car } from "@/lib/types";
import { CldImage } from "next-cloudinary";
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
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

interface CarDetailProps {
  car: Car;
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {

  const [selectedImage, setSelectedImage] = useState(car.imageUrls[0]);
  const pathname = usePathname();

  return (
    <>
      {pathname === (`/dashboard/inventory/${car.id}`) ? (
        null) : (
        <Link href="/inventory">
          <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0"><FaArrowLeftLong className="mr-1" />Back to Inventory</Button>
        </Link>
      )}
      <CardHeader>
        <CardTitle>Car Details</CardTitle>
        <CardDescription>
          Detailed information about the car
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:grid md:grid-cols-3 gap-6 md:container">
          <div className="md:col-span-2 ">
            <div className="flex flex-col">
              <CldImage
                src={selectedImage}
                width="1000"
                height="600"
                crop="fill"
                alt={car.model}
              />
              <div className="flex justify-start mt-2">
                <div className="grid grid-cols-4  sm:grid-cols-8 sm:m-0 gap-1 mt-4">
                  {car.imageUrls.map((imageUrl, index) => (
                    <Button key={index} size="xl" className="border p-1 border-gray-300 rounded-md overflow-hidden bg-transparent focus:bg-slate-900 aspect-square" onClick={() => setSelectedImage(imageUrl)}>
                      <CldImage
                        src={imageUrl}
                        width="480"
                        height="300"
                        crop="fill"
                        alt={`Thumbnail ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </Button>
                  ))}
                </div>
              </div>
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