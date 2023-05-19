"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../TableC";
import { Input } from "../Input";
import { Label } from "../Label";

import { DataTablePagination } from "./DataTablePagination";
import { isValidRut, rutValidate } from "~/utils/validations";
import { unFormatRut } from "~/utils/format";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  paginate,
}: DataTableProps<TData, TValue> & {
  paginate?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [rutInput, setRutInput] = useState<string>("");
  const [isRutValid, setIsRutValid] = useState<boolean>(true);

  const formatRut = (rawRut: string) => {
    let tempRut = rawRut.replace(/\./g, "").replace(/-/g, "");
    let rutBody = tempRut.slice(0, -1);
    let rutDv = tempRut.slice(-1);

    let bodyLength = rutBody.length;

    if (bodyLength > 6) {
      rutBody = `${rutBody.slice(0, bodyLength - 6)}.${rutBody.slice(
        bodyLength - 6,
        bodyLength - 3
      )}.${rutBody.slice(bodyLength - 3)}`;
    } else if (bodyLength > 3) {
      rutBody = `${rutBody.slice(0, bodyLength - 3)}.${rutBody.slice(
        bodyLength - 3
      )}`;
    }

    return `${rutBody}-${rutDv}`;
  };

  const handleChangeRut = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "-") {
      setRutInput("");
      setIsRutValid(true);
      table.getColumn("rut")?.setFilterValue("");
      return;
    }

    const raw = e.target.value.replace(/[^0-9kK]/g, "");
    const formatted = formatRut(raw);
    setRutInput(formatted);

    const validation = rutValidate(unFormatRut(formatted));
    setIsRutValid(validation);

    table.getColumn("rut")?.setFilterValue(formatted);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex w-full flex-col gap-2 pl-12">
      <div className="flex gap-2">
        <fieldset className="flex flex-col">
          <Label htmlFor="searchRut" className="mb-1">
            Buscar por RUT
          </Label>
          <Input
            id="searchRut"
            placeholder="Ej: 12345678-9"
            value={rutInput}
            onChange={handleChangeRut}
            maxLength={12}
            className={`max-w-sm ${isRutValid ? "" : "border-red-500 bg-red-50"}`}
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <Label htmlFor="searchFullname" className="mb-1">
            Buscar por Beneficiario
          </Label>
          <Input
            id="searchFullname"
            placeholder="Nombre o apellido..."
            value={
              (table.getColumn("fullname")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              table.getColumn("fullname")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${
                    onRowClick && "cursor-pointer"
                  } hover:bg-gray-100`}
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
                  Sin resultados.
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
