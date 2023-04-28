import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import { useQueryCase, useQueryStage } from "../../../hooks/query";
import TextArea from "../../ui/TextArea/TextArea";
import { useUser } from "@clerk/nextjs";

const CaseFormSolution = ({ thisCase }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState<string>("");

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const findStageByName = (name: string) =>
    stages?.find((s: any) => s.name.toLowerCase() === name.toLowerCase());

  const updateCaseData = (stageName: string, description?: string) => ({
    applicant: { id: thisCase?.insured_id },
    number: thisCase?.case_number,
    product_id: thisCase?.product_id,
    assistance_id: thisCase?.assistance_id,
    stage_id: findStageByName(stageName)?.id || "",
    company_id: thisCase?.contractor_id,
    user_id: user?.id,
    description,
    isactive: true,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (description) {
      return updateCase(updateCaseData("Solución particular", description), {
        onSuccess: () => {
          updateCase(updateCaseData("Recepción de antecedentes"), {
            onSuccess: () => {
              router.push(
                `/case/${thisCase?.case_id}/recepción de antecedentes`
              );
              queryClient.invalidateQueries(["case", thisCase?.case_id]);
            },
          });
        },
      });
    }
    alert("Debe completar todos los campos");
  };

  useEffect(() => {
    if (thisCase) {
      setDescription(
        thisCase?.stages.find((s: any) => s.stage === "Solución particular")
          ?.description
      );
    }
  }, [router, thisCase]);

  return (
    <form onSubmit={handleSubmit}>
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
            label="Descripción de la solución"
            width="525px"
            height="110px"
            disabled={thisCase?.is_active === true ? false : true}
          />
        </ContentCell>
        <Button
          enabled={thisCase?.is_active ? true : false}
          text="Registrar solución"
          type="submit"
        />
      </ContentCell>
    </form>
  );
};

export default CaseFormSolution;
