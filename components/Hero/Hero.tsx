import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="mt-5 flex-grow">
            <div className="flex bg-teal-200 h-full container mx-auto">
                <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                            Welcome to <span className="text-blue-800">M Fest MotorSport</span>
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 md:text-base">
                        Welcome to M Fest MotorSport, your home for luxury BMW vehicles. Explore our iconic models and start your BMW journey today!
                        </p>
                        <div className="flex justify-center lg:justify-start mt-6">
                            <Button>Browse Inventory</Button>
                            <Button variant="ghost" className="ml-2">Learn More</Button>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}>
                        <div className="">
                            <Image src="/bmw-landing-page.jpg" width={600} height={300} alt='BMW landing page pic' />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Hero