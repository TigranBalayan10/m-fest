"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { CldImage } from "next-cloudinary";
import AlertDelete from "@/components/CustomUi/AlertDelete";
import Link from "next/link";
import { Car } from "@/lib/types";
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


const CarTableRow = ({ car }: { car: Car }) => {
  const pathname = usePathname();
  return (<TableRow key={car.id} className="hover:bg-emerald-100">
    <TableCell>
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
    </TableCell>
    <TableCell className="hidden md:table-cell">{car.make}</TableCell>
    <TableCell className="hidden md:table-cell">{car.vin}</TableCell>
    <TableCell>{car.model}</TableCell>
    <TableCell className="hidden md:table-cell">{car.milage}</TableCell>
    <TableCell className="hidden md:table-cell">{car.year}</TableCell>
    <TableCell className="hidden md:table-cell">{car.exteriorInterior}</TableCell>
    <TableCell className="hidden md:table-cell">${car.price}</TableCell>
    <TableCell className="hidden md:table-cell text-right">
      {formatDate(car.createdAt || "N/A")}
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
          {pathname === "/dashboard/archive" ? (
            null) : (
            <DropdownMenuItem>
              <Link href={`/dashboard/edit-inventory/${car.id}`}>
                <Button variant="link" className="text-primary">
                  Edit
                </Button>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <div onClick={(e) => e.stopPropagation()}>
              <AlertDelete title={car.model} itemId={car.id || ""} actionEndpoint="delete-inventory"
                actionName="Delete"
                actionColor="destructive hover:bg-destructive/90"
                httpMethod="DELETE"
                link="link"
              />
            </div>
          </DropdownMenuItem>
          {pathname === "/dashboard/archive" ? (
            null) : (
            <DropdownMenuItem>
              <div onClick={(e) => e.stopPropagation()}>
                <AlertDelete title={car.model}
                  itemId={car.id || ""}
                  actionEndpoint="archive-inventory"
                  actionName="Archive"
                  actionColor="amber-600 hover:bg-amber-500"
                  httpMethod="PUT"
                  link="link"
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href={`/dashboard/inventory/${car.id}`}>
              <Button variant="link" className="text-primary">
                Details
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>)
}

export default CarTableRow;