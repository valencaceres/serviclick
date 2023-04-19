import { BanknoteIcon, DownloadCloudIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

import { type RouterOutputs, api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/Accordion";
import { PaperclipIcon } from "lucide-react";

export const Reimbursement: React.FC = () => {
  return <ReimbursementTable />;
};

const ReimbursementTable: React.FC = () => {
  const { data: reimbursements, isLoading } =
    api.reimbursement.getAll.useQuery();

  return (
    <table className="w-full max-w-7xl table-fixed overflow-x-auto border pl-12">
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
            <td colSpan={8} className="w-full bg-slate-50 p-2 text-center">
              Cargando...
            </td>
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
  const [action, setAction] = useState<string>("Pendiente");
  const [comment, setComment] = useState<string>("");
  const [updatingRow, setUpdatingRow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);

  const ctx = api.useContext();
  const {
    mutateAsync: updateStatus,
    isLoading,
    isError,
    error,
  } = api.reimbursement.update.useMutation();

  const { data: caseStage } = api.caseStage.get.useQuery(
    {
      case_id: casemodel?.id,
      stage: "Registro de servicio",
    },
    {
      enabled: !!isSummaryOpen,
    }
  );

  const handleUpdate = async (id: string, status: string) => {
    setUpdatingRow(true);
    await updateStatus(
      {
        id,
        status,
        comment: status === "Pendiente" ? "" : comment,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setComment("");
          void ctx.reimbursement.getAll.invalidate().then(() => {
            setUpdatingRow(false);
          });
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
      <td className="truncate p-2 font-oswald">
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
            : status === "Rechazado"
            ? "text-red-500"
            : status === "Pendiente"
            ? "text-yellow-500"
            : ""
        }`}
      >
        {updatingRow ? (
          <div className="flex items-center gap-2">
            <SyncLoader size={4} color={"#3b82f6"} loading={true} />
            <span className="font-oswald font-medium text-blue-500">
              Actualizando
            </span>
          </div>
        ) : (
          status
        )}
      </td>
      <td className="flex justify-center gap-2 p-2 font-oswald">
        <Dialog open={isOpen} defaultOpen={false} onOpenChange={setIsOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BanknoteIcon
                size={24}
                className="cursor-pointer text-teal-blue hover:text-teal-blue-100"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <DropdownMenuLabel
                  className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
                  onClick={() => setAction("Aprobado")}
                >
                  Aceptar
                </DropdownMenuLabel>
              </DialogTrigger>
              <DropdownMenuSeparator className="bg-slate-100 " />
              <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <DropdownMenuLabel
                  className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
                  onClick={() => setAction("Rechazado")}
                >
                  Rechazar
                </DropdownMenuLabel>
              </DialogTrigger>
              <CustomDialog
                action={action}
                onClick={() => void handleUpdate(id, action)}
                error={error?.message}
                isError={isError}
                isLoading={isLoading}
                comment={comment}
                setComment={setComment}
              />
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuLabel
                className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
                onClick={() => void handleUpdate(id, "Pendiente")}
              >
                Pendiente
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
        <Dialog
          open={isSummaryOpen}
          defaultOpen={false}
          onOpenChange={setIsSummaryOpen}
        >
          <DialogTrigger onClick={() => setIsSummaryOpen(true)} asChild>
            <SearchIcon
              size={24}
              className="cursor-pointer text-teal-blue hover:text-teal-blue-100"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-dusty-gray-800">
                Resumen del caso
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-4 text-lg text-dusty-gray-800">
                <Accordion
                  type="single"
                  collapsible
                  className="flex flex-col gap-2"
                >
                  <AccordionItem
                    value="applicant"
                    className="rounded-md border border-dusty-gray-100 p-2 shadow-sm hover:border-teal-blue-100"
                  >
                    <AccordionTrigger className="px-2 text-teal-blue-100">
                      Cliente
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Nombre:
                          </span>
                          <span className="text-lg">
                            {casemodel?.applicant.name +
                              " " +
                              casemodel?.applicant.paternallastname}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Rut:
                          </span>
                          <span className="text-lg">
                            {casemodel?.applicant.rut}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Teléfono:
                          </span>
                          <span className="text-lg">
                            {casemodel?.applicant.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Correo:
                          </span>
                          <span className="text-lg">
                            {casemodel?.applicant.email}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="case"
                    className="rounded-md border border-dusty-gray-100 p-2 shadow-sm hover:border-teal-blue-100"
                  >
                    <AccordionTrigger className="px-2 text-teal-blue-100">
                      Caso
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Fecha de creación:
                          </span>
                          <span className="text-lg">
                            {casemodel?.createddate.toLocaleString("es-CL", {
                              timeZone: "America/Santiago",
                              dateStyle: "full",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Estado:
                          </span>
                          <span className="text-lg">
                            {casemodel?.isactive ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-blue">
                              Producto:
                            </span>
                            <span className="text-lg">
                              {casemodel?.product?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-blue">
                              Servicio:
                            </span>
                            <span className="text-lg">
                              {casemodel?.assistance?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-blue">
                              Descripción:
                            </span>
                            <span className="text-lg">
                              {caseStage?.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="files"
                    className="rounded-md border border-dusty-gray-100 p-2 shadow-sm hover:border-teal-blue-100"
                  >
                    <AccordionTrigger className="px-2 text-teal-blue-100">
                      Archivos
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          {[
                            {
                              name: "Adjunto 1",
                            },
                            {
                              name: "Adjunto 2",
                            },
                          ]?.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <PaperclipIcon size={16} />
                                <span className="text-lg">{file.name}</span>
                              </div>
                              <DownloadCloudIcon
                                size={24}
                                className="cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

const CustomDialog = ({
  action,
  onClick,
  error,
  isError,
  isLoading,
  comment,
  setComment,
}: {
  action: string;
  onClick?: () => void;
  error?: string;
  isError?: boolean;
  isLoading?: boolean;
  comment: string;
  setComment: (value: string) => void;
}) => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "Aprobado" ? "Aceptar" : "Rechazar"} el reembolso
          </DialogTitle>
          <DialogDescription>
            <p className="py-2">
              Ingresa un comentario sobre el reembolso para el operador.
            </p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ingresa un comentario"
            />
            {isError && <p>{error}</p>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onClick}
            className={`${
              action === "Aprobado"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Aceptar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
