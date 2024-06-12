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
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";


const CarTableRow = ({ car }: { car: Car }) => {
  const pathname = usePathname();

  return (
    <TableRow
      key={car.id}
      className={`
        ${car.isHot && (car.financing?.length ?? 0) > 0 ? "bg-violet-200" :
          car.isHot ? "bg-red-100" :
            (car.financing?.length ?? 0) > 0 ? "bg-emerald-200" :
              "bg-white"
        } hover:bg-emerald-100`}
    >
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
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <ul className="py-1 flex flex-col">
                <li>
                  {pathname === "/dashboard/archive" ? (
                    null) : (
                    <Link href={`/dashboard/edit-inventory/${car.id}`}>
                      <Button variant="link" className="text-primary p-2">
                        Edit
                      </Button>
                    </Link>
                  )}
                </li>
                <li>
                  <AlertDelete title={car.make + " " + car.model} itemId={car.id || ""} actionEndpoint="delete-inventory"
                    actionName="Delete"
                    actionColor="destructive hover:bg-destructive/90"
                    httpMethod="DELETE"
                    link="link"
                  />
                </li>
                <li>
                  {pathname === "/dashboard/archive" ? (
                    null) : (
                    <AlertDelete title={car.make + " " + car.model}
                      itemId={car.id || ""}
                      actionEndpoint="archive-inventory"
                      actionName="Archive"
                      actionColor="amber-600 hover:bg-amber-500"
                      httpMethod="PUT"
                      link="link"
                      getEndpoint="inventory"
                    />
                  )}
                </li>
                <li>
                  <Link href={`/dashboard/inventory/${car.id}`}>
                    <Button variant="link" className="text-primary p-2">
                      Details
                    </Button>
                  </Link>
                </li>
              </ul>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default CarTableRow;