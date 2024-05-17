import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "../ui/card";

const DataTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm max-w-full">
      <Table>
        <TableCaption>A list of your recently added cars for sale</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="hidden md:table-cell">Model</TableHead>
            <TableHead className="hidden md:table-cell">VIN</TableHead>
            <TableHead>Make</TableHead>
            <TableHead className="hidden md:table-cell">Milage</TableHead>
            <TableHead className="hidden md:table-cell">Year</TableHead>
            <TableHead className="hidden md:table-cell">Exterior/Interior</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell text-right">Published Date</TableHead>
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
    </div>)
};

export default DataTableSkeleton;
