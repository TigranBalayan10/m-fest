"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
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
    <TableCell>{car.title}</TableCell>
    <TableCell>{car.vin}</TableCell>
    <TableCell>{car.make}</TableCell>
    <TableCell>{car.milage}</TableCell>
    <TableCell>{car.year}</TableCell>
    <TableCell>{car.exteriorInterior}</TableCell>
    <TableCell>${car.price}</TableCell>
    <TableCell className="text-right">
      {formatDate(car.createdAt)}
    </TableCell>
    <TableCell className="text-right">
      <Button variant="ghost" size="icon">
        <Link href={`/dashboard/edit-inventory/${car.id}`}>
          <Settings color="black" />
        </Link>
      </Button>
      <AlertDelete title={car.title} carId={car.id} />
    </TableCell>
  </TableRow>
);

export default CarTableRow;