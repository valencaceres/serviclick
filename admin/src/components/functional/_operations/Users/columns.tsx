"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";

import { type User } from "~/interfaces/user";
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre completo",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-semibold">
            {`${row.original.first_name ?? ""} ${""} ${
              row.original.last_name ?? ""
            }`}
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
          <span className="font-semibold">{`${
            row.original.email_addresses[0].email_address ?? ""
          }`}</span>
        </div>
      );
    },
  },
];
