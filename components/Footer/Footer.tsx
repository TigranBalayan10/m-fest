"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/sign-in')) {
    return null;
  }
  return (
    <footer className="bg-white w-screen">
      <div className="p-4 container md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 M Fest MotorSport All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <Button variant="link">
              <Link href="/about">About</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link href="/licensing">Licensing</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link href="/contact">Contact</Link>
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
