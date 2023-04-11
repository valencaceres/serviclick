import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { useUser } from "../../../hooks";
import TextArea from "../../ui/TextArea/TextArea";

const CaseFormSolution = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { id: user_id } = useUser().user;
  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (description) {
      return updateCase(
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
          description,
          isactive: true,
        },
        {
          onSuccess: () => {
            router.push(`/case/${thisCase?.case_id}/recepción de antecedentes`);
            queryClient.invalidateQueries(["case", thisCase?.case_id]);
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
        thisCase?.stages.find((s: any) => s.stage === "Solución particular")
          ?.description
      );
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
