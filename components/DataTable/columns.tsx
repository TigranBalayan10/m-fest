"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Car } from "@/lib/types"
import { formatDate } from "@/lib/FormatDate"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CldImage } from "next-cloudinary"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ActionsCell from "@/components/CustomUi/ActionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Car>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
        accessorKey: "make",
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
        accessorKey: "model",
        header: "Model",

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
            const data = row.original;
            const isRowSelected = row.getIsSelected();

            return (
                <ActionsCell data={data} isRowSelected={isRowSelected} />
            );
        },
    },
]
