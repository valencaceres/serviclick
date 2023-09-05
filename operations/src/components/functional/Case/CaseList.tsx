import { useRouter } from "next/router";

import { Row, type ColumnDef } from "@tanstack/react-table";

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
  createddate: string;
  number: string;
  rut: string;
  name: string;
  lastname: string;
  product: string;
  assistance: string;
  stage: string;
};

const filterFn = (row: Row<Case>, id: string, filterValue: string) => {
  const rowValue = row.getValue(id);
  const fullname = `${row.original.name} ${row.original.lastname}`;
  const contractorName = row.original.contractor_name;

  return (
    String(rowValue).toLowerCase().includes(filterValue.toLowerCase()) ||
    fullname.toLowerCase().includes(filterValue.toLowerCase()) ||
    contractorName.toLowerCase().includes(filterValue.toLowerCase())
  );
};

const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="max-w-[30px] "
        title="N° Caso"
      />
    ),
    cell: ({ row }) => (
      <div className={`font-oswald font-light `}>{row.original.number}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha y Hora",
    cell: ({ row }) => {
      const originalDate = new Date(row.original.createddate);
      const day = originalDate.getDate().toString().padStart(2, "0");
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const year = originalDate.getFullYear();
      const hoursAndMinutes = originalDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = `${month}/${day}/${year} ${hoursAndMinutes}`;
      return (
        <div className="max-w-[140px] truncate font-oswald  font-light ">
          {" "}
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "contractor_name",
    header: "Cliente",
    filterFn: filterFn,
    cell: ({ row }) => {
      return (
        <div className="max-w-[140px] truncate  font-oswald  font-light capitalize ">
          {row.original.contractor_name?.toLowerCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "rut",
    header: "RUT",
    cell: ({ row }) => (
      <div className="max-w-[90px]  truncate  text-right font-oswald  font-light capitalize ">
        {row.original.rut}
      </div>
    ),
  },
  {
    accessorKey: "fullname",
    header: "Beneficiario",
    filterFn: filterFn,
    cell: ({ row }) => {
      const fullname = `${row.original.name?.toLowerCase()} ${row.original.lastname?.toLowerCase()}`;
      return (
        <div className=" font-oswald font-light capitalize">{fullname}</div>
      );
    },
  },
  {
    accessorKey: "assistance",
    header: "Servicio",
    cell: ({ row }) => {
      const service = `${row.getValue("assistance")}`;
      return (
        <div
          className={`  ${
            !!row.getValue("assistance")
              ? "max-w-[140px] truncate  font-oswald font-light"
              : "font-light italic"
          }`}
        >
          <span
            className={`font-oswald ${
              !row.getValue("assistance") ? "italic" : ""
            }`}
            title={service}
          >
            {!!row.getValue("assistance") ? service : "Sin servicio asignado"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[140px] truncate  font-light ">
        <span className="font-oswald" title={row.original.stage}>
          {row.original.stage}
        </span>
      </div>
    ),
  },
];
