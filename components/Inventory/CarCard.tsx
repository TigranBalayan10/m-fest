"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "../ui/separator";
import { CarListData } from "@/lib/zodSchema";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface CarCardProps {
  car: CarListData;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <Card className="card-bg border-none text-gray-300">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>
          {car.year} {car.make} {car.model}
        </CardTitle>
        {car.isHot && (
          <Badge variant="destructive" className="text-white font-bold rotate-12">
            HOT
          </Badge>
        )}
      </div>
      <CardDescription>{car.milage} mi.</CardDescription>
    </CardHeader>
    <CardContent>
      <Dialog>
        <DialogTrigger>
          <CldImage
            src={car.imageUrls[0]}
            width="680"
            height="300"
            crop="fill"
            alt={car.make + " " + car.model}
          />
        </DialogTrigger>
        <DialogContent className="w-3/4 h-3/4 items-center  max-w-none bg-transparent border-none shadow-none">
          <DialogHeader>
            <DialogTitle className="text-white text-center mb-5">
              {car.make} {car.model} {car.year}
            </DialogTitle>
            <DialogDescription className="w-3/4 mx-auto my-auto">
              <Carousel>
                <CarouselContent>
                  {car.imageUrls.map((imageUrl, imageUrlIndex) => (
                    <CarouselItem
                      key={imageUrlIndex}
                      className="flex items-center justify-center"
                    >
                      <CldImage
                        src={imageUrl}
                        width="1366"
                        height="768"
                        crop="fill"
                        alt={imageUrl}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between mt-2">
        <p className="">Price</p>
        <p className="font-bold">${car.price}</p>
      </div>
      <Separator className="my-1" />
      <div className="flex justify-between mt-2">
        <p className="text-sm">Make</p>
        <p className="text-sm">{car.model}</p>
      </div>
      <Separator className="my-1" />
      <div className="flex justify-between mt-2">
        <p className="text-sm">VIN</p>
        <p className="text-sm">{car.vin}</p>
      </div>
      <Separator className="my-1" />
      <div className="flex justify-between mt-2">
        <p className="text-sm">Exterior/Interior</p>
        <p className="text-sm">{car.exteriorInterior}</p>
      </div>
      <Separator className="my-1" />
      <div className="flex justify-between mt-2">
        <Link href={`/contact-us?car_info=${car.vin}-${car.make}-${car.model}`} shallow>
          <Button variant="link" className="p-0 text-gray-400">Contact about this car</Button>
        </Link>
        <Link href={`/inventory/${car.id}`}>
          <Button size="sm" variant="outline" className="text-gray-700">More Info</Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default CarCard;
