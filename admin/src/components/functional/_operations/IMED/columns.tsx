"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/Badge";
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
import { useEffect, useState } from "react";
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
import { useReimbursment } from "~/store/hooks";

interface DataItem {
  amount: null | number;
  assistance: string;
  case_type: string;
  available: number;
  date: string;
  imed_amount: null | number;
  name: string;
  number: number;
  product: string;
  required_amount: null | number;
  required_imed: null | number;
  rut: string;
  status: string;
  id: string;
  phone: string;
  email: string;
  limit: string;
  is_active: boolean;
  case_id: string;
  casestage_description: string;
}

export const columns: ColumnDef<DataItem>[] = [
  {
    header: "Caso",
    cell: ({ row }) => {
      const number = row.original.number;

      return <span className="font-semibold">{number}</span>;
    },
  },
  {
    accessorKey: "applicationdate",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      return `${day}/${month}/${year}`;
    },
  },
  {
    header: "Cliente",
    cell: ({ row }) => {
      const applicant = row.original.name;
      return <span className="font-semibold">{applicant}</span>;
    },
  },
  {
    header: "Servicio",
    cell: ({ row }) => {
      const applicant = row.original.assistance;

      return <span className="font-semibold">{applicant}</span>;
    },
  },
  {
    accessorKey: "casemodel.available",
    header: "Disponible",
    cell: ({ row }) => {
      const available = row.original.available;
      return available
        ? Number(available).toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })
        : "0";
    },
  },
  {
    accessorKey: "casemodel.amount",
    header: "Reembolsado",
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
    accessorKey: "register_imedamount",
    header: "Descuento IMED solicitado",
    cell: ({ row }) => {
      const amount = row.original.required_imed;
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
    accessorKey: "imed_amount",
    header: "Descuento IMED",
    cell: ({ row }) => {
      const amount = row.original.imed_amount;
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

const Actions = ({ status, row }: { status: string; row: Row<DataItem> }) => {
  const [action, setAction] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imedAmount, setImedAmount] = useState<string>("");
  const [reimbursement, setReimbursement] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);

  const { user } = useUser();

  const { updateReimbursment, isLoading, getAll } = useReimbursment();

  const handleUpdate = (id: string, status: string) => {
    updateReimbursment(
      row.original.id,
      {
        status,
        user_id: user?.id || "",
        imed_amount: Number(imedAmount || ""),
        amount: Number(reimbursement || ""),
        comment: comment || "",
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setReimbursement("");
          setComment("");
          getAll(true, "", "", 10, 1);
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
                {Number(row.original.available).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </span>
            </h2>
            <h2 className="font-semibold text-teal-blue">
              Descuento IMED solicitado:{" "}
              <span className="font-bold">
                {Number(row.original.required_imed).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </span>
            </h2>
            <h2 className="font-semibold text-teal-blue">
              Reembolso solicitado:{" "}
              <span className="font-bold">
                {Number(row.original.required_amount).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </span>
            </h2>
            <h2 className="font-semibold text-teal-blue">
              Límite: <span className="font-bold">{row.original.limit}</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {action === "Aprobado" && (
              <>
                <div className="w-full">
                  <Label className="text-dusty-gray-500">Descuento IMED</Label>
                  <Input
                    type="text"
                    value={imedAmount}
                    onChange={(e) => setImedAmount(e.target.value)}
                    placeholder="Ingrese el monto"
                  />
                </div>
                <div className="w-full">
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
              </>
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
  row: Row<DataItem>;
}) {
  const applicant = row?.original?.name;

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
                      <span className="text-lg">{`${applicant || ""}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">Rut:</span>
                      <span className="text-lg">{row.original.rut || ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">
                        Teléfono:
                      </span>
                      <span className="text-lg">
                        {row?.original?.phone || ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">
                        Correo:
                      </span>
                      <span className="text-lg">
                        {row?.original?.email || ""}
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
                      <span className="text-lg">{row.original?.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-blue">
                        Estado:
                      </span>
                      <span className="text-lg">
                        {row.original.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-blue">
                          Producto:
                        </span>
                        <span className="text-lg">{row.original.product}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-blue">
                          Servicio:
                        </span>
                        <span className="text-lg">
                          {row.original.assistance}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-blue">
                          Descripción:
                        </span>
                        <span className="text-lg">
                          {row.original.casestage_description}
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
                    <Attachments caseId={row.original.case_id} />
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
  const { getAttachByCase, documents, isLoading } = useReimbursment();
  useEffect(() => {
    getAttachByCase(caseId);
  }, [caseId]);

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-teal-blue" />
          <h2 className="text-lg font-semibold text-teal-blue">Cargando...</h2>
        </div>
      ) : documents?.length ? (
        documents?.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between gap-2">
            <Link href={file.viewLink || ""} target="_blank">
              <div className="flex items-center gap-2 text-teal-blue hover:text-teal-blue-100 hover:underline">
                <Paperclip size={16} />
                <span className="text-lg">{file.file_tag}</span>
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
