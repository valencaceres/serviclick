"use client";

import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { DataTablePagination } from "~/components/functional/Case/DataTable/DataTablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/TableC";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { Button } from "~/components/ui/ButtonC";
import { useQueryFamily } from "~/hooks/query";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "~/components/ui/Command";
import { cn } from "~/utils/cn";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedFamily, setSelectedFamily] = useState<string>("");

  const { data: families } = useQueryFamily().useGetAll();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="flex w-full max-w-7xl flex-col gap-2 pl-12">
      <div className="flex flex-col gap-2 md:flex-row">
        <fieldset className="flex w-full max-w-sm flex-col">
          <Label htmlFor="searchService" className="mb-1">
            Buscar por familia
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full md:max-w-sm items-center justify-between overflow-hidden rounded-sm border-dusty-gray-200 py-6"
              >
                {selectedFamily
                  ? families?.find(
                      (family: any) =>
                        family.name.toLowerCase() === selectedFamily
                    )?.name
                  : "Buscar por familia..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-96 overflow-y-auto p-0">
              <Command>
                <CommandInput placeholder="Buscar por familia..." />
                <CommandEmpty>Familia no encontrada.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value=""
                    onSelect={(currentValue) => {
                      setSelectedFamily(
                        currentValue === selectedFamily ? "" : currentValue
                      );
                      table.getColumn("family_name")?.setFilterValue(undefined);
                      setOpen(false);
                    }}
                    className={cn(
                      "hover:bg-gray-50",
                      selectedFamily === "" ? "font-semibold" : ""
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFamily === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Sin filtro
                  </CommandItem>
                  <CommandSeparator className="my-2" />
                  {families?.map((family: any) => (
                    <CommandItem
                      key={family.id}
                      onSelect={(currentValue) => {
                        setSelectedFamily(
                          currentValue === selectedFamily ? "" : currentValue
                        );
                        table
                          .getColumn("family_name")
                          ?.setFilterValue(family.name);
                        setOpen(false);
                      }}
                      className={cn(
                        selectedFamily === family.name.toLowerCase()
                          ? "font-semibold"
                          : ""
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedFamily === family.name.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {family.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </fieldset>
        <fieldset className="flex w-full flex-col">
          <Label htmlFor="searchName" className="mb-1">
            Buscar por nombre
          </Label>
          <Input
            placeholder="Nombre de asistencia"
            id="searchName"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </fieldset>
        <fieldset className="flex w-full flex-col">
          <Label htmlFor="searchAlias" className="mb-1">
            Buscar por alianza
          </Label>
          <Input
            placeholder="Nombre de alianza"
            id="searchAlias"
            value={(table.getColumn("alias")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("alias")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </fieldset>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`${
                    onRowClick && "cursor-pointer"
                  } hover:bg-gray-100 even:bg-sky-50`}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
