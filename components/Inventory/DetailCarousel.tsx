import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Car } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface DetailCarouselProps {
    car: Car;
}

const DetailCarousel: React.FC<DetailCarouselProps> = ({ car }) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const handleThumbnailClick = (index: number) => {
        api?.scrollTo(index)
    }

    return (
        <div>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {car.imageUrls.map((publicId, index) => (
                        <CarouselItem key={index}>
                            <div className="aspect-w-16 aspect-h-9">
                                <CldImage
                                    key={index + 1}
                                    src={publicId}
                                    alt={car.model}
                                    width="800"
                                    height="480"
                                    crop="fill"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full backdrop-blur-md" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full backdrop-blur-md" />
            </Carousel>
            <div className="flex justify-start mt-2">
                <div className="grid grid-cols-4 sm:grid-cols-8 sm:m-0 gap-1 mt-4">
                    {car.imageUrls.map((imageUrl, index) => (
                        <Button
                            key={index}
                            size="xl"
                            className={`border p-1 border-gray-300 rounded-md overflow-hidden bg-transparent aspect-square ${current === index ? "bg-slate-900" : ""
                                }`}
                            onClick={() => handleThumbnailClick(index)}
                        >
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
    )
}

export default DetailCarousel