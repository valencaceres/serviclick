import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";
import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";
import TextArea from "../../../ui/TextArea/TextArea";
import ChatMessage from "../../../ui/ChatMessage/ChatMessage";
import { useQueryCase } from "../../../../hooks/query";
import { useCase, useStage } from "~/store/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { ButtonIcon, Label } from "~/components/ui";

const CaseStatus = ({ setIsOpen, thisCase }: any) => {
  const router = useRouter();
  const { id, stage } = router.query;
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<boolean>(false);
  const { upsert, setCase, caseValue } = useCase();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
      status: {
        isClosed: caseValue?.status?.isClosed,
        description: caseValue?.status?.description,
        [id]: value,
      },
    });
  };
  const handleConfirm = () => {
    if (caseValue?.status?.isClosed === false) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    upsert({
      ...caseValue,
      status: {
        isClosed: status,
        description: caseValue?.status?.description,
      },
    });
    setIsOpen(false);
  };
  return (
    <ContentCell className="w-[600px]" gap="5px">
      <ContentCell gap="5px">
        <h1 className="select-none text-center text-2xl font-semibold text-secondary-500">
          Usted {thisCase?.status?.status ? "está cerrando" : "está abriendo"}{" "}
          el caso
        </h1>
        <Label>Ingrese un motivo</Label>
        <TextArea
          label="Motivo"
          height="100px"
          id="description"
          className={"w-full"}
          value={thisCase?.status?.description}
          onChange={handleChange}
        />
        <ContentRow className="justify-between" gap="5px">
          <Button
            onClick={() => setIsOpen(false)}
            text="Cancelar"
            iconName="close"
          />
          {thisCase?.status?.status === true ? (
            <Button onClick={handleConfirm} text="Confirmar" iconName="lock" />
          ) : (
            <Button
              onClick={handleConfirm}
              text="Confirmar"
              iconName="lock_open"
            />
          )}
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </ContentCell>
  );
};

export default CaseStatus;
