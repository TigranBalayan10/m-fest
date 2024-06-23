"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useSmallScreenColumnVisibility from "@/lib/useSmallScreenColumnVisibility"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DialogDash from "../CustomUi/DialogDashInventory"
import { useMediaQuery } from "@react-hookz/web"

interface DataTableProps<TData extends { id?: string }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    smallScreenColumnIds: string[];
    filterColumn: string;
    filterPlaceholder: string;
    deleteEndpoint: string;
    archiveEndpoint?: string;
    mutateEndpoint: string;
}

export function DataTable<TData extends { id?: string }, TValue>({
    columns,
    data,
    smallScreenColumnIds,
    filterColumn,
    filterPlaceholder,
    deleteEndpoint,
    archiveEndpoint,
    mutateEndpoint,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [selectedRowIds, setSelectedRowIds] = useState<(string | undefined)[]>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    useSmallScreenColumnVisibility<TData>(table, smallScreenColumnIds);

    const isSmallScreen = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
        const ids = Object.entries(rowSelection)
            .filter(([key, value]) => value)
            .map(([key]) => data[parseInt(key)]?.id);
        setSelectedRowIds(ids || []);
    }, [rowSelection, data]);
    return (
        <div>
            <div className="flex justify-between space-x-1 items-center py-4">
                <div className="flex space-x-1 items-center mr-1">
                    <DialogDash
                        action="Delete"
                        itemIds={selectedRowIds.filter((id): id is string => id !== undefined)}
                        resetSelection={() => setRowSelection({})}
                        apiEndpoint={deleteEndpoint}
                        mutateEndpoint={mutateEndpoint}
                        successMessage="Item(s) deleted successfully."
                    />
                    {archiveEndpoint && (
                        <DialogDash
                            action="Archive"
                            itemIds={selectedRowIds.filter((id): id is string => id !== undefined)}
                            resetSelection={() => setRowSelection({})}
                            apiEndpoint={archiveEndpoint}
                            mutateEndpoint={mutateEndpoint}
                            successMessage="Item(s) archived successfully."
                        />
                    )}
                </div>
                <div>
                    <Input
                        placeholder={filterPlaceholder}
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div>
                {table.getPageCount() > 1 && (
                    <Pagination className="mt-2">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                />
                            </PaginationItem>
                            {Array.from({ length: table.getPageCount() }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={index === table.getState().pagination.pageIndex}
                                        onClick={() => table.setPageIndex(index)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
                <div className="text-sm text-center mt-2 text-gray-500">
                    Showing {table.getRowModel().rows?.length} of {data.length} results.
                </div>
            </div>
        </div>
    )
}
