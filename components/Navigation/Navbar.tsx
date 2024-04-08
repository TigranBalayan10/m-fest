"use client"

import * as React from "react"
import Link from "next/link"
import { NavigationMenuItems } from './NavigationMenuItems';
import { Button } from '../ui/button';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="bg-blue-200 p-4 shadow-xl sticky z-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="items-center hidden md:flex">
                    <Button variant="ghost">
                        <Link href="/">
                            <Image src="/M-Logo.svg" width={50} height={50} alt='M-Fest Logo' />
                        </Link>
                    </Button>
                </div>
                <div className="hidden md:flex space-x-4">
                    <NavigationMenuItems />
                </div>
                <div className="hidden md:flex space-x-1">
                    <Button>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button variant="secondary">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar