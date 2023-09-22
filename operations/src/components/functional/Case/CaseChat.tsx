import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../ui/Table";
import Icon from "../../ui/Icon";
import { LoadingMessage } from "../../ui/LoadingMessage";
import Button from "../../ui/Button";
import ComboBox from "../../ui/ComboBox";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import ChatMessage from "../../ui/ChatMessage/ChatMessage";
import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

const CaseNotes = ({ thisCase }: any) => {
  const router = useRouter();
  const { case_id, stage } = router.query;
  const queryClient = useQueryClient();

  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useUser();

  const { data: messages } = useQueryCase().useGetChatByCase(case_id as string);
  const { mutate: createMessage } = useQueryCase().useCreateChatMessage();
  const thisCaseStage = thisCase?.stages.find(
    (s: any) => s.stage.toLowerCase() === stage
  );
  const handleCreate = () => {
    createMessage(
      {
        case_id: case_id as string,
        casestage_id: thisCaseStage?.id,
        user_id: user?.id,
        message,
        type,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["caseMessages", case_id as string]);
          setMessage("");
        },
      }
    );
  };

  return (
    <ContentCell className="w-[600px]" gap="5px">
      <ContentCell gap="5px">
        <ContentRow className="justify-between" gap="5px">
          <ComboBox
            label="Enviar como"
            data={[{ label: "Cliente" }, { label: "Operador" }]}
            dataText="label"
            dataValue="label"
            value={type}
            placeHolder="Seleccione una opción"
            onChange={(e: any) => setType(e.target.value)}
            width="400px"
          />
          <Button
            text="Enviar"
            iconName="send"
            enabled={type !== "" && message !== "" ? true : false}
            onClick={handleCreate}
          />
        </ContentRow>
        <ContentRow gap="5px">
          <TextArea
            label="Mensaje"
            height="100px"
            className={"w-full"}
            value={message}
            disabled={type === "" ? true : false}
            onChange={(e: any) => setMessage(e.target.value)}
          />
        </ContentRow>
      </ContentCell>
      <ChatMessage messages={messages} />
      <LoadingMessage />
    </ContentCell>
  );
};

export default CaseNotes;
