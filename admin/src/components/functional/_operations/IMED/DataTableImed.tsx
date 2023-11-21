"use client";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";

import { Button } from "~/components/ui/Button";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageInfo: Pagination;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

interface Pagination {
  total: number;
  page: number;
  records: number;
}

export function DataTableImed<TData, TValue>({
  columns,
  data,
  pageInfo,
  isLoading,
  setPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [buttonLoadingStates, setButtonLoadingStates] = useState({
    firstPage: false,
    prevPage: false,
    nextPage: false,
    lastPage: false,
  });

  const handleButtonClick = (buttonName: string, pageFunction: () => void) => {
    setButtonLoadingStates(() => {
      const newState = {
        firstPage: false,
        prevPage: false,
        nextPage: false,
        lastPage: false,
        [buttonName]: true,
      };
      return newState;
    });

    pageFunction();
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-2">
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
                  className="even:bg-sky-50 hover:bg-gray-100"
                  data-state={row.getIsSelected() && "selected"}
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
                  No se encontraron reembolsos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={`flex items-center justify-end px-2`}>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {pageInfo.page} de {pageInfo.total}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex"
              onClick={() => handleButtonClick("firstPage", () => setPage(1))}
            >
              <span className="sr-only">Go to first page</span>
              {buttonLoadingStates.firstPage && isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsLeft className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handleButtonClick("prevPage", () =>
                  setPage(Math.max(pageInfo.page - 1, 1))
                )
              }
            >
              <span className="sr-only">Go to previous page</span>
              {buttonLoadingStates.prevPage && isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            {/* Tercer botón */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handleButtonClick("nextPage", () =>
                  setPage(Math.min(pageInfo.page + 1, pageInfo.total))
                )
              }
            >
              <span className="sr-only">Go to next page</span>
              {buttonLoadingStates.nextPage && isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {/* Cuarto botón */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() =>
                handleButtonClick("lastPage", () => setPage(pageInfo.total))
              }
            >
              <span className="sr-only">Go to last page</span>
              {buttonLoadingStates.lastPage && isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
