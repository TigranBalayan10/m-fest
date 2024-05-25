import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="my-5 flex-grow mx-5">
      <div className="container mx-auto card-bg rounded-md shadow-lg pl-0 pr-0 px-4 md:px-0">
        <div className="md:flex">
          <div className="relative md:w-1/2">
            <video
              className="w-full h-auto rounded-t-md md:rounded-l-md md:rounded-r-none"
              autoPlay
              muted
              playsInline
            >
              <source src="/BMW logo animation.webm" type="video/webm" />
            </video>
          </div>
          <div className="md:w-1/2 p-8 flex md:ml-auto md:flex md:items-center">
            <div className="md:text-right text-center">
              <h2 className="text-3xl font-semibold text-gray-400 md:text-4xl">
                Welcome to <br></br> <span className="text-blue-400">M Fest MotorSport</span>
              </h2>
              <p className="mt-2 text-sm text-gray-200 md:text-base">
                Welcome to M Fest MotorSport, your home for luxury BMW vehicles.
                Explore our iconic models and start your BMW journey today!
              </p>
              <div className="flex md:justify-end justify-center mt-6">
                <Link href="/inventory">
                  <Button>Browse Inventory</Button>
                </Link>
                <Button variant="ghost" className="ml-2 text-slate-400">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
