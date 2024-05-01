import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface CarData {
    make: string;
    vin: string;
    description: string;
    milage: string;
    year: string;
    exteriorInterior: string;
    price: string;
    createdAt: string;
}

interface CarDataDetailsProps {
    car: CarData;
}

const CarDataDetails = ({ car }: CarDataDetailsProps) => {
    const date = new Date(car.createdAt)
    car.createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Make</TableHead>
                        <TableHead>VIN</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Milage</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Exterior/Interior</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Published Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{car.make}</TableCell>
                        <TableCell>{car.description}</TableCell>
                        <TableCell>{car.vin}</TableCell>
                        <TableCell>{car.milage}</TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>{car.exteriorInterior}</TableCell>
                        <TableCell>{car.price}</TableCell>
                        <TableCell className="text-right">
                            {car.createdAt}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default CarDataDetails