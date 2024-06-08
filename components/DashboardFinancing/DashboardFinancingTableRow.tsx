"use client";

import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { BsThreeDots } from "react-icons/bs";
import AlertDelete from "@/components/CustomUi/AlertDelete";
import Link from "next/link";
import { FinancingDataTypes } from "@/lib/Types/FinancingFormTypes";
import { formatDate } from "@/lib/FormatDate";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";


const DashboardFinancingTableRow = ({ financing }: { financing: FinancingDataTypes }) => {
    const pathname = usePathname();
    const fullAddress = `${financing.contact.address}, ${financing.contact.city}, ${financing.contact.state}, ${financing.contact.zip}`;
    return (
        <TableRow key={financing.id} className="hover:bg-emerald-100">
            <TableCell>{financing.personal.firstName}</TableCell>
            <TableCell className="hidden md:table-cell">{financing.personal.middleName}</TableCell>
            <TableCell>{financing.personal.lastName}</TableCell>
            <TableCell className="hidden md:table-cell">{financing.personal.ssnItin}</TableCell>
            <TableCell>{financing.contact.phone}</TableCell>
            <TableCell className="hidden md:table-cell">{financing.contact.email}</TableCell>
            <TableCell className="hidden md:table-cell">{fullAddress}</TableCell>
            <TableCell className="hidden md:table-cell text-right">
                {formatDate(financing.createdAt || "N/A")}
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <BsThreeDots className="w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/financing-requests/${financing.id}`}>
                                <Button variant="link" className="text-primary">
                                    Details
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default DashboardFinancingTableRow;