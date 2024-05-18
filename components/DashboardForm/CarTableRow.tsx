"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AiOutlineTool } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CldImage } from "next-cloudinary";
import AlertDelete from "@/components/CustomUi/AlertDelete";
import Link from "next/link";
import { Car as CarDataType } from "@/lib/types";
import { formatDate } from "@/lib/FormatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const CarTableRow = ({ car }: { car: CarDataType }) => (
  <TableRow key={car.id}>
    <TableCell>
      <Avatar>
        <CldImage
          src={car.imageUrls[0]}
          width="100"
          height="100"
          crop="fill"
          alt={car.title}
        />
        <AvatarFallback>{car.title.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </TableCell>
    <TableCell className="hidden md:table-cell">{car.title}</TableCell>
    <TableCell className="hidden md:table-cell">{car.vin}</TableCell>
    <TableCell>{car.make}</TableCell>
    <TableCell className="hidden md:table-cell">{car.milage}</TableCell>
    <TableCell className="hidden md:table-cell">{car.year}</TableCell>
    <TableCell className="hidden md:table-cell">{car.exteriorInterior}</TableCell>
    <TableCell className="hidden md:table-cell">${car.price}</TableCell>
    <TableCell className="hidden md:table-cell text-right">
      {formatDate(car.createdAt)}
    </TableCell>
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <BsThreeDots className="w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/dashboard/edit-inventory/${car.id}`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div onClick={(e) => e.stopPropagation()}>
              <AlertDelete title={car.title} itemId={car.id} actionEndpoint="delete-inventory"
                actionName="Delete"
                actionColor="text-red-500"
                httpMethod="DELETE" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div onClick={(e) => e.stopPropagation()}>
              <AlertDelete title={car.title} itemId={car.id} actionEndpoint="archive-inventory"
                actionName="Archive"
                actionColor="text-amber-700"
                httpMethod="PUT" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/edit-inventory/${car.id}`}>
              Details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);

export default CarTableRow;