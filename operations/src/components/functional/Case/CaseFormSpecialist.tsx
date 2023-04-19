import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";
import ComboBox from "../../ui/ComboBox";

import {
  useQueryCase,
  useQuerySpecialist,
  useQueryStage,
} from "../../../hooks/query";
import { useDistrict } from "../../../hooks";
import { useUser } from "@clerk/nextjs";

const CaseFormSpecialist = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage: stageFromQuery } = router.query;
  const stage = stageFromQuery || "default_stage";
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const { list: districtList } = useDistrict();

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: assignedSpecialist } = useQueryCase().useGetAssignedSpecialist(
    thisCase?.case_id,
    thisStage
  );

  const { mutate: updateCase } = useQueryCase().useCreate();
  const { data: specialists } = useQuerySpecialist().getByDistrict(
    district,
    thisCase?.assistance_id
  );
  const { mutate: assignSpecialist } = useQueryCase().useAssignSpecialist();

  const minDate = new Date();

  const createUpdateCaseData = (stageId: string) => ({
    applicant: {
      id: thisCase?.applicant_id,
    },
    number: thisCase?.case_number,
    product_id: thisCase?.product_id,
    assistance_id: thisCase?.assistance_id,
    stage_id: stageId,
    user_id: user?.id,
    isactive: true,
  });

  const handleAssign = (e: any) => {
    e.preventDefault();
    if (specialist) {
      updateCase(createUpdateCaseData(thisStage), {
        onSuccess: () => {
          assignSpecialist(
            {
              case_id: thisCase?.case_id,
              casestage_id: thisStage,
              specialist_id: specialist,
              district_id: district,
              scheduled_date: scheduledDate || null,
              scheduled_time: scheduledTime || null,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
              },
            }
          );
        },
      });
    }
  };

  const handleSchedule = (e: any) => {
    e.preventDefault();
    if (specialist) {
      updateCase(createUpdateCaseData(thisStage), {
        onSuccess: () => {
          assignSpecialist(
            {
              case_id: thisCase?.case_id,
              casestage_id: thisStage,
              specialist_id: specialist,
              district_id: district,
              scheduled_date: scheduledDate || null,
              scheduled_time: scheduledTime || null,
            },
            {
              onSuccess: () => {
                const nextStageId = stages?.find(
                  (s: any) => s?.name === "Seguimiento"
                )?.id;
                updateCase(createUpdateCaseData(nextStageId), {
                  onSuccess: () => {
                    router.push(`/case/${thisCase?.case_id}/seguimiento`);
                    queryClient.invalidateQueries(["case", thisCase?.case_id]);
                  },
                });
              },
            }
          );
        },
      });
    }
  };

  useEffect(() => {
    const stageStr = typeof stage === "string" ? stage : stage[0];

    if (stages && stageStr) {
      const foundStage = stages.find(
        (s: any) => s.name.toLowerCase() === stageStr.toLowerCase()
      );
      if (foundStage) setThisStage(foundStage.id);
    }

    if (assignedSpecialist) {
      setSpecialist(assignedSpecialist.specialist_id);
      setScheduledDate(assignedSpecialist.scheduled_date?.split("T")[0]);
      setScheduledTime(assignedSpecialist.scheduled_time);
      setDistrict(assignedSpecialist.district_id);
    }
  }, [stages, stage, assignedSpecialist]);

  useEffect(() => {
    if (!specialists?.length) {
      setSpecialist("");
    }
  }, [district, specialists]);

  return (
    <div>
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
          <ComboBox
            label="Comuna de atención"
            placeHolder="Seleccione comuna"
            value={district}
            data={districtList}
            onChange={(e: any) => setDistrict(e.target.value)}
            width="525px"
            dataText="district_name"
            dataValue="id"
            enabled={thisCase?.is_active === true ? true : false}
          />
          {specialists?.length > 0 && (
            <ComboBox
              label="Especialista"
              placeHolder="Seleccione especialista"
              data={specialists}
              width="525px"
              value={specialist}
              onChange={(e: any) => setSpecialist(e.target.value)}
              dataText="name"
              dataValue="id"
              enabled={thisCase?.is_active === true ? true : false}
            />
          )}
        </ContentCell>
        {specialist && (
          <ContentCell gap="5px">
            <InputText
              label="Dirección"
              value={
                specialists?.find((p: any) => p.id === specialist)?.address
              }
              type="text"
              disabled={true}
              width="525px"
            />
            <InputText
              label="Comuna"
              value={
                specialists?.find((p: any) => p.id === specialist)?.district
              }
              type="text"
              disabled={true}
              width="525px"
            />
            <ContentRow gap="5px">
              <InputText
                label="Email"
                value={
                  specialists?.find((p: any) => p.id === specialist)?.email
                }
                type="text"
                disabled={true}
                width="260px"
              />
              <InputText
                label="Teléfono"
                value={
                  specialists?.find((p: any) => p.id === specialist)?.phone
                }
                type="text"
                disabled={true}
                width="260px"
              />
            </ContentRow>
            {specialist !== assignedSpecialist?.specialist_id ? (
              <Button
                text="Asignar especialista"
                type="button"
                className="w-full"
                enabled={thisCase?.is_active === true ? true : false}
                onClick={handleAssign}
              />
            ) : (
              assignedSpecialist && (
                <div className="mt-5">
                  <ContentCell gap="5px">
                    <ContentRow gap="5px">
                      <InputText
                        label="Fecha de visita"
                        type="date"
                        width="260px"
                        minDate={minDate.toISOString().split("T")[0]}
                        value={scheduledDate}
                        disabled={thisCase?.is_active === true ? false : true}
                        onChange={(e: any) => setScheduledDate(e.target.value)}
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

export default CaseFormSpecialist;
