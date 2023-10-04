import React from "react";

import { api } from "~/utils/api";
import { columns } from "../Users/columns";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
export const Users: React.FC = () => {
  const { data: users } = api.users.getAll.useQuery();
  if (!users) return null;

  return (
    <>
      <div className="flex w-[1300px] justify-between p-4 max-[1336px]:w-full">
        <h1 className="text-2xl font-bold text-black">Operadores</h1>
        <Link href={"/operations/users/new"} passHref>
          <Button>Crear Operador</Button>
        </Link>
      </div>

      <DataTableUsers columns={columns} data={users} />
    </>
  );
};

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "~/components/ui/DataTablePagination";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import { type User } from "@clerk/nextjs/dist/types/server";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableUsers<TData extends User, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();
  const handleRowClick = async (rowId: string) => {
    await router.push(`/operations/users/${rowId}`);
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
                  className="cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={() => handleRowClick(row.original.id)}
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
                  No se encontraron usuarios.
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
