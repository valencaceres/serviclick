import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";

import {
  useQueryCase,
  useQueryContractor,
  useQueryStage,
} from "../../../hooks/query";
import TextArea from "../../ui/TextArea/TextArea";
import ComboBox from "../../ui/ComboBox";
import { decisions } from "../../../data/masters";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";
import { Button } from "~/components/ui/ButtonC";

const CaseFormEvaluation = ({ thisCase }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState<string>("");
  const [justification, setJustification] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: contractor } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  const { mutate: updateCase } = useQueryCase().useCreate();

  const findStageByName = (name: string) =>
    stages?.find((s: any) => s.name.toLowerCase() === name.toLowerCase());
  const findStageByStage = (stage: string) =>
    thisCase?.stages.find(
      (s: any) => s.stage.toLowerCase() === stage.toLowerCase()
    );

  const updateCaseData = (stageName: string, description?: string) => ({
    applicant: { id: thisCase?.insured_id },
    number: thisCase?.case_number,
    product_id: thisCase?.product_id,
    assistance_id: thisCase?.assistance_id,
    stage_id: findStageByName(stageName)?.id || "",
    company_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
    customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
    user_id: user?.id,
    description,
    isactive: true,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (justification) {
      return updateCase(
        updateCaseData("Evaluación del evento", justification),
        {
          onSuccess: () => {
            return updateCase(updateCaseData(evaluation), {
              onSuccess: () => {
                router.push(
                  `/case/${thisCase?.case_id}/${evaluation.toLowerCase()}`
                );
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
              },
            });
          },
        }
      );
    }
    alert("Debe completar todos los campos");
  };

  useEffect(() => {
    if (thisCase) {
      setDescription(findStageByStage("Registro de servicio")?.description);
      setJustification(findStageByStage("Evaluación del evento")?.description);
      const evaluationStages = [
        "Solución particular",
        "Designación de convenio",
        "Designación de especialista",
      ];

      for (const stageName of evaluationStages) {
        if (findStageByStage(stageName)) {
          setEvaluation(stageName);
          break;
        }
      }
    }
  }, [router, thisCase]);

  return (
    <form
      action=""
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit}
    >
      <ContentCell gap="20px">
        <CaseDescription thisCase={thisCase} />
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
            height="110px"
            disabled={thisCase?.is_active ? false : true}
          />
          <ComboBox
            label="Decisión de evaluación"
            placeHolder="Seleccione decisión"
            data={decisions}
            width="525px"
            value={evaluation}
            enabled={thisCase?.is_active ? true : false}
            onChange={(e: any) => setEvaluation(e.target.value)}
            dataText="name"
            dataValue="name"
          />
        </ContentCell>
        <Button disabled={thisCase?.is_active ? false : true}>
          Registrar evaluación
        </Button>
      </ContentCell>
    </form>
  );
};

export default CaseFormEvaluation;
