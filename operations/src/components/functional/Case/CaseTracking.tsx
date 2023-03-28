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
import { summaryActions } from "../../../data/masters";

const CaseTracking = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [justification, setJustification] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [confirmDate, setConfirmDate] = useState<string>("");
  const [confirmTime, setConfirmTime] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");

  const { id: user_id } = useUser().user;
  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: updateCase } = useQueryCase().useCreate();
  const { data: getAssignedPartner } = useQueryCase().useGetAssignedPartner(
    thisCase?.case_id,
    stages.find((s: any) => s?.name === "Designación de convenio")?.id
  );
  const { data: getAssignedSpecialist } =
    useQueryCase().useGetAssignedSpecialist(
      thisCase?.case_id,
      stages.find((s: any) => s?.name === "Designación de especialista")?.id
    );

  const handleConfirm = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.applicant_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        stage_id: stages.find((s: any) => s?.name === "Resolución")?.id,
        user_id: user_id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["case", thisCase?.case_id]);
          router.push(`/case/${thisCase?.case_id}/resolución`);
        },
      }
    );
  };

  useEffect(() => {
    if (stages) {
      setThisStage(stages.find((s: any) => s.name.toLowerCase() === stage)?.id);
    }
    if (getAssignedPartner) {
      setScheduledDate(getAssignedPartner?.scheduled_date?.split("T")[0]);
      setScheduledTime(getAssignedPartner?.scheduled_time);
    }
    if (getAssignedSpecialist) {
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
          {thisCase?.stages?.find(
            (s: any) =>
              s.stage === "Designación de convenio" ||
              s.stage === "Designación de especialista"
          ) ? (
            <ContentCell>
              <h2 className="font-semibold">Hora programada</h2>
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="260px"
                  disabled={true}
                  value={scheduledDate}
                  onChange={(e: any) => setScheduledDate(e.target.value)}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="260px"
                  disabled={true}
                  value={scheduledTime}
                  onChange={(e: any) => setScheduledTime(e.target.value)}
                  minTime="09:00"
                  maxTime="18:00"
                  step="3600"
                />
              </ContentRow>
            </ContentCell>
          ) : null}
        </ContentCell>
        <ContentCell gap="20px">
          <ComboBox
            label="Seleccione una acción"
            data={summaryActions}
            placeHolder="Seleccione una acción"
            onChange={(e: any) => setEvaluation(e.target.value)}
            width="525px"
            value={evaluation}
            dataText="name"
            dataValue="name"
          />
          {evaluation.toLowerCase() === "confirmar visita" ? (
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="260px"
                  value={confirmDate}
                  onChange={(e: any) => setConfirmDate(e.target.value)}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="260px"
                  value={confirmTime}
                  onChange={(e: any) => setConfirmTime(e.target.value)}
                  minTime="09:00"
                  maxTime="18:00"
                  step="3600"
                />
              </ContentRow>
              <Button
                text="Confirmar visita"
                type="button"
                onClick={handleConfirm}
              />
            </ContentCell>
          ) : evaluation.toLowerCase() === "reprogramar visita" ? (
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="260px"
                  value={confirmDate}
                  onChange={(e: any) => setConfirmDate(e.target.value)}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="260px"
                  value={confirmTime}
                  onChange={(e: any) => setConfirmTime(e.target.value)}
                  minTime="09:00"
                  maxTime="18:00"
                  step="3600"
                />
              </ContentRow>
              <TextArea
                value={justification}
                onChange={(e: any) => setJustification(e.target.value)}
                label="Justificación de la decisión"
                width="525px"
                height="110px"
              />
              <Button
                text="Reprogramar visita"
                type="button"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              />
            </ContentCell>
          ) : evaluation.toLowerCase() === "cancelar visita" ? (
            <ContentCell gap="5px">
              <TextArea
                value={justification}
                onChange={(e: any) => setJustification(e.target.value)}
                label="Justificación de la decisión"
                width="525px"
                height="110px"
              />
              <Button
                text="Cancelar visita"
                type="button"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              />
            </ContentCell>
          ) : evaluation.toLowerCase() === "rechazar caso" ? (
            <ContentCell gap="5px">
              <TextArea
                value={justification}
                onChange={(e: any) => setJustification(e.target.value)}
                label="Justificación de la decisión"
                width="525px"
                height="110px"
              />
              <Button
                text="Rechazar caso"
                type="button"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              />
            </ContentCell>
          ) : null}
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseTracking;
