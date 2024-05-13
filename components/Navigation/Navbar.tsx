"use client";

import * as React from "react";
import Link from "next/link";
import { NavigationMenuItems } from "./NavigationMenuItems";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className="bg-blue-200 p-4 shadow-xl sticky z-10">
      <div className="container pl-0 pr-0 flex justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost">
            <Link href="/">
              <Image src="/M-Logo.svg" width={50} height={50} alt="M-Fest Logo" />
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="ghost">
                <FaBars size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <NavigationMenuItems />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <NavigationMenuItems />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
