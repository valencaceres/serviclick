import { useRouter } from "next/router";

import { type ColumnDef } from "@tanstack/react-table";

import {
  useQueryCompany,
  useQueryCase,
  useQueryStage,
} from "../../../hooks/query";
import { DataTable } from "~/components/ui/DataTable/DataTable";
import { DataTableColumnHeader } from "~/components/ui/DataTable/DataTableColumnHeader";

const CaseList = () => {
  const router = useRouter();

  const { data: cases } = useQueryCase().useGetAll();
  const { data: companies } = useQueryCompany().useGetAll();
  const { data: stages } = useQueryStage().useGetAll();

  if (!cases) return null;

  const handleViewCase = ({ case_id, stage }: Case) => {
    router.push(`/case/${case_id}/${stage.toLowerCase()}`);
  };

  return (
    <DataTable
      columns={columns}
      data={cases}
      onRowClick={handleViewCase}
      paginate
    />
  );
};

export default CaseList;

type Case = {
  case_id: string;
  contractor_name: string;
  number: string;
  rut: string;
  name: string;
  lastname: string;
  product: string;
  assistance: string;
  stage: string;
};

const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N° Caso" />
    ),
  },
  {
    accessorKey: "contractor_name",
    header: "Cliente",
  },
  {
    accessorKey: "rut",
    header: "RUT",
  },
  {
    accessorKey: "fullname",
    header: "Beneficiario",
    cell: ({ row }) => {
      const name = `${row.original.name} ${row.original.lastname}`;
      return (
        <div className="font-medium">
          {name}
        </div>
      )
    },
  },
  {
    accessorKey: "product",
    header: "Producto",
    cell: ({ row }) => {
      const prod = `${row.getValue("product")}`;
      return (
        <div>
          {!!row.getValue("product") ? prod : "Sin producto asignado"}
        </div>
      );
    },
  },
  {
    accessorKey: "assistance",
    header: "Servicio",
    cell: ({ row }) => {
      const service = `${row.getValue("assistance")}`;
      return (
        <div>
          {!!row.getValue("assistance") ? service : "Sin servicio asignado"}
        </div>
      );
    },
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
  },
];
