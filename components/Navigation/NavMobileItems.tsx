import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetClose, SheetContent, Sheet } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image";
import { AiOutlineHome, AiOutlineUser, AiOutlineMail, AiOutlineBars } from "react-icons/ai";
import { BsSuitcaseLg } from "react-icons/bs";



const NavMobileItems = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="top-4 right-4 z-50 lg:hidden bg-none" size="icon" variant="outline">
                    <AiOutlineBars className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] bg-white p-4" side="left">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image src="/M-Logo.svg" width={50} height={50} alt="M-Fest Logo" />
                            <span className="font-semibold text-sm">M-Fest Motorsport</span>
                        </div>
                    </div>
                <nav className="mt-6 grid gap-4">
                    <SheetClose asChild>
                        <Link
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="/"
                        >
                            <AiOutlineHome className="h-5 w-5" />
                            Home
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="about-us"
                        >
                            <AiOutlineUser className="h-5 w-5" />
                            About
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="/services"
                        >
                            <BsSuitcaseLg className="h-5 w-5" />
                            Services
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="/contact-us"
                        >
                            <AiOutlineMail className="h-5 w-5" />
                            Contact
                        </Link>
                    </SheetClose>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default NavMobileItems