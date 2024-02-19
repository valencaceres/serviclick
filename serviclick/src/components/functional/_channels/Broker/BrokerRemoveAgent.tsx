import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useBroker as useBrokerQuery } from "~/hooks/query";

import { Input } from "~/components/ui/Input";

import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/AlertDialog";
import { Label } from "~/components/ui/Label";

const RemoveAgent = ({ user, isOpen, setIsOpen }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useBrokerQuery().useRemoveAgent();
  const [confirmUserName, setConfirmUserNamee] = useState<string>("");
  const handleRemoveUser = () => {
    mutate(
      {
        brokerId: router.query.id,
        agentId: user?.user.data?.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["brokerAgents", router.query.id]);
          setIsOpen(false);
        },
      }
    );
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            ¿Estás absolutamente seguro/a?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            Esta acción no se puede deshacer. Esta eliminará la relacion del
            usuario con el broker permanentemente.
          </AlertDialogDescription>
          <div className="py-2">
            <Label htmlFor="field-name" className="text-red-500">
              Escribe {""}
              <span className="font-bold">{`"${
                user?.user?.data?.first_name ?? ""
              }"`}</span>{" "}
              para confirmar
            </Label>
            <Input
              id="field-name"
              placeholder="Nombre del alumno"
              value={confirmUserName}
              onChange={(e) => setConfirmUserNamee(e.target.value)}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={confirmUserName !== user?.user?.data?.first_name}
            onClick={() => handleRemoveUser()}
            className="bg-red-500 font-bold text-white hover:bg-red-600 focus:bg-red-500 active:bg-red-600"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveAgent;
