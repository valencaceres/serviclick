import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { useUser } from "../../../hooks";
import TextArea from "../../ui/TextArea/TextArea";
import ComboBox from "../../ui/ComboBox";
import { decisions } from "../../../data/masters";

const CaseFormEvaluation = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [justification, setJustification] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");

  const { id: user_id } = useUser().user;
  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (justification) {
      return updateCase(
        {
          applicant: {
            id: thisCase?.applicant_id,
          },
          number: thisCase?.case_number,
          product_id: thisCase?.product_id,
          assistance_id: thisCase?.assistance_id,
          stage_id:
            stages?.find((s: any) => s.name === "Evaluación del evento")?.id ||
            "",
          user_id: user_id,
          description: justification,
          isactive: true,
        },
        {
          onSuccess: () => {
            return updateCase(
              {
                applicant: {
                  id: thisCase?.applicant_id,
                },
                number: thisCase?.case_number,
                product_id: thisCase?.product_id,
                assistance_id: thisCase?.assistance_id,
                stage_id:
                  stages?.find((s: any) => s.name === evaluation)?.id || "",
                user_id: user_id,
                description: description,
                isactive: true,
              },
              {
                onSuccess: () => {
                  router.push(
                    `/case/${thisCase?.case_id}/${evaluation.toLowerCase()}`
                  );
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                },
              }
            );
          },
        }
      );
    }
    alert("Debe completar todos los campos");
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
      setJustification(
        thisCase?.stages.find((s: any) => s.stage === "Evaluación del evento")
          ?.description
      );
      if (
        thisCase?.stages?.find((s: any) => s.stage === "Solución particular")
      ) {
        setEvaluation("Solución particular");
      }
      if (
        thisCase?.stages?.find(
          (s: any) => s.stage === "Designación de convenio"
        )
      ) {
        setEvaluation("Designación de convenio");
      }
      if (
        thisCase?.stages?.find(
          (s: any) => s.stage === "Designación de especialista"
        )
      ) {
        setEvaluation("Designación de especialista");
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
        <Button
          enabled={thisCase?.is_active ? true : false}
          text="Registrar evaluación"
          type="submit"
        />
      </ContentCell>
    </form>
  );
};

export default CaseFormEvaluation;
