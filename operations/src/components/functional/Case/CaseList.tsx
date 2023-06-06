import { useRouter } from "next/router";

import { type ColumnDef } from "@tanstack/react-table";

import { useQueryCase } from "../../../hooks/query";
import { DataTable } from "~/components/functional/Case/DataTable/DataTable";
import { DataTableColumnHeader } from "~/components/functional/Case/DataTable/DataTableColumnHeader";

const CaseList = () => {
  const router = useRouter();

  const { data: cases } = useQueryCase().useGetAll();

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
    cell: ({ row }) => {
      return (<div className="capitalize">{row.original.contractor_name.toLowerCase()}</div>)
    }
  },
  {
    accessorKey: "rut",
    header: "RUT",
  },
  {
    accessorKey: "fullname",
    header: "Beneficiario",
    filterFn: (rows, id, filterValue) => {
      const rowValue = `${rows.original["name"]} ${rows.original["lastname"]}`;
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase())
        : true;
    },
    cell: ({ row }) => {
      const fullname = `${row.original.name?.toLowerCase()} ${row.original.lastname?.toLowerCase()}`;
      return <div className="font-medium capitalize">{fullname}</div>;
    },
  },
  {
    accessorKey: "assistance",
    header: "Servicio",
    cell: ({ row }) => {
      const service = `${row.getValue("assistance")}`;
      return (
        <div className={!!row.getValue("assistance") ? "" : "italic"}>
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
