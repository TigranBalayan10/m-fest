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
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { GripVertical } from "lucide-react"



const DataTable = () => {
    return (
        <Dialog>
            <Card className='bg-slate-300 p-4 flex flex-col items-center'>
                <Table>
                    <TableCaption>A list of your recently added cars for sale</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Make</TableHead>
                            <TableHead>VIN</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">BMW M5</TableCell>
                            <TableCell>54654564dsfdsf54</TableCell>
                            <TableCell>2018</TableCell>
                            <TableCell className="text-right">$25,000</TableCell>
                            <TableCell className="text-right">
                                <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <GripVertical />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>BMW M5</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        <p>Form goes here</p>
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button variant="destructive">Delete</Button>
                                        <Button variant="secondary">Save</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </Dialog>
    )
}

export default DataTable