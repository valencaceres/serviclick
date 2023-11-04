import { useRouter } from "next/router";
import { useEffect } from "react";
import { Row, type ColumnDef } from "@tanstack/react-table";
import { useCase } from "~/store/hooks";
import { DataTable } from "~/components/functional/Case/DataTable/DataTable";
import { DataTableColumnHeader } from "~/components/functional/Case/DataTable/DataTableColumnHeader";
import { ICaseItem } from "~/interfaces/case";
const CaseList = () => {
  const router = useRouter();

  const { getAll, caseList } = useCase();

  useEffect(() => {
    getAll("", "", "", "");
  }, [getAll]);
  if (!caseList) return null;
  const handleViewCase = ({ id, code }: ICaseItem) => {
    router.push(`/assistance/case/${code}/${id}`);
  };

  return (
    <DataTable
      columns={columns}
      data={caseList}
      onRowClick={handleViewCase}
      paginate
    />
  );
};

export default CaseList;

const filterFn = (row: Row<ICaseItem>, id: string, filterValue: string) => {
  const rowValue = row.getValue(id);
  const fullname = `${row.original.applicant_name} ${row.original.applicant_name}`;
  const contractorName = row.original.customer_name;

  return (
    String(rowValue).toLowerCase().includes(filterValue.toLowerCase()) ||
    fullname.toLowerCase().includes(filterValue.toLowerCase()) ||
    contractorName.toLowerCase().includes(filterValue.toLowerCase())
  );
};

const columns: ColumnDef<ICaseItem>[] = [
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
      const formattedDate = `${day}/${month}/${year} ${hoursAndMinutes}`;
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
          {row.original.customer_name
            ? row.original.customer_name.toLowerCase()
            : "Sin cliente asignado"}
        </div>
      );
    },
  },
  {
    accessorKey: "rut",
    header: "RUT",
    cell: ({ row }) => (
      <div className="max-w-[90px]  truncate  text-right font-oswald  font-light capitalize ">
        {row.original.applicant_rut}
      </div>
    ),
  },
  {
    accessorKey: "fullname",
    header: "Beneficiario",
    filterFn: filterFn,
    cell: ({ row }) => {
      const fullname = `${row.original.applicant_name?.toLowerCase()}`;
      return (
        <div className=" font-oswald font-light capitalize">{fullname}</div>
      );
    },
  },
  {
    accessorKey: "assistance",
    header: "Servicio",
    cell: ({ row }) => {
      const service = `${row.original.assistance_name}`;
      return (
        <div
          className={`  ${
            !!service
              ? "max-w-[140px] truncate  font-oswald font-light"
              : "font-light italic"
          }`}
        >
          <span
            className={`font-oswald ${!service ? "italic" : ""}`}
            title={service}
          >
            {!!service ? service : "Sin servicio asignado"}
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
        <span className="font-oswald" title={row.original.stage_name}>
          {row.original.stage_name}
        </span>
      </div>
    ),
  },
];
