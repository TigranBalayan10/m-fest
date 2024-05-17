"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AiOutlineTool } from "react-icons/ai";
import { CldImage } from "next-cloudinary";
import AlertDelete from "@/components/CustomUi/AlertDelete";
import Link from "next/link";
import { Car as CarDataType } from "@/lib/types";
import { formatDate } from "@/lib/FormatDate";

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
      <Button variant="outline" size="icon">
        <Link href={`/dashboard/edit-inventory/${car.id}`}>
          <AiOutlineTool className="h-6 w-6" />
        </Link>
      </Button>
      <AlertDelete title={car.title} carId={car.id} />
    </TableCell>
  </TableRow>
);

export default CarTableRow;