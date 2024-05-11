import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "../ui/card";

const DataTableSkeleton = () => {
  return (
    <Card className="bg-slate-300 p-4 flex flex-col items-center">
      <Table>
        <TableCaption>A list of your recently added cars for sale</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Make</TableHead>
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
          {Array(5)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </TableCell>
                {Array(9)
                  .fill(0)
                  .map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex >= 7 ? "text-right" : ""}
                    >
                      <Skeleton className="h-7 w-25" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>)
};

export default DataTableSkeleton;
