import React from "react";
import { Car } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

interface CarDetailProps {
  car: Car;
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {

  const [selectedImage, setSelectedImage] = useState(car.imageUrls[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/inventory">
        <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0"><FaArrowLeftLong className="mr-1" />Back to Inventory</Button>
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Car Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <CldImage
            src={selectedImage}
            width="800"
            height="600"
            crop="fill"
            alt={car.title}
          />
          <div className="grid grid-cols-5 gap-2 mt-4">
            {car.imageUrls.map((imageUrl, index) => (
              <Button key={index} size="xl" className="border border-gray-300 rounded-md overflow-hidden bg-transparent focus:bg-slate-900 p-1" onClick={() => setSelectedImage(imageUrl)}>
                <CldImage
                  src={imageUrl}
                  width="480"
                  height="300"
                  crop="fill"
                  alt={`Thumbnail ${index + 2}`}
                />
              </Button>
            ))}
          </div>
        </div>
        <div className="grid">
          <div>
            <h1 className="text-3xl font-bold">{car.year} {car.title}</h1>
            <p className=" text-gray-500">
              {car.description}
            </p>
            <Link className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium" href="#">
              See CarFax Report
              <FaArrowUpRightFromSquare className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Make</h3>
              <p className="text-lg font-semibold">{car.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Model</h3>
              <p className="text-lg font-semibold">{car.make}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Year</h3>
              <p className="text-lg font-semibold">{car.year}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Mileage</h3>
              <p className="text-lg font-semibold">{car.milage},mi</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <p className="text-2xl font-bold">${car.price}</p>
            </div>
          </div>
          <Link href="/contact-us" >
            <Button size="lg" className="w-full mt-2">Contact Seller</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;