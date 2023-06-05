import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable.tsx/DataTable";
import { useRouter } from "next/router";

const ProductList = ({ products }: any) => {
  const router = useRouter();

  if (!products) return null;

  const handleViewProduct = ({ id }: Product) => {
    router.push(`product/${id}`);
  };

  return (
    <DataTable
      columns={columns}
      data={products}
      onRowClick={handleViewProduct}
    />
  );
};

export default ProductList;

interface Assistance {
  id: string;
  name: string;
  amount: string;
  maximum: string;
  events: number;
  lack: number;
  currency: string;
}

type Frequency = "M" | "A" | "S";

interface Product {
  id: string;
  family_id: string;
  family_name: string;
  name: string;
  cost: number;
  isSubject: boolean;
  frequency: Frequency;
  term: string;
  beneficiaries: number;
  currency: string;
  dueDay: number;
  alias: string;
  minInsuredCompanyPrice: number;
  title: string;
  subTitle?: string;
  description: string;
  territorialScope: string;
  hiringConditions: string;
  assistances: Assistance[];
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "family_name",
    header: "Familia",
  },
  {
    accessorKey: "alias",
    header: "Alianza",
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="font-semibold">{row.original.name}</div>,
  },
  {
    accessorKey: "isSubject",
    header: "Afecto",
    cell: ({ row }) => <div>{row.original.isSubject ? "Sí" : "No"}</div>,
  },
];
