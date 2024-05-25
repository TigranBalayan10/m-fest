"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CarListData } from "@/lib/zodSchema";
import { Car } from "@/lib/types";
import { CldImage } from "next-cloudinary";
import useSWR from "swr";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

async function fetcher() {
  const response = await fetch('/api/inventory');
  const data = await response.json();
  return data;

}

export function NavigationMenuItems() {
  const [isMenu, setIsMenu] = useState<boolean>(true);

  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);
  const firstFourCars = data?.carData?.slice(0, 4);

  return (

    <NavigationMenu>
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {isMenu && firstFourCars && firstFourCars.length > 1 && (
          <div className="hidden md:block">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                New Arrivals
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Grid layout for tablets and desktops */}
                <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-stone-300">
                  {firstFourCars.map((item: CarListData, index: number) => (
                    <ListItem key={index} title={item.make} href={`/inventory/${item.id}`}>
                      <CldImage
                        src={item.imageUrls[0]}
                        width="480"
                        height="240"
                        crop="fill"
                        alt={item.make}
                      />
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </div>
        )}
        <NavigationMenuItem>
          <Link href="/inventory" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inventory
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/financing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Financing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact-us" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact Seller
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about-us" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foregroundn",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
