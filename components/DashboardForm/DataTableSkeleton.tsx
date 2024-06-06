import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DataTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm max-w-full">
      <Table>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <Skeleton className="h-12 w-12 rounded-full bg-slate-200" />
                </TableCell>
                {Array(9)
                  .fill(0)
                  .map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex >= 7 ? "text-right" : ""}
                    >
                      <Skeleton className="h-7 w-25 bg-slate-200" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>)
};

export default DataTableSkeleton;
