"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ActionsCell from "@/components/CustomUi/ActionCell"
import { FinancingDataTypes } from "@/lib/Types/FinancingFormTypes"
import { formatDate } from "@/lib/FormatDate"

export const columns: ColumnDef<FinancingDataTypes>[] = [
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
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <div className="text-left">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        First Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const firstName = row.original.personal.firstName;
            return (
                <div className="flex items-center gap-3">
                    <div className="grid gap-0.5">
                        <p className="font-medium hidden md:table-cell">{firstName}</p>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "middleName",
        header: "Middle Name",
        cell: ({ row }) => {
            const financingPersonal = row.original.personal
            return (
                <div className="flex items-center gap-3">
                    <div className="grid gap-0.5">
                        <p className="font-medium hidden md:table-cell">{financingPersonal.middleName}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: ({ row }) => {
            const financingPersonal = row.original.personal
            return (
                <div className="flex items-center gap-3">
                    <div className="grid gap-0.5">
                        <p className="font-medium hidden md:table-cell">{financingPersonal.lastName}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "ssnItin",
        header: "SSN/ITIN",
        cell: ({ row }) => {
            const financingPersonal = row.original.personal
            return (
                <div className="flex items-center gap-3">
                    <div className="grid gap-0.5">
                        <p className="font-medium hidden md:table-cell">{financingPersonal.ssnItin}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const financingContact = row.original.contact
            return (
                <a href={`tel:${financingContact.phone}`} className="hover:underline">{financingContact.phone}</a>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const financingContact = row.original.contact
            return (
                <a href={`mailto:${financingContact.email}`} className="hover:underline">{financingContact.email}</a>
            )
        }

    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => {
            const financingPersonal = row.original.contact
            return (
                <div className="flex items-center gap-3">
                    <div className="grid gap-0.5">
                        <p className="font-medium hidden md:table-cell">{financingPersonal.address}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-right">Published Date</div>,
        cell: ({ row }) => {
            const financingDate = row.original.createdAt
            if (row.original.createdAt) {
                return <div className="text-right">{formatDate(financingDate)}</div>
            }
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const financing = row.original;
            const isRowSelected = row.getIsSelected();

            return (
                <ActionsCell data={financing} isRowSelected={isRowSelected} detail="financing-requests" />
            );
        },
    },
]
