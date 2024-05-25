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
import ToolTip from "../CustomUi/ToolTip";
import { Separator } from "../ui/separator";
import AlertDelete from "../CustomUi/AlertDelete";

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
        <div className="md:grid md:grid-cols-3 gap-2">
          <div className="md:col-span-2">
            <div className="flex flex-col">
              <CldImage
                src={selectedImage}
                width="1000"
                height="600"
                crop="fill"
                alt={car.model}
              />
              <div className="flex justify-start">
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
          <div className="grid w-full">
            <div>
              <h1 className="text-3xl font-bold">{car.year} {car.model}</h1>
              <p className=" text-gray-500">
                {car.description}
              </p>
              <Link className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium" href="#">
                See CarFax Report
                <FaArrowUpRightFromSquare className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="flex max-w-96 flex-col mx-3 mt-2 gap-1">
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
                <p className="text-sm font-semibold">{car.milage},mi</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">Drivetrain</h3>
                <p className="text-sm font-semibold">{car.drivetrain}</p>
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
                <p className="text-sm font-bold">${car.price}</p>
              </div>
              <Separator className="my-2 bg-black" />
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-500">MPG</h3>
                <p className="text-sm font-bold">${car.mpg}</p>
              </div>
            </div>
            {pathname === (`/dashboard/inventory/${car.id}`) ? (
              <div className="flex flex-col md:flex-row gap-2 ml-2 items-center mt-4">
                <Link href={`/dashboard/edit-inventory/${car.id}`}>
                  <Button variant="outline" className="w-full md:w-auto">Edit Car</Button>
                </Link>
                <AlertDelete
                  itemId={car.id || ""}
                  title={car.model}
                  actionEndpoint="inventory"
                  actionName="Delete"
                  actionColor="destructive hover:bg-destructive/90 w-full md:w-auto"
                  httpMethod="DELETE"
                />
                <AlertDelete
                  itemId={car.id || ""}
                  title={car.model}
                  actionEndpoint="archive-inventory"
                  actionName="Archive"
                  actionColor="amber-600 hover:bg-amber-500"
                  httpMethod="PUT"
                />
                <Link href={`/dashboard/${car.id}`}>
                  <Button variant="outline" className="w-full md:w-auto">Cancel</Button>
                </Link>
              </div>
            )
              : (
                <Link href="/contact-us" >
                  <Button className="mt-2">Contact Seller</Button>
                </Link>
              )}
          </div>
        </div>
      </CardContent >
    </>
  );
}

export default CarDetail;