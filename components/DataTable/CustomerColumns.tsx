"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ActionsCell from "@/components/CustomUi/ActionCell"
import { Customer } from "@/lib/Types/ContactUsTypes"
import { getInitials } from "@/lib/GetInitials"

export const columns: ColumnDef<Customer>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="text-left">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const customer = row.original
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="font-medium hidden md:table-cell">{customer.name}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const customer = row.original
            return (
                <a href={`tel:${customer.phone}`} className="hover:underline">{customer.phone}</a>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const customer = row.original
            return (
                <a href={`mailto:${customer.email}`} className="hover:underline">{customer.email}</a>
            )
        }

    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const customer = row.original;
            const isRowSelected = row.getIsSelected();

            return (
                <ActionsCell data={customer} isRowSelected={isRowSelected} />
            );
        },
    },
]
