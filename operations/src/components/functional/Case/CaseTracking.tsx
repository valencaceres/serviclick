import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import InputText from "../../ui/InputText";

import {
  useQueryCase,
  useQueryContractor,
  useQueryStage,
  useQueryUF,
} from "../../../hooks/query";
import TextArea from "../../ui/TextArea/TextArea";
import ComboBox from "../../ui/ComboBox";
import {
  summaryActions,
  selfSolutionSummaryActions,
} from "../../../data/masters";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";
import { Button } from "~/components/ui/ButtonC";

const CaseTracking = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [justification, setJustification] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [confirmDate, setConfirmDate] = useState<string>(scheduledDate);
  const [confirmTime, setConfirmTime] = useState<string>(scheduledTime);
  const [evaluation, setEvaluation] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<number | null>(null);

  const { user } = useUser();
  const { data: ufValue } = useQueryUF().useGetUFValue();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: assignedPartner } = useQueryCase().useGetAssignedPartner(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de convenio")?.id
  );
  const { data: assignedSpecialist } = useQueryCase().useGetAssignedSpecialist(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de especialista")?.id
  );
  const { data: assistanceData } = useQueryCase().useGetAssistanceData(
    thisCase?.insured_id,
    thisCase?.assistance_id,
    thisCase?.product_id
  );
  const { data: thisReimbursement } = useQueryCase().useGetReimbursment(
    thisCase?.case_id
  );
  const { data: contractor } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  const { mutate: updateCase } = useQueryCase().useCreate();
  const { mutate: assignPartner } = useQueryCase().useAssignPartner();
  const { mutate: assignSpecialist } = useQueryCase().useAssignSpecialist();
  const { mutate: reimburse } = useQueryCase().useReimburse();

  const handleConfirm = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        company_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id: stages.find((s: any) => s?.name === "Resolución")?.id,
        user_id: user?.id,
        description: evaluation,
        isactive: true,
      },
      {
        onSuccess: () => {
          if (assignedSpecialist) {
            assignSpecialist(
              {
                case_id: thisCase?.case_id,
                casestage_id: stages.find(
                  (s: any) => s.name === "Designación de especialista"
                )?.id,
                specialist_id: assignedSpecialist?.specialist_id,
                district_id: assignedSpecialist?.district_id,
                scheduled_date: assignedSpecialist?.scheduled_date,
                scheduled_time: assignedSpecialist?.scheduled_time,
                confirmed_date: confirmDate,
                confirmed_time: confirmTime,
              },
              {
                onSuccess: () => {
                  router.push(`/case/${thisCase?.case_id}/resolución`);
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                },
              }
            );
          }
          if (assignedPartner) {
            assignPartner(
              {
                case_id: thisCase?.case_id,
                casestage_id: stages.find(
                  (s: any) => s.name === "Designación de convenio"
                )?.id,
                partner_id: assignedPartner?.partner_id,
                scheduled_date: assignedPartner?.scheduled_date,
                scheduled_time: assignedPartner?.scheduled_time,
                confirmed_date: confirmDate,
                confirmed_time: confirmTime,
              },
              {
                onSuccess: () => {
                  router.push(`/case/${thisCase?.case_id}/resolución`);
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                },
              }
            );
          }
        },
      }
    );
  };

  const handleReschedule = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        company_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id: stages.find((s: any) => s?.name === "Seguimiento")?.id,
        user_id: user?.id,
        isactive: true,
      },
      {
        onSuccess: () => {
          if (assignedSpecialist) {
            assignSpecialist(
              {
                case_id: thisCase?.case_id,
                casestage_id: stages.find(
                  (s: any) => s.name === "Designación de especialista"
                )?.id,
                specialist_id: assignedSpecialist?.specialist_id,
                district_id: assignedSpecialist?.district_id,
                scheduled_date: confirmDate,
                scheduled_time: confirmTime,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                  setEvaluation("");
                },
              }
            );
          }
          if (assignedPartner) {
            assignPartner(
              {
                case_id: thisCase?.case_id,
                casestage_id: stages.find(
                  (s: any) => s.name === "Designación de convenio"
                )?.id,
                partner_id: assignedPartner?.partner_id,
                scheduled_date: confirmDate,
                scheduled_time: confirmTime,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                  setEvaluation("");
                },
              }
            );
          }
        },
      }
    );
  };

  const handleReimburse = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        company_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id: stages.find((s: any) => s?.name === "Resolución")?.id,
        description: evaluation,
        user_id: user?.id,
        isactive: true,
      },
      {
        onSuccess: () => {
          reimburse(
            {
              case_id: thisCase?.case_id,
              casestage_id: thisCase?.stages?.find(
                (s: any) => s?.stage === "Seguimiento"
              )?.id,
              amount:
                assistanceData?.currency === "U"
                  ? refundAmount! / ufValue.serie[0].valor
                  : refundAmount,
              currency: assistanceData?.currency,
              uf_value: ufValue.serie[0].valor,
              available: assistanceData?.remaining_amount,
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

  const handleReject = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        company_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id: stages.find((s: any) => s?.name === "Rechazado")?.id,
        user_id: user?.id,
        description: justification,
        isactive: false,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["case", thisCase?.case_id]);
          router.push(`/case`);
        },
      }
    );
  };

  useEffect(() => {
    const previousEvaluation = thisCase?.stages.find(
      (s: any) => s?.stage === "Resolución"
    )?.description;
    if (thisCase?.stages.find((s: any) => s?.stage === "Rechazado")) {
      setJustification(
        thisCase?.stages.find((s: any) => s?.stage === "Rechazado")?.description
      );
      return setEvaluation("Rechazar caso");
    }
    if (thisCase?.stages.find((s: any) => s?.stage === "Resolución")) {
      if (previousEvaluation !== "Reprogramar visita") {
        setEvaluation(previousEvaluation);
      }
    }
    if (assignedPartner) {
      setScheduledDate(assignedPartner?.scheduled_date?.split("T")[0]);
      setScheduledTime(assignedPartner?.scheduled_time);
      setConfirmDate(assignedPartner?.confirmed_date?.split("T")[0]);
      setConfirmTime(assignedPartner?.confirmed_time);
    }
    if (assignedSpecialist) {
      setScheduledDate(assignedSpecialist?.scheduled_date?.split("T")[0]);
      setScheduledTime(assignedSpecialist?.scheduled_time);
      setConfirmDate(assignedSpecialist?.confirmed_date?.split("T")[0]);
      setConfirmTime(assignedSpecialist?.confirmed_time);
    }
  }, [stages, stage, assignedPartner, assignedSpecialist]);

  console.log(thisReimbursement);

  return (
    <form>
      <ContentCell gap="10px">
        <CaseDescription thisCase={thisCase} />
        <ContentCell gap="5px">
          {thisCase?.stages?.find(
            (s: any) =>
              s.stage === "Designación de convenio" ||
              s.stage === "Designación de especialista"
          ) ? (
            <ContentCell gap="5px">
              <h2 className="pb-5 pt-4 text-xl font-semibold text-teal-blue">
                Hora programada
              </h2>
              {assignedPartner && (
                <InputText
                  label="Convenio"
                  value={assignedPartner?.name}
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
                (s: any) => s.stage === "Solicitud reembolso"
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
            enabled={thisCase?.is_active === true ? true : false}
          />
          {evaluation?.toLowerCase() === "confirmar visita" ? (
            <ContentCell gap="20px">
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="260px"
                  value={confirmDate}
                  defaultValue={scheduledDate}
                  disabled={thisCase?.is_active === true ? false : true}
                  onChange={(e: any) => setConfirmDate(e.target.value)}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="260px"
                  value={confirmTime}
                  defaultValue={scheduledTime}
                  onChange={(e: any) => setConfirmTime(e.target.value)}
                  minTime="09:00"
                  maxTime="18:00"
                  disabled={thisCase?.is_active === true ? false : true}
                />
              </ContentRow>
              <Button
                type="button"
                disabled={thisCase?.is_active ? false : true}
                onClick={handleConfirm}
              >
                Confirmar visita
              </Button>
            </ContentCell>
          ) : evaluation?.toLowerCase() === "reprogramar visita" ? (
            <ContentCell gap="20px">
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="260px"
                  value={confirmDate}
                  defaultValue={scheduledDate}
                  disabled={thisCase?.is_active === true ? false : true}
                  onChange={(e: any) => setConfirmDate(e.target.value)}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="260px"
                  value={confirmTime}
                  defaultValue={scheduledTime}
                  onChange={(e: any) => setConfirmTime(e.target.value)}
                  minTime="09:00"
                  maxTime="18:00"
                  step="3600"
                  disabled={thisCase?.is_active === true ? false : true}
                />
              </ContentRow>
              <Button
                type="button"
                disabled={thisCase?.is_active ? false : true}
                onClick={handleReschedule}
              >
                Reprogramar visita
              </Button>
            </ContentCell>
          ) : evaluation?.toLowerCase() === "cancelar visita" ? (
            <ContentCell gap="5px">
              <TextArea
                value={justification}
                onChange={(e: any) => setJustification(e.target.value)}
                label="Justificación de la decisión"
                width="525px"
                height="110px"
                disabled={thisCase?.is_active === true ? false : true}
              />
              <Button
                type="button"
                disabled={thisCase?.is_active ? false : true}
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              >
                Cancelar visita
              </Button>
            </ContentCell>
          ) : evaluation?.toLowerCase() === "rechazar caso" ? (
            <ContentCell gap="20px">
              <TextArea
                value={justification}
                onChange={(e: any) => setJustification(e.target.value)}
                label="Justificación de la decisión"
                width="525px"
                height="110px"
                disabled={thisCase?.is_active === true ? false : true}
              />
              <Button
                type="button"
                disabled={thisCase?.is_active ? false : true}
                onClick={handleReject}
              >
                Rechazar caso
              </Button>
            </ContentCell>
          ) : evaluation?.toLowerCase() === "reembolsar" ||
            evaluation?.toLowerCase() === "reembolsar imed" ? (
            <ContentCell gap="5px">
              <ContentCell gap="5px">
                <h2 className="text-xl font-semibold text-teal-blue">
                  Disponible
                </h2>
                <ContentRow gap="5px">
                  <InputText
                    label={"Monto Disponible"}
                    value={
                      assistanceData?.currency === "P"
                        ? parseInt(
                            assistanceData?.remaining_amount
                          ).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })
                        : (
                            assistanceData?.remaining_amount! *
                            ufValue?.serie[0].valor
                          ).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })
                    }
                    type="text"
                    width={assistanceData?.max_events !== 0 ? "152px" : "286px"}
                    disabled
                  />
                  {assistanceData?.max_events !== 0 && (
                    <InputText
                      label="Eventos restantes"
                      value={assistanceData?.remaining_events}
                      type="number"
                      width="129px"
                      disabled
                    />
                  )}
                  <InputText
                    label="Límite"
                    value={assistanceData?.maximum}
                    type="text"
                    width="234px"
                    disabled
                  />
                </ContentRow>
              </ContentCell>
              <ContentCell gap="5px">
                <h2 className="pt-4 text-xl font-semibold text-teal-blue">
                  Reembolsar
                </h2>
                <InputText
                  label={"Monto ($)"}
                  value={
                    thisReimbursement?.amount
                      ? thisReimbursement?.currency === "P"
                        ? thisReimbursement?.amount
                        : thisReimbursement?.amount *
                          thisReimbursement?.uf_value
                      : refundAmount
                  }
                  type="number"
                  width="525px"
                  disabled={thisCase?.is_active === true ? false : true}
                  onChange={(e: any) => setRefundAmount(e.target.value)}
                />
                <Button
                  type="button"
                  disabled={thisCase?.is_active ? false : true}
                  onClick={handleReimburse}
                  className="mt-4"
                >
                  Reembolsar
                </Button>
              </ContentCell>
            </ContentCell>
          ) : null}
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseTracking;
