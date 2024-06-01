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
    <footer className="bg-white">
      <div className="container mx-auto px-4">
        <div className="py-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024 M Fest MotorSport All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
            <li>
              <Button variant="link">
                <Link href="/about-us">About</Link>
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
                <Link href="/contact-us">Contact</Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;