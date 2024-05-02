"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "../ui/separator";
import { CarList } from "@prisma/client";
import { CldImage } from 'next-cloudinary';

interface CarCardProps {
  car: CarList;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <Card className="w-1/3">
    <CardHeader>
      <CardTitle>{car.year} {car.title}</CardTitle>
      <CardDescription>{car.milage} mi.</CardDescription>
    </CardHeader>
    <CardContent>
      <Dialog>
        <DialogTrigger>
          <CldImage src={car.imageUrls[0]} width="480" height="240" alt={car.title} />
        </DialogTrigger>
        <DialogContent className="w-3/4 h-3/4 items-center  max-w-none bg-transparent border-none">
          <DialogHeader>
            <DialogTitle className="text-white text-center mb-5">{car.title}</DialogTitle>
            <DialogDescription className="w-3/4 mx-auto my-auto">
              <Carousel>
                <CarouselContent>
                  {car.imageUrls.map((imageUrl, imageUrlIndex) => (
                    <CarouselItem key={imageUrlIndex} className="flex items-center justify-center">
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
        <p className="text-sm">VIN</p>
        <p className="text-sm">{car.vin}</p>
      </div>
      <Separator className="my-1" />
      <div className="flex justify-between mt-2">
        <p className="text-sm">Exterior/Interior</p>
        <p className="text-sm">{car.exteriorInterior}</p>
      </div>
      <Separator className="my-1" />
    </CardContent>
  </Card>
);

export default CarCard;