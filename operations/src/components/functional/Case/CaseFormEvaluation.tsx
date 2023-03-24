import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import CaseDocumentsTable from "./CaseDocumentsTable";

import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { useUser } from "../../../hooks";
import TextArea from "../../ui/TextArea/TextArea";
import ComboBox from "../../ui/ComboBox";

const decisions = [
  {
    id: 1,
    name: "Designación de convenio",
  },
  {
    id: 2,
    name: "Designación de especialista",
  },
  {
    id: 3,
    name: "Rechazar caso",
  },
];

const CaseFormRecordReception = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [files, setFiles] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);
  const [thisStage, setThisStage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [justification, setJustification] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");

  const { id: user_id } = useUser().user;
  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("case_id", thisCase?.case_id);
    formData.append("casestage_id", thisStage);
    documents.forEach((d: any, idx: number) => {
      formData.append(`document_id[${idx}]`, d);
    });
    files.forEach((item: any, idx: number) => {
      formData.append("files", item);
    });
    uploadDocuments(formData, {
      onSuccess: () => {
        updateCase(
          {
            applicant: {
              id: thisCase?.applicant_id,
            },
            number: thisCase?.case_number,
            product_id: thisCase?.product_id,
            assistance_id: thisCase?.assistance_id,
            stage_id:
              stages?.find((s: any) => s.name === "Recepción de antecedentes")
                ?.id || "",
            user_id: user_id,
          },
          {
            onSuccess: () => {
              router.push(
                `/case/${thisCase?.case_id}/recepción de antecedentes`
              );
              queryClient.invalidateQueries(["case", thisCase?.case_id]);
            },
          }
        );
      },
    });
  };

  useEffect(() => {
    if (stages) {
      setThisStage(stages.find((s: any) => s.name.toLowerCase() === stage)?.id);
    }
  }, [stages, stage]);

  useEffect(() => {
    if (thisCase) {
      setDescription(
        thisCase?.stages.find((s: any) => s.stage === "Registro de servicio")
          ?.description
      );
    }
  }, [router]);

  return (
    <form
      action=""
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit}
    >
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          <InputText
            label="Cliente"
            value={"Embotelladora Andina S.A."}
            type="text"
            disabled={true}
            width="525px"
          />
          <InputText
            label="Asegurado"
            value={
              thisCase?.applicant_name + " " + thisCase?.applicant_lastname
            }
            type="text"
            disabled={true}
            width="525px"
          />
          <InputText
            label="Servicio"
            value={thisCase?.assistance}
            type="text"
            disabled={true}
            width="525px"
          />
        </ContentCell>
        <ContentCell gap="20px">
          <TextArea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            label="Descripción del evento"
            width="525px"
            disabled={true}
            height="110px"
          />
          <TextArea
            value={justification}
            onChange={(e: any) => setJustification(e.target.value)}
            label="Justificación de la decisión"
            width="525px"
            disabled={true}
            height="110px"
          />
          <ComboBox
            label="Decisión de evaluación"
            data={decisions}
            width="525px"
            value={""}
            onChange={(e: any) => console.log(e)}
            dataText="name"
            dataValue="id"
          />
        </ContentCell>
        <Button text="Continuar" type="submit" />
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
    </form>
  );
};

export default CaseFormRecordReception;
