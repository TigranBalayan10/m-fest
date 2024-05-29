"use client";

import * as React from "react";
import Link from "next/link";
import { NavigationMenuItems } from "./NavigationMenuItems";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavMobileItems from "@/components/Navigation/NavMobileItems";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/sign-in')) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-b from-zinc-200 via-zinc-200 to-zinc-100/50 p-4 shadow-xl sticky z-10 top-0">
      <div className="container pl-0 pr-0 flex justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost">
            <Link href="/">
              <Image src="/M-Logo.svg" width={100} height={100} alt="M-Fest Logo" />
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <NavMobileItems />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <NavigationMenuItems />
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
