import * as React from "react";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import { Label } from "~/components/ui/Label";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full p-2">
      <div className="flex flex-col-reverse items-start justify-between gap-2 py-2 lg:flex-row lg:items-end">
        <div className="flex items-center gap-2">
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="searchClient">Buscar por cliente</Label>
            <Input
              placeholder="Nombre cliente"
              value={
                (table.getColumn("cliente")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("cliente")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
              id="searchClient"
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="searchProduct">Buscar por producto</Label>
            <Input
              placeholder="Nombre producto"
              value={
                (table.getColumn("producto")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("producto")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
              id="searchProduct"
            />
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
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
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="w-[600px]">
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="capitalize">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 w-full text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
