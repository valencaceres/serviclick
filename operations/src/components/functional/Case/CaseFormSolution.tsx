import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { ContentCell } from "../../layout/Content";
import TextArea from "../../ui/TextArea/TextArea";

import {
  useQueryCase,
  useQueryContractor,
  useQueryStage,
} from "../../../hooks/query";
import { CaseDescription } from "./CaseDescription";
import { Button } from "~/components/ui/ButtonC";

const CaseFormSolution = ({ thisCase }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: contractor } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  const { mutate: updateCase } = useQueryCase().useCreate();

  const findStageByName = (name: string) =>
    stages?.find((s: any) => s.name.toLowerCase() === name.toLowerCase());

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
    lead_id: thisCase?.lead_id,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (description) {
      setError(null);
      return updateCase(updateCaseData("Solicitud reembolso", description), {
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
    setError("Debe ingresar una descripción");
  };

  useEffect(() => {
    if (thisCase) {
      setDescription(
        thisCase?.stages.find((s: any) => s.stage === "Solicitud reembolso")
          ?.description
      );
    }
  }, [router, thisCase]);

  return (
    <form onSubmit={handleSubmit}>
      <ContentCell gap="20px">
        <CaseDescription thisCase={thisCase} />
        <ContentCell gap="20px">
          <TextArea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            label="Descripción de la solución"
            width="525px"
            height="110px"
            disabled={thisCase?.is_active === true ? false : true}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </ContentCell>
        <Button disabled={thisCase?.is_active ? false : true}>Continuar</Button>
      </ContentCell>
    </form>
  );
};

export default CaseFormSolution;
