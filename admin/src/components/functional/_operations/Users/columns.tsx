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
import { type User } from "@clerk/nextjs/dist/types/server";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre completo",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-semibold">
            {`${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-semibold">
            {`${row.original.emailAddresses[0]?.emailAddress ?? ""}`}
          </span>
        </div>
      );
    },
  },
];
