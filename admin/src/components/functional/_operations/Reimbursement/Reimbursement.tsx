import { BanknoteIcon, ExternalLinkIcon, SearchIcon } from "lucide-react";
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
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

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
          <th className="p-2">Tipo</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={9} className="w-full bg-slate-50 p-2 text-center">
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
  const [imedReimbursement, setImedReimbursement] = useState<string>();
  const [reimbursement, setReimbursement] = useState<string>();

  const { user } = useUser();

  const ctx = api.useContext();
  const { mutateAsync: updateStatus, isLoading } =
    api.reimbursement.update.useMutation();

  const { data: caseStage } = api.caseStage.get.useQuery(
    {
      case_id: casemodel?.id,
      stage: "Registro de servicio",
    },
    {
      enabled: !!isSummaryOpen,
    }
  );

  const { data: resolutionStage } = api.caseStage.get.useQuery({
    case_id: casemodel?.id,
    stage: "Resolución",
  });

  const handleUpdate = async (id: string, status: string) => {
    setUpdatingRow(true);
    await updateStatus(
      {
        id,
        status,
        user_id: user?.id || "",
        imed_amount:
          status === "Aprobado" ? Number(imedReimbursement || "") : null,
        amount: status === "Aprobado" ? Number(reimbursement || "") : null,
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

  const applicant =
    casemodel?.type === "I" ? casemodel?.insured : casemodel?.beneficiary;

  const availableValueFormatted =
    casestageresult.currency === "U"
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
        });

  const reimbursementValueFormatted =
    casestageresult.currency === "U"
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
        });

  return (
    <tr className="border-y border-dusty-gray-100 text-lg font-light text-dusty-gray-900 odd:bg-slate-50 hover:border-dusty-gray-200 hover:bg-slate-100">
      <td className="p-2 text-center font-oswald">{casemodel.number}</td>
      <td className="p-2 text-center font-oswald">
        {casestageresult.created_at?.toLocaleDateString("es-CL")}
      </td>
      <td className="truncate p-2 font-oswald">
        {`${applicant?.name || ""}  ${applicant?.paternallastname || ""}`}
      </td>
      <td className="truncate p-2 font-oswald">
        {casemodel?.assistance?.name}
      </td>
      <td className="p-2 text-center font-oswald">{availableValueFormatted}</td>
      <td className="p-2 text-center font-oswald font-medium">
        {reimbursementValueFormatted}
      </td>
      <td className="p-2 text-center font-oswald font-medium">
        {resolutionStage?.description === "Reembolsar IMED" ? "IMED" : "Normal"}
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
                isLoading={isLoading}
                comment={comment}
                setComment={setComment}
                type={resolutionStage?.description}
                reimbursement={reimbursement}
                setReimbursement={setReimbursement}
                imedReimbursement={imedReimbursement}
                setImedReimbursement={setImedReimbursement}
                availableValue={availableValueFormatted}
                reimbursementValue={reimbursementValueFormatted}
              />
              <DropdownMenuSeparator className="bg-slate-100" />
              <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <DropdownMenuLabel
                  className="z-20 cursor-pointer select-none text-teal-blue-100 hover:bg-slate-50 active:bg-slate-100"
                  onClick={() => setAction("Pendiente")}
                >
                  Pendiente
                </DropdownMenuLabel>
              </DialogTrigger>
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
          <DialogContent className="bg-white">
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
                    value="insured"
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
                            {`${applicant?.name || ""}  ${
                              applicant?.paternallastname || ""
                            }`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Rut:
                          </span>
                          <span className="text-lg">
                            {applicant?.rut || ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Teléfono:
                          </span>
                          <span className="text-lg">
                            {applicant?.phone || ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-teal-blue">
                            Correo:
                          </span>
                          <span className="text-lg">
                            {applicant?.email || ""}
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
                        <Attachments caseId={casemodel.id} />
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

const Attachments = ({ caseId }: { caseId: string }) => {
  const { data, isLoading } = api.caseStageAttach.get.useQuery({
    case_id: caseId,
  });

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <SyncLoader size={4} color={"#03495C"} loading={true} />
          <h2 className="text-lg font-semibold text-teal-blue">Cargando...</h2>
        </div>
      ) : data?.length ? (
        data?.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between gap-2">
            <Link href={file.viewLink || ""} target="_blank">
              <div className="flex items-center gap-2 text-teal-blue hover:text-teal-blue-100 hover:underline">
                <PaperclipIcon size={16} />
                <span className="text-lg">{file.document?.name}</span>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg">No hay archivos adjuntos</p>
        </div>
      )}
    </div>
  );
};

const CustomDialog = ({
  action,
  onClick,
  isLoading,
  comment,
  setComment,
  type,
  reimbursement,
  setReimbursement,
  imedReimbursement,
  setImedReimbursement,
  availableValue,
  reimbursementValue,
}: {
  action: string;
  onClick?: () => void;
  isLoading?: boolean;
  comment: string;
  setComment: (value: string) => void;
  type: string | null | undefined;
  reimbursement: string | undefined;
  setReimbursement: (value: string) => void;
  imedReimbursement: string | undefined;
  setImedReimbursement: (value: string) => void;
  availableValue: string;
  reimbursementValue: string;
}) => {
  return (
    <>
      {action !== "Pendiente" ? (
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {action === "Aprobado" ? "Aceptar" : "Rechazar"} el rembolso
            </DialogTitle>
            <div className="flex flex-col gap-2 rounded-md border p-2">
              <h2 className="font-semibold text-teal-blue">
                Disponible: <span className="font-bold">{availableValue}</span>
              </h2>
              <h2 className="font-semibold text-teal-blue">
                Reembolso solicitado:{" "}
                <span className="font-bold">{reimbursementValue}</span>
              </h2>
            </div>
            <div className="flex gap-2">
              {type === "Reembolsar IMED" && action === "Aprobado" && (
                <div>
                  <Label className="text-dusty-gray-500">Reembolso IMED</Label>
                  <Input
                    type="text"
                    value={imedReimbursement}
                    onChange={(e) => setImedReimbursement(e.target.value)}
                    placeholder="Ingrese el monto"
                  />
                </div>
              )}
              {action === "Aprobado" && (
                <div>
                  <Label className="text-dusty-gray-500">
                    Reembolso ServiClick
                  </Label>
                  <Input
                    type="text"
                    value={reimbursement}
                    onChange={(e) => setReimbursement(e.target.value)}
                    placeholder="Ingrese el monto"
                  />
                </div>
              )}
            </div>
            <DialogDescription>
              <p className="py-2">
                Ingresa un comentario sobre el reembolso para el operador.
              </p>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ingresa un comentario"
              />
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
      ) : (
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Al aceptar cambiarás el estado a pendiente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onClick}
              className={"bg-green-600 hover:bg-green-700"}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Aceptar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </>
  );
};
