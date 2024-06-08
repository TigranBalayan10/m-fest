import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet, SheetClose } from "@/components/ui/sheet";
import { FaPlus, FaBoxArchive, FaUsers, FaChartLine, FaUncharted, FaCar, FaHandHoldingDollar } from "react-icons/fa6";
import { FcAddDatabase } from "react-icons/fc";
import { IoMenuSharp } from "react-icons/io5";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import AccordionInbox from "../Inbox/AccordionInbox";

const DashboardNav = () => {
  const { userId } = auth();

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center justify-between md:justify-start md:space-x-4 w-full md:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="rounded-full md:hidden"
                size="icon"
                variant="ghost"
              >
                <span className="sr-only">Toggle sidebar</span>
                <IoMenuSharp size="2em" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <nav>
                <ul className="space-y-2">
                  <li>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                        href="/dashboard"
                      >
                        <Image src="/M-Logo.svg" width={50} height={50} alt="M-Fest Logo" />
                        <span className="font-semibold text-sm">M-Fest Motorsport</span>
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                        href="/dashboard/inventory"
                      >
                        <FaCar />
                        Inventory
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <AccordionInbox isMobile={true} />
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                        href="/dashboard/archive"
                      >
                        <FaBoxArchive />
                        Archive
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                        href="/dashboard/financing-requests"
                      >
                        <FaHandHoldingDollar />
                        Financing
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                        href="/dashboard/customers"
                      >
                        <FaUsers />
                        Customers
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-800"
                        href="/dashboard/add-inventory"
                      >
                        <FcAddDatabase />
                        Add Manually
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-800"
                        href="/dashboard/add-by-vin"
                      >
                        <FcAddDatabase />
                        Add By Vin
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex md:flex-grow">
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  className="rounded-md px-3 py-2"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-800"
                  href="/dashboard/add-inventory"
                >
                  <FcAddDatabase />
                  Add Manually
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-800"
                  href="/dashboard/add-by-vin"
                >
                  <FcAddDatabase />
                  Add By Vin
                </Link>
              </li>
            </ul>
          </nav>
          <div className="ml-auto md:absolute md:right-10 md:w-10 md:h-10 md:top-4">
            {userId && <UserButton afterSignOutUrl="/" />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
