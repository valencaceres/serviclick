import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { type Lead } from "~/interfaces/payment";
import { usePayment } from "~/store/hooks";
import { InputText } from "~/components/ui";
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
    header: "Codigo",
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original;

      return <Actions lead={lead} />;
    },
  },
];

function Actions({ lead }: { lead: Lead }) {
  const { codeValue, setListValue } = usePayment();
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const leadId = lead.lead_id;
    setListValue({
      retail_id: codeValue.retail_id,
      codes: codeValue.codes.map((item) =>
        item.lead_id === leadId ? { ...item, code: value } : item
      ),
    });
  };

  return (
    <div className=" w-2/6">
      <InputText
        value={
          codeValue.codes.find((item) => item.lead_id === lead.lead_id)?.code ??
          ""
        }
        onChange={handleChangeCode}
        type="number"
      />
    </div>
  );
}
