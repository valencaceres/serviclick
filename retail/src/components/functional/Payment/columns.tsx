import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { type Lead } from "~/interfaces/payment";
import { usePayment } from "~/store/hooks";
export const columns: ColumnDef<Lead>[] = [
  {
    id: "cliente",
    accessorKey: "customer.name",
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
    accessorKey: "product.name",
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
    accessorKey: "date",
    cell: ({ row }) => {
      const [year, month, day] = row.original.date.split("-");
      const formattedDate = `${day}-${month}-${year}`;
      return <span>{formattedDate}</span>;
    },
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
    id: "Pagado",
    accessorKey: "product.price",
    header: "Pagado",
    cell: ({ row }) => {
      const charged = row.original.product.price;
      const formatted = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(charged);

      return <div className="font-semibold text-green-500">{formatted}</div>;
    },
  },
  {
    id: "Codigo",
    header: "Codigo",
    cell: ({ row }) => {
      return <div className="font-semibold ">{row.original.code}</div>;
    },
  },
];
