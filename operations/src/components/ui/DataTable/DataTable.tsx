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
import {
  useQueryAssistances,
  useQueryBeneficiary,
  useQueryCase,
  useQueryStage,
} from "~/hooks/query";
import { cn } from "~/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";

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
  const router = useRouter();
  const { user } = useUser();

  const queryClient = useQueryClient();

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
  const { data: customer, isLoading } =
    useQueryCase().useGetBeneficiaryByRut(rutInput);

  const { mutate: createCase } = useQueryCase().useCreate();

  let person = customer?.insured?.rut === rutInput ? customer?.insured : null;

  if (!person) {
    person =
      customer?.beneficiary?.rut === rutInput ? customer?.beneficiary : null;
  }

  const uniqueProducts = customer?.products.reduce(
    (unique: any, product: any) => {
      if (!unique.some((obj: any) => obj.name === product.name)) {
        unique.push(product);
      }
      return unique;
    },
    []
  );

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

  function newCase(productId: string) {
    createCase(
      {
        applicant: {
          type: person?.type,
          id: person?.type === "I" ? person?.id : null,
          rut: rutInput,
          name: person?.name,
          paternalLastName: person?.paternallastname,
          maternalLastName: person?.maternallastname,
          birthDate: person?.birthdate,
          address: person?.address,
          district: person?.district,
          email: person?.email,
          phone: person?.phone,
        },
        customer_id: customer?.customer_id,
        company_id: customer?.company_id,
        isInsured: customer?.insured?.rut === rutInput ? true : false,
        beneficiary_id:
          customer?.insured?.rut === rutInput
            ? null
            : customer?.beneficiary?.id,
        number: null,
        stage_id: stages.find((stage: any) => stage.name === "Apertura")?.id,
        user_id: user?.id,
      },
      {
        onSuccess: (res) => {
          if (person?.type === "I") {
            return createCase(
              {
                applicant: {
                  type: person?.type,
                  id: person?.id,
                },
                number: res.data.number,
                product_id: productId,
                assistance_id: null,
                beneficiary_id: res?.data.beneficiary_id,
                company_id: res?.data.company_id,
                customer_id: res?.data.customer_id,
                stage_id: stages.find(
                  (stage: any) => stage.name === "Registro de servicio"
                )?.id,
                user_id: user?.id,
                description: "",
                isactive: true,
              },
              {
                onSuccess: (res) => {
                  void router.push(`/case/${res.data.id}/registro de servicio`);
                  queryClient.invalidateQueries(["case", res.data?.id]);
                },
              }
            );
          } else {
            return createCase(
              {
                applicant: {
                  type: person?.type,
                  id: customer?.insured?.id,
                },
                number: res.data.number,
                beneficiary_id: res?.data.beneficiary_id,
                isInsured: false,
                company_id: res?.data.company_id,
                customer_id: res?.data.customer_id,
                stage_id: stages.find(
                  (stage: any) => stage.name === "Datos Titular"
                )?.id,
                user_id: user?.id,
                isactive: true,
              },
              {
                onSuccess: (res) => {
                  return createCase(
                    {
                      applicant: {
                        type: person?.type,
                        id: person?.id,
                      },
                      number: res.data.number,
                      product_id: productId,
                      assistance_id: null,
                      beneficiary_id: res?.data.beneficiary_id,
                      company_id: res?.data.company_id,
                      customer_id: res?.data.customer_id,
                      stage_id: stages.find(
                        (stage: any) => stage.name === "Registro de servicio"
                      )?.id,
                      user_id: user?.id,
                      description: "",
                      isactive: true,
                    },
                    {
                      onSuccess: (res) => {
                        void router.push(
                          `/case/${res.data.id}/registro de servicio`
                        );
                        queryClient.invalidateQueries(["case", res.data?.id]);
                      },
                    }
                  );
                },
              }
            );
          }
        },
      }
    );
  }

  useEffect(() => {
    if (rutInput === "-") {
      setRutInput("");
      setIsRutValid(true);
      table.getColumn("rut")?.setFilterValue("");
    }
  }, [rutInput, table]);

  return (
    <div className="flex w-full max-w-7xl flex-col gap-2 pl-12">
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
                    className={cn(
                      "hover:bg-gray-50",
                      value === "" ? "font-semibold" : ""
                    )}
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
                      className={cn(
                        value === assistance.name.toLowerCase()
                          ? "font-semibold"
                          : ""
                      )}
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
                      (stage: any) => stage.name.toLowerCase() === valueStage
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
                      setValueStage(
                        currentValue === valueStage ? "" : currentValue
                      );
                      table.getColumn("stage")?.setFilterValue(undefined);
                      setOpen(false);
                    }}
                    className={cn(
                      "hover:bg-gray-50",
                      value === "" ? "font-semibold" : ""
                    )}
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
                        setValueStage(
                          currentValue === valueStage ? "" : currentValue
                        );
                        table.getColumn("stage")?.setFilterValue(stage.name);
                        setOpen(false);
                      }}
                      className={cn(
                        valueStage === stage.name.toLowerCase()
                          ? "font-semibold"
                          : ""
                      )}
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
      <div
        className={cn(
          "max-w-[412px] rounded-md border p-4 duration-75 hover:border-dusty-gray-200 hover:bg-slate-50",
          !customer && rutInput.length <= 10 ? "hidden" : "flex flex-col"
        )}
      >
        {isLoading ? (
          <h2>Cargando...</h2>
        ) : !customer ? (
          <h2 className="text-sm italic">No se encontraron datos.</h2>
        ) : (
          <>
            <Accordion type="single" collapsible>
              <AccordionItem value="products">
                <AccordionTrigger className="p-0">
                  <div className="flex gap-1">
                    <h2 className="font-zbold capitalize">{`${person?.name} ${person?.paternallastname}`}</h2>
                    <p>{`(${person?.type === "I" ? "Titular" : "Carga"})`}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                  <ul className="flex list-disc flex-col gap-1 items-start">
                    {uniqueProducts?.map((product: any) => (
                      <AlertDialog key={product.id}>
                        <AlertDialogTrigger className="hover:underline">{product.name}</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Creación rápida de caso
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Al continuar se creará un caso para el siguiente cliente y
                              producto.
                            </AlertDialogDescription>
                            <div>
                              <p className="font-semibold">
                                Cliente:{" "}
                                <span className="font-normal capitalize">
                                  {`${person?.name} ${person?.paternallastname}`}
                                </span>
                              </p>
                              <p className="font-semibold">
                                Producto:{" "}
                                <span className="font-normal">
                                  {product.name}
                                </span>
                              </p>
                            </div>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => newCase(product.id)}
                            >
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
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
