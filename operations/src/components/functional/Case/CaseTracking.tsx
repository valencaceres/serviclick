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

const CaseTracking = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [justification, setJustification] = useState<string>("");
  const [specialsit, setSpecialsit] = useState<string>("");
  const [partner, setPartner] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [confirmDate, setConfirmDate] = useState<string>("");
  const [confirmTime, setConfirmTime] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [assistance, setAssistance] = useState<any>(null);
  const [refundAmount, setRefundAmount] = useState<string>("");

  const { data: beneficiary, getBeneficiaryByRut } = useCase();
  const { id: user_id } = useUser().user;
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
  const { mutate: reimburse } = useQueryCase().useReimburse();

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

  const handleReimburse = (e: any) => {
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
          reimburse(
            {
              case_id: thisCase?.case_id,
              casestage_id: thisCase?.stages?.find(
                (s: any) => s?.stage === "Seguimiento"
              )?.id,
              amount: refundAmount,
              currency: assistance?.assistance.currency,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
                router.push(`/case/${thisCase?.case_id}/resolución`);
              },
            }
          );
        },
      }
    );
  };

  console.log(thisCase);

  useEffect(() => {
    if (thisCase) {
      getBeneficiaryByRut(thisCase?.rut);
    }
  }, [thisCase, router]);

  useEffect(() => {
    if (thisCase) {
      setAssistance(
        beneficiary.products.find(
          (p: any) => p.assistance.id === thisCase?.assistance_id
        )
      );
    }
  }, [beneficiary]);

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
          {thisCase?.stages?.find(
            (s: any) =>
              s.stage === "Designación de convenio" ||
              s.stage === "Designación de especialista"
          ) ? (
            <ContentCell gap="5px">
              <h2 className="font-semibold">Hora programada</h2>
              {getAssignedPartner && (
                <InputText
                  label="Convenio"
                  value={getAssignedPartner?.name}
                  type="text"
                  disabled={true}
                  width="525px"
                />
              )}
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
            data={
              thisCase?.stages.find(
                (s: any) => s.stage === "Solución particular"
              )
                ? selfSolutionSummaryActions
                : summaryActions
            }
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
          ) : evaluation.toLowerCase() === "reembolsar" ? (
            <ContentCell gap="5px">
              <ContentCell gap="5px">
                <h2 className="font-semibold">Disponible</h2>
                <ContentRow gap="5px">
                  <InputText
                    label={
                      assistance?.assistance?.currency === "P"
                        ? "Monto Disponible ($)"
                        : "Monto Disponible (UF)"
                    }
                    value={
                      assistance?.assistance?.currency === "P"
                        ? parseInt(
                            assistance?.assistance?.amount
                          ).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })
                        : assistance?.assistance?.amount + " UF" || ""
                    }
                    type="text"
                    width="152px"
                    disabled
                  />
                  <InputText
                    label="Eventos restantes"
                    value={assistance?.assistance?.events || ""}
                    type="number"
                    width="129px"
                    disabled
                  />
                  <InputText
                    label="Límite"
                    value={assistance?.assistance?.maximum || ""}
                    type="text"
                    width="234px"
                    disabled
                  />
                </ContentRow>
              </ContentCell>
              <ContentCell gap="5px">
                <h2 className="font-semibold">Reembolsar</h2>
                <InputText
                  label={
                    assistance?.assistance?.currency === "P"
                      ? "Monto ($)"
                      : "Monto (UF)"
                  }
                  value={refundAmount}
                  type="number"
                  width="525px"
                  step={assistance?.assistance?.currency === "P" ? "" : "0.01"}
                  onChange={(e: any) => setRefundAmount(e.target.value)}
                />
                <Button
                  text="Reembolsar"
                  type="button"
                  onClick={handleReimburse}
                />
              </ContentCell>
            </ContentCell>
          ) : null}
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseTracking;
