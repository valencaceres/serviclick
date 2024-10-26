import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";
import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";
import TextArea from "../../../ui/TextArea/TextArea";
import ChatMessage from "../../../ui/ChatMessage/ChatMessage";
import { useStage, useCase } from "~/store/hooks";
import { useUser } from "@clerk/nextjs";
import { ButtonIcon } from "~/components/ui";

const CaseNotes = ({ thisCase }: any) => {
  const router = useRouter();
  const { id, stage } = router.query;

  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const { user } = useUser();

  const { getAll, stageList } = useStage();
  const stageObj = stageList.find((stageItem) => stageItem.code === stage);
  const { createChatMessage, isLoading, chatMessages, getChatByCase } = useCase();

  useEffect(() => {
    getAll();
    getChatByCase(id as string)
  }, [getAll, id, updateTrigger]);
  const handleCreate = () => {
    createChatMessage(
      {
        case_id: id as string,
        stage_id: stageObj ? stageObj.id : null,
        user_id: user?.id,
        message,
        type,
      }
    );
    setUpdateTrigger(prev => prev + 1);
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
            loading={isLoading}
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
      <ChatMessage messages={chatMessages} />
      <LoadingMessage />
    </ContentCell>
  );
};

export default CaseNotes;
