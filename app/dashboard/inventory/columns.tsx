"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Car } from "@/lib/types"
import { formatDate } from "@/lib/FormatDate"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CldImage } from "next-cloudinary"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Car>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const car = row.original
            if (car.imageUrls?.length > 0) {
                return (
                    <Avatar>
                        <CldImage
                            src={car.imageUrls[0]}
                            width="100"
                            height="100"
                            crop="fill"
                            alt={car.make + " " + car.model}
                        />
                        <AvatarFallback>{car.make.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                )
            }
        }
    },
    {
        accessorKey: "model",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Model
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: "make",
        header: "Make",
    },
    {
        accessorKey: "vin",
        header: "VIN",
    },
    {
        accessorKey: "milage",
        header: "Milage",
    },
    {
        accessorKey: "year",
        header: ({ column }) => {
            return (
                <div className="text-left">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Year
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "exteriorInterior",
        header: "Exterior/Interior",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            if (row.original.price) {
                return <div className="">${row.original.price}</div>
            }
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-right">Published Date</div>,
        cell: ({ row }) => {
            if (row.original.createdAt) {
                return <div className="text-right">{formatDate(row.original.createdAt)}</div>
            }
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const car = row.original
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(car.id || "")}
                            >
                                Copy car ID
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/dashboard/edit-inventory/${car.id}`}>
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/dashboard/inventory/${car.id}`}>
                                    Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]
