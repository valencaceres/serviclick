import { BanknoteIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/DropdownMenu";
import { type RouterOutputs, api } from "~/utils/api";
import { DropdownMenuTrigger } from "../../../ui/DropdownMenu";
import { useRouter } from "next/router";
import Link from "next/link";

export const ReimbursementComponent: React.FC = () => {
  return (
    <div>
      <ReimbursementTable />
    </div>
  );
};

const ReimbursementTable: React.FC = () => {
  const { data: reimbursements, isLoading } =
    api.reimbursement.getAll.useQuery();

  console.log(reimbursements);
  return (
    <table className="w-full max-w-7xl table-fixed overflow-x-auto rounded-md pl-12">
      <thead className="text-dusty-gray-700">
        <tr>
          <th className="p-2">Caso</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Cliente</th>
          <th className="p-2">Servicio</th>
          <th className="p-2">Disponible</th>
          <th className="p-2">Reembolso</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={8}>Cargando...</td>
          </tr>
        ) : reimbursements ? (
          reimbursements?.map((reimbursement) => (
            <ReimbursementRow key={reimbursement.id} {...reimbursement} />
          ))
        ) : (
          <tr className="bg-slate-100">
            <td colSpan={8} className="text-center">
              No hay reembolsos
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

type Reimbursement = RouterOutputs["reimbursement"]["getAll"][number];

const ReimbursementRow = ({
  id,
  status,
  casestageresult,
  casemodel,
}: Reimbursement) => {
  const router = useRouter();

  const ctx = api.useContext();
  const { mutate: updateStatus } = api.reimbursement.update.useMutation();

  const handleUpdate = (id: string, status: string) => {
    updateStatus(
      {
        id,
        status,
      },
      {
        onSuccess: () => {
          void ctx.reimbursement.getAll.invalidate();
        },
      }
    );
  };

  return (
    <tr className="border-y border-dusty-gray-100 text-lg font-light text-dusty-gray-900 odd:bg-slate-50 hover:border-dusty-gray-200 hover:bg-slate-100">
      <td className="p-2 text-center font-oswald">{casemodel.number}</td>
      <td className="p-2 text-center font-oswald">
        {casestageresult.created_at?.toLocaleDateString("es-CL")}
      </td>
      <td className="p-2 font-oswald">
        {casemodel?.applicant.name +
          " " +
          casemodel?.applicant.paternallastname}
      </td>
      <td className="truncate p-2 font-oswald">
        {casemodel?.assistance?.name}
      </td>
      <td className="p-2 text-center font-oswald">
        {casestageresult.currency === "U"
          ? (
              Number(String(casestageresult.available)) *
              Number(casestageresult.uf_value)
            ).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })
          : Number(String(casestageresult.available)).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
      </td>
      <td className="p-2 text-center font-oswald font-medium">
        {casestageresult.currency === "U"
          ? (
              Number(String(casestageresult.amount)) *
              Number(casestageresult.uf_value)
            ).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })
          : Number(String(casestageresult.amount)).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
      </td>
      <td
        className={`p-2 text-center font-oswald font-medium ${
          status === "Aprobado"
            ? "text-green-500"
            : status === "Pendiente"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {status}
      </td>
      <td className="flex justify-center gap-2 p-2 font-oswald">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <BanknoteIcon
              size={24}
              className="cursor-pointer text-teal-blue hover:text-teal-blue-100"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuLabel
              className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
              onClick={() => handleUpdate(id, "Aprobado")}
            >
              Aceptar reembolso
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 " />
            <DropdownMenuLabel
              className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
              onClick={() => handleUpdate(id, "Rechazado")}
            >
              Rechazar reembolso
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuLabel
              className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
              onClick={() => handleUpdate(id, "Pendiente")}
            >
              En espera
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href={`http://localhost:3010/case/${casemodel.id}/resolución`}
          target="_blank"
        >
          <SearchIcon
            size={24}
            className="cursor-pointer text-teal-blue hover:text-teal-blue-100"
          />
        </Link>
      </td>
    </tr>
  );
};
