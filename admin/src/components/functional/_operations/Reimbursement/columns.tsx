"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/Badge";
import { api, type RouterOutputs } from "~/utils/api";
import { cn } from "~/utils/cn";
import { Loader2, MoreHorizontal, Paperclip } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Button } from "~/components/ui/Button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { useUser } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/Accordion";
import Link from "next/link";

type CaseReimbursement =
  RouterOutputs["reimbursement"]["getAll"]["reimbursement"][0];
export const columns: ColumnDef<CaseReimbursement>[] = [
  {
    accessorKey: "casemodel.number",
    header: "Caso",
  },
  {
    accessorKey: "applicationdate",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.original.application_date as Date);
      return date.toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    header: "Cliente",
    cell: ({ row }) => {
      const applicant =
        row.original.casemodel?.type === "I"
          ? row.original.casemodel?.insured
          : row.original.casemodel?.beneficiary;

      return (
        <span className="font-semibold">
          {applicant?.name} {applicant?.paternallastname}
        </span>
      );
    },
  },
  {
    accessorKey: "casemodel.assistance.name",
    header: "Servicio",
  },
  {
    accessorKey: "casemodel.available",
    header: "Disponible",
    cell: ({ row }) => {
      const available =
        row.original.casemodel.assistance?.productassistances[0]?.amount;
      return available
        ? Number(available).toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })
        : "0";
    },
  },
  {
    accessorKey: "cademodel.amount",
    header: "Reembolso",
    cell: ({ row }) => {
      const amount = row.original.amount;
      return amount ? (
        <span className="font-semibold">
          {Number(amount).toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </span>
      ) : (
        "0"
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={cn(
            status === "Pendiente" && "bg-yellow-100 text-yellow-800",
            status === "Aprobado" && "bg-green-100 text-green-800",
            status === "Rechazado" && "bg-red-100 text-red-800"
          )}
        >
          {status === "Pendiente"
            ? "Pendiente"
            : status === "Aprobado"
            ? "Aprobado"
            : "Rechazado"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Actions status={row.original.status} row={row} />;
    },
  },
];

const Actions = ({
  status,
  row,
}: {
  status: string;
  row: Row<CaseReimbursement>;
}) => {
  const [action, setAction] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reimbursement, setReimbursement] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);

  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate: updateStatus, isLoading } =
    api.reimbursement.update.useMutation();

  const handleUpdate = (id: string, status: string) => {
    updateStatus(
      {
        id: row.original.id,
        status: status,
        user_id: user?.id || "",
        imed_amount: null,
        amount: Number(reimbursement || ""),
        comment: comment || "",
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setReimbursement("");
          setComment("");
          void ctx.reimbursement.getAll.invalidate();
        },
      }
    );
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsSummaryOpen(true)}>
            Ver detalles
          </DropdownMenuItem>
          {status !== "Aprobado" && status !== "Rechazado" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                  setAction("Aprobado");
                }}
              >
                Aprobar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                  setAction("Rechazado");
                }}
              >
                Rechazar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpen} defaultOpen={false} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "Aprobado" ? "Aprobar" : "Rechazar"} reembolso
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 rounded-md border p-2">
            <h2 className="font-semibold text-teal-blue">
              Disponible:{" "}
              <span className="font-bold">
                {Number(
                  row.original.casemodel.assistance?.productassistances[0]
                    ?.amount
                ).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </span>
            </h2>
            <h2 className="font-semibold text-teal-blue">
              Reembolso solicitado:{" "}
              <span className="font-bold">
                {Number(row.original.register_amount).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </span>
            </h2>
            <h2 className="font-semibold text-teal-blue">
              Límite:{" "}
              <span className="font-bold">
                {
                  row.original.casemodel.assistance?.productassistances[0]
                    ?.maximum
                }
              </span>
            </h2>
          </div>
          <div className="flex gap-2">
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
            <Label className="text-dusty-gray-500">
              Ingresa un comentario sobre el reembolso para el operador.
            </Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ingresa un comentario"
            />
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} variant={"outline"}>
              Cancelar
            </Button>
            <Button
              onClick={() => handleUpdate(row.original.id, action)}
              className={`${
                action === "Aprobado"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Actualizando...
                </span>
              ) : (
                `${action === "Aprobado" ? "Aprobar" : "Rechazar"}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Summary
        isSummaryOpen={isSummaryOpen}
        setIsSummaryOpen={setIsSummaryOpen}
        row={row}
      />
    </>
  );
};

function Summary({
  isSummaryOpen,
  setIsSummaryOpen,
  row,
}: {
  isSummaryOpen: boolean;
  setIsSummaryOpen: (value: boolean) => void;
  row: Row<CaseReimbursement>;
}) {
  const { data: caseStage } = api.caseStage.get.useQuery(
    {
      case_id: row.original.casemodel?.id,
      stage: "Registro de servicio",
    },
    {
      enabled: !!isSummaryOpen,
    }
  );

  const applicant =
    row.original.casemodel?.type === "I"
      ? row.original.casemodel?.insured
      : row.original.casemodel?.beneficiary;

  return (
    <Dialog
      open={isSummaryOpen}
      defaultOpen={false}
      onOpenChange={setIsSummaryOpen}
    >
      <DialogTrigger
        onClick={() => setIsSummaryOpen(true)}
        asChild
      ></DialogTrigger>
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
                      <span className="font-semibold text-teal-blue">Rut:</span>
                      <span className="text-lg">{applicant?.rut || ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">
                        Teléfono:
                      </span>
                      <span className="text-lg">{applicant?.phone || ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">
                        Correo:
                      </span>
                      <span className="text-lg">{applicant?.email || ""}</span>
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
                        {row.original.casemodel?.createddate.toLocaleString(
                          "es-CL",
                          {
                            timeZone: "America/Santiago",
                            dateStyle: "full",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">
                        Estado:
                      </span>
                      <span className="text-lg">
                        {row.original.casemodel?.isactive
                          ? "Activo"
                          : "Inactivo"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-blue">
                          Producto:
                        </span>
                        <span className="text-lg">
                          {row.original.casemodel?.product?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-blue">
                          Servicio:
                        </span>
                        <span className="text-lg">
                          {row.original.casemodel?.assistance?.name}
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
                    <Attachments caseId={row.original.casemodel.id} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const Attachments = ({ caseId }: { caseId: string }) => {
  const { data, isLoading } = api.caseStageAttach.get.useQuery({
    case_id: caseId,
  });

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-teal-blue" />
          <h2 className="text-lg font-semibold text-teal-blue">Cargando...</h2>
        </div>
      ) : data?.length ? (
        data?.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between gap-2">
            <Link href={file.viewLink || ""} target="_blank">
              <div className="flex items-center gap-2 text-teal-blue hover:text-teal-blue-100 hover:underline">
                <Paperclip size={16} />
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
