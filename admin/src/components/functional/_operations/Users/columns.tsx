"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";

import { type User } from "@clerk/nextjs/dist/types/server";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre completo",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-semibold">
            {`${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-semibold">
            {`${row.original.emailAddresses[0]?.emailAddress ?? ""}`}
          </span>
        </div>
      );
    },
  },
];
