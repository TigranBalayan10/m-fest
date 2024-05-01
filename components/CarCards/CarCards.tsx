import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import { Separator } from "../ui/separator";
import Carlist from "@/lib/Data/CarList.json"
import { CarList } from "@/lib/types"

const typedCarlist: CarList[] = Carlist


const CarCards = () => {
    return (
        <div className="mt-5 flex-grow">
            <div className="flex bg-teal-200 h-full container mx-auto justify-between p-4 gap-3">
                {typedCarlist.map((car, index) => (
                    <Card key={index} className="w-1/3">
                        <CardHeader>
                            <CardTitle>{car.year} {car.title}</CardTitle>
                            <CardDescription>{car.mileage} mi.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dialog>
                                <DialogTrigger>
                                    <Image src={car.image} width={480} height={2} alt={car.title} />
                                </DialogTrigger>
                                <DialogContent className="w-3/4 h-3/4 max-w-none">
                                    <DialogHeader>
                                        <DialogTitle>{car.title}</DialogTitle>
                                        <DialogDescription className="w-3/4 mx-auto my-auto">
                                            <Carousel>
                                                <CarouselContent>
                                                    {car.imageCarousel.map((imageUrl, carouselIndex) => (
                                                        <CarouselItem key={carouselIndex}>
                                                                <CardContent className="flex items-center justify-center">
                                                                    <div className="max-w-full max-h-full overflow-hidden">
                                                                        <Image src={imageUrl} width={1000} height={768} alt={`Carousel image ${index + 1}`} />
                                                                    </div>
                                                                </CardContent>
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
                                <p className="font-bold">{car.price}</p>
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
                ))}
            </div>
        </div >
    );
}

export default CarCards;