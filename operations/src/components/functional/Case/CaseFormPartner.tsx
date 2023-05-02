import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import {
  useQueryCase,
  useQueryContractor,
  useQueryPartner,
  useQueryStage,
} from "../../../hooks/query";
import ComboBox from "../../ui/ComboBox";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";

const CaseFormPartner = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage: stageFromQuery } = router.query;
  const stage = (stageFromQuery as string) || "default_stage";
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [partner, setPartner] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");

  const minDate = new Date();

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: getAssignedPartner } = useQueryCase().useGetAssignedPartner(
    thisCase?.case_id,
    thisStage
  );
  const { data: partners } = useQueryPartner().useGetByFamilyId(
    thisCase?.family_id
  );
  
  const { mutate: updateCase } = useQueryCase().useCreate();
  const { mutate: assignPartner } = useQueryCase().useAssignPartner();

  const findStageByName = (name: string) =>
    stages?.find((s: any) => s.name.toLowerCase() === name.toLowerCase());

  const updateCaseData = (stageName: string) => ({
    applicant: { id: thisCase?.insured_id },
    number: thisCase?.case_number,
    product_id: thisCase?.product_id,
    assistance_id: thisCase?.assistance_id,
    stage_id: findStageByName(stageName)?.id || "",
    company_id: thisCase?.contractor_id,
    user_id: user?.id,
    isactive: true,
  });

  const assignPartnerData = () => ({
    case_id: thisCase?.case_id,
    casestage_id: thisStage,
    partner_id: partner,
    scheduled_date: scheduledDate || null,
    scheduled_time: scheduledTime || null,
  });

  const handleAssign = (e: any) => {
    e.preventDefault();
    if (partner) {
      return updateCase(updateCaseData(stage), {
        onSuccess: () => {
          assignPartner(assignPartnerData(), {
            onSuccess: () => {
              queryClient.invalidateQueries(["case", thisCase?.case_id]);
            },
          });
        },
      });
    }
  };

  const handleSchedule = (e: any) => {
    e.preventDefault();
    if (partner) {
      return updateCase(updateCaseData(stage), {
        onSuccess: () => {
          assignPartner(assignPartnerData(), {
            onSuccess: () => {
              updateCase(updateCaseData("Seguimiento"), {
                onSuccess: () => {
                  router.push(`/case/${thisCase?.case_id}/seguimiento`);
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                },
              });
            },
          });
        },
      });
    }
  };

  useEffect(() => {
    if (stages) {
      setThisStage(findStageByName(stage.toLowerCase())?.id);
    }
    if (getAssignedPartner) {
      setPartner(getAssignedPartner?.partner_id);
      setScheduledDate(getAssignedPartner?.scheduled_date?.split("T")[0]);
      setScheduledTime(getAssignedPartner?.scheduled_time);
    }
  }, [stages, stage, getAssignedPartner]);

  return (
    <div>
      <ContentCell gap="20px">
      <CaseDescription thisCase={thisCase} />
        <ContentCell gap="20px">
          <ComboBox
            label="Convenio"
            placeHolder="Seleccione convenio"
            data={partners}
            width="525px"
            value={partner}
            onChange={(e: any) => setPartner(e.target.value)}
            dataText="name"
            dataValue="id"
            enabled={thisCase?.is_active === true ? true : false}
          />
        </ContentCell>
        {partner && (
          <ContentCell gap="5px">
            <InputText
              label="Dirección"
              value={partners?.find((p: any) => p.id === partner)?.address}
              type="text"
              disabled={true}
              width="525px"
            />
            <InputText
              label="Comuna"
              value={partners?.find((p: any) => p.id === partner)?.district}
              type="text"
              disabled={true}
              width="525px"
            />
            <ContentRow gap="5px">
              <InputText
                label="Email"
                value={partners?.find((p: any) => p.id === partner)?.email}
                type="text"
                disabled={true}
                width="260px"
              />
              <InputText
                label="Teléfono"
                value={partners?.find((p: any) => p.id === partner)?.phone}
                type="text"
                disabled={true}
                width="260px"
              />
            </ContentRow>
            {partner !== getAssignedPartner?.partner_id ? (
              <Button
                text="Asignar convenio"
                type="button"
                enabled={thisCase?.is_active === true ? true : false}
                onClick={handleAssign}
              />
            ) : (
              getAssignedPartner && (
                <div className="mt-5">
                  <ContentCell gap="5px">
                    <ContentRow gap="5px">
                      <InputText
                        label="Fecha de visita"
                        type="date"
                        width="260px"
                        minDate={minDate.toISOString().split("T")[0]}
                        value={scheduledDate}
                        onChange={(e: any) => setScheduledDate(e.target.value)}
                        disabled={thisCase?.is_active === true ? false : true}
                      />
                      <InputText
                        label="Hora de visita"
                        type="time"
                        width="260px"
                        value={scheduledTime}
                        onChange={(e: any) => setScheduledTime(e.target.value)}
                        minTime="09:00"
                        maxTime="18:00"
                        step="3600"
                        disabled={thisCase?.is_active === true ? false : true}
                      />
                    </ContentRow>
                    <Button
                      text="Programar visita"
                      type="button"
                      enabled={thisCase?.is_active === true ? true : false}
                      onClick={handleSchedule}
                    />
                  </ContentCell>
                </div>
              )
            )}
          </ContentCell>
        )}
      </ContentCell>
    </div>
  );
};

export default CaseFormPartner;
