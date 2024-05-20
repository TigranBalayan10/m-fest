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
import { Car } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Button } from "../ui/button";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <Card className="bg-zinc-200">
    <CardHeader>
      <CardTitle>
        {car.year} {car.make} {car.model}
      </CardTitle>
      <CardDescription>{car.milage} mi.</CardDescription>
    </CardHeader>
    <CardContent>
      <Dialog>
        <DialogTrigger>
          <CldImage
            src={car.imageUrls[0]}
            width="480"
            height="240"
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
        <Link href="/contact-us">
          <Button variant="link" className="p-0">Contact about this car</Button>
        </Link>
        <Link href={`/inventory/${car.id}`}>
          <Button size="sm" variant="outline">More Info</Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default CarCard;
