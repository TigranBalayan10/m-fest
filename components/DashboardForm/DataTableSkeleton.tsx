import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const DataTableSkeleton = () => {
  return Array(5)
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
    ));
};

export default DataTableSkeleton;
