import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Button } from "../ui/button"
import { OctagonX, Settings } from "lucide-react"

async function getCarList() {
    const carData = await prisma.carList.findMany()
    return carData
}

const DataTable = async () => {
    const carData = await getCarList()
    console.log(carData)
    return (
        <Card className='bg-slate-300 p-4 flex flex-col items-center'>
            <Table>
                <TableCaption>A list of your recently added cars for sale</TableCaption>
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
                        <TableHead className="text-right">Edit/Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carData.map((car) => {
                        const dateOptions: Intl.DateTimeFormatOptions = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        };

                        const carWithDateString = {
                            ...car,
                            createdAt: new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(car.createdAt)),
                            updatedAt: new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(car.updatedAt)),
                        };

                        return (
                            <TableRow key={car.id}>
                                <TableCell>{car.title}</TableCell>
                                <TableCell>{car.vin}</TableCell>
                                <TableCell>{car.make}</TableCell>
                                <TableCell>{car.milage}</TableCell>
                                <TableCell>{car.year}</TableCell>
                                <TableCell>{car.exteriorInterior}</TableCell>
                                <TableCell>${car.price}</TableCell>
                                <TableCell className="text-right">
                                    {carWithDateString.createdAt}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                    <Settings color="#52489d" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <OctagonX color="red" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    )
}

export default DataTable