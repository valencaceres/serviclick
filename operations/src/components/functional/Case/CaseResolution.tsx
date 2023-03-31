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
import {
  summaryActions,
  selfSolutionSummaryActions,
} from "../../../data/masters";
import { useCase } from "../../../store/hooks/useCase";

const CaseResolution = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [specialsit, setSpecialsit] = useState<string>("");
  const [partner, setPartner] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");

  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: updateCase, data: newStage } = useQueryCase().useCreate();
  const { data: getAssignedPartner } = useQueryCase().useGetAssignedPartner(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de convenio")?.id
  );
  const { data: getAssignedSpecialist } =
    useQueryCase().useGetAssignedSpecialist(
      thisCase?.case_id,
      stages?.find((s: any) => s?.name === "Designación de especialista")?.id
    );

  const { data: thisReimbursement } = useQueryCase().useGetReimbursment(
    thisCase?.case_id
  );
  console.log(thisReimbursement);

  const { data: assistanceData } = useQueryCase().useGetAssistanceData(
    thisCase?.applicant_id,
    thisCase?.assistance_id,
    thisCase?.product_id
  );

  useEffect(() => {
    if (stages) {
      setThisStage(stages.find((s: any) => s.name.toLowerCase() === stage)?.id);
    }
    if (getAssignedPartner) {
      setPartner(getAssignedPartner?.partner_id);
      setScheduledDate(getAssignedPartner?.scheduled_date?.split("T")[0]);
      setScheduledTime(getAssignedPartner?.scheduled_time);
    }
    if (getAssignedSpecialist) {
      setSpecialsit(getAssignedSpecialist?.specialist_id);
      setScheduledDate(getAssignedSpecialist?.scheduled_date?.split("T")[0]);
      setScheduledTime(getAssignedSpecialist?.scheduled_time);
    }
  }, [stages, stage, getAssignedPartner, getAssignedSpecialist]);

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
          <ContentRow gap="5px">
            <InputText
              label="Monto a reembolsar"
              value={
                thisReimbursement?.currency === "P"
                  ? parseInt(thisReimbursement?.amount).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )
                  : thisReimbursement?.amount + " UF"
              }
              type="text"
              disabled={true}
              width="260px"
            />
            <InputText
              label="Estado"
              value={"Pendiente"}
              type="text"
              disabled={true}
              width="260px"
            />
          </ContentRow>
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseResolution;
