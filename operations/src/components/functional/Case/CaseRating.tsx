import { useEffect, useState } from "react";

import { ContentCell, ContentRow } from "../../layout/Content";
import InputText from "../../ui/InputText";
import ComboBox from "../../ui/ComboBox";
import TextArea from "../../ui/TextArea/TextArea";
import Button from "../../ui/Button";

import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { useUser } from "../../../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const CaseRating = ({ thisCase }: any) => {
  const router = useRouter();
  const [stage, setStage] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { data: stages } = useQueryStage().useGetAll();

  const queryClient = useQueryClient();

  const { id: user_id } = useUser().user;
  const { data: thisReimbursement } = useQueryCase().useGetReimbursment(
    thisCase?.case_id
  );

  const { data: assignedPartner } = useQueryCase().useGetAssignedPartner(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de convenio")?.id
  );
  const { data: assignedSpecialist } = useQueryCase().useGetAssignedSpecialist(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de especialista")?.id
  );

  const { mutate: updateCase } = useQueryCase().useCreate();

  const handleRate = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.applicant_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        stage_id: stages.find((s: any) => s?.name === "Calificación")?.id,
        user_id: user_id,
        description: comment,
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
              stage_id: stages.find((s: any) => s?.name === "Cerrado")?.id,
              user_id: user_id,
              isactive: false,
            },
            {
              onSuccess: () => {
                router.push(`/case/${thisCase?.case_id}/calificación`);
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
              },
            }
          );
        },
      }
    );
  };

  useEffect(() => {
    if (thisCase?.stages?.find((c: any) => c?.stage === "Calificación")) {
      setAction("Calificar");
      setComment(
        thisCase?.stages?.find((c: any) => c?.stage === "Calificación")
          ?.description
      );
    }
  }, [thisCase]);

  return (
    <form>
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
        <ContentCell gap="5px">
          <TextArea
            label="Comentario"
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            width="525px"
            disabled
            height="100px"
          />
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseRating;
