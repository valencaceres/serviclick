import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/Button";

import { type IReport } from "~/interfaces/report";

export const columns: ColumnDef<IReport>[] = [
  {
    id: "cliente",
    accessorKey: "customer_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "producto",
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "compra",
    accessorKey: "incorporation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Compra
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "valor",
    accessorKey: "fee_value",
    header: "Valor",
    cell: ({ row }) => {
      const charged = parseInt(row.getValue("valor"));
      const formatted = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(charged);

      return formatted;
    },
  },
  {
    id: "mes gratis",
    accessorKey: "free_months",
    header: "Mes gratis",
  },
  {
    id: "cuotas",
    accessorKey: "fees_charged",
    header: "Cuotas",
  },
  {
    id: "cobrado",
    accessorKey: "charged",
    header: "Cobrado",
    cell: ({ row }) => {
      const charged = parseInt(row.getValue("cobrado"));
      const formatted = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(charged);

      return <div className="font-semibold text-green-500">{formatted}</div>;
    },
  },
  {
    id: "pagado",
    accessorKey: "paid",
    header: "Pagado",
    cell: ({ row }) => {
      const charged = parseInt(row.getValue("pagado"));
      const formatted = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(charged);

      return <div className="font-semibold text-yellow-500">{formatted}</div>;
    },
  },
  {
    id: "deuda",
    accessorKey: "balance",
    header: "Deuda",
    cell: ({ row }) => {
      const charged = parseInt(row.getValue("deuda"));
      const formatted = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(charged);

      return <div className="font-semibold text-red-500">{formatted}</div>;
    },
  },
];
