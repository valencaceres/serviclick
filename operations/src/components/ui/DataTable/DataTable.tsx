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

import { useEffect, useState } from "react";

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
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../ButtonC";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "../Command";
import { useQueryAssistances, useQueryStage } from "~/hooks/query";
import { cn } from "~/lib/utils";

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

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [openStage, setOpenStage] = useState<boolean>(false);
  const [valueStage, setValueStage] = useState<string>("");

  const { data: assistances } = useQueryAssistances().useGetAll();
  const { data: stages } = useQueryStage().useGetAll();

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

  useEffect(() => {
    if (rutInput === "-") {
      setRutInput("");
      setIsRutValid(true);
      table.getColumn("rut")?.setFilterValue("");
    }
  }, [rutInput, table])

  return (
    <div className="flex w-full flex-col gap-2 pl-12">
      <div className="flex flex-col gap-2 md:flex-row">
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
            className={`max-w-sm rounded-md ${
              isRutValid ? "" : "border-red-500 bg-red-50"
            }`}
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
            className="max-w-sm rounded-md"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <Label htmlFor="searchService" className="mb-1">
            Buscar por Servicio
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="max-w-sm items-center justify-between overflow-hidden border-dusty-gray-200 py-6"
              >
                {value
                  ? assistances?.find(
                      (assistance: any) =>
                        assistance.name.toLowerCase() === value
                    )?.name
                  : "Seleccionar servicio..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-96 w-[200px] overflow-y-auto p-0">
              <Command>
                <CommandInput placeholder="Buscar por Servicio..." />
                <CommandEmpty>Servicio no encontrado.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value=""
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      table.getColumn("assistance")?.setFilterValue(undefined);
                      setOpen(false);
                    }}
                    className={cn("hover:bg-gray-50",value === "" ? "font-semibold" : "")}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Sin filtro
                  </CommandItem>
                  <CommandSeparator className="my-2" />
                  {assistances?.map((assistance: any) => (
                    <CommandItem
                      key={assistance.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        table
                          .getColumn("assistance")
                          ?.setFilterValue(assistance.name);
                        setOpen(false);
                      }}
                      className={cn(value === assistance.name.toLowerCase() ? "font-semibold" : "")}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === assistance.name.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {assistance.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </fieldset>
        <fieldset className="flex flex-col">
          <Label htmlFor="searchService" className="mb-1">
            Buscar por Estado
          </Label>
          <Popover open={openStage} onOpenChange={setOpenStage}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openStage}
                className="max-w-sm items-center justify-between overflow-hidden border-dusty-gray-200 py-6"
              >
                {valueStage
                  ? stages?.find(
                      (stage: any) =>
                        stage.name.toLowerCase() === valueStage
                    )?.name
                  : "Seleccionar estado..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-96 w-[200px] overflow-y-auto p-0">
              <Command>
                <CommandInput placeholder="Buscar por Estado..." />
                <CommandEmpty>Estado no encontrado.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value=""
                    onSelect={(currentValue) => {
                      setValueStage(currentValue === valueStage ? "" : currentValue);
                      table.getColumn("stage")?.setFilterValue(undefined);
                      setOpen(false);
                    }}
                    className={cn("hover:bg-gray-50",value === "" ? "font-semibold" : "")}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueStage === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Sin filtro
                  </CommandItem>
                  <CommandSeparator className="my-2" />
                  {stages?.map((stage: any) => (
                    <CommandItem
                      key={stage.id}
                      onSelect={(currentValue) => {
                        setValueStage(currentValue === valueStage ? "" : currentValue);
                        table
                          .getColumn("stage")
                          ?.setFilterValue(stage.name);
                        setOpen(false);
                      }}
                      className={cn(valueStage === stage.name.toLowerCase() ? "font-semibold" : "")}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueStage === stage.name.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {stage.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
