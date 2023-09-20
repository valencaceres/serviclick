import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";
import ComboBox from "../../ui/ComboBox";

import {
  useQueryCase,
  useQueryContractor,
  useQuerySpecialist,
  useQueryStage,
} from "../../../hooks/query";
import { useDistrict } from "../../../hooks";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";

const CaseFormReimbursement = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [thisStage, setThisStage] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const { list: districtList } = useDistrict();

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: getAssignedSpecialist } =
    useQueryCase().useGetAssignedSpecialist(thisCase?.case_id, thisStage);
  const { data: specialists } = useQuerySpecialist().getByDistrict(
    district,
    thisCase?.assistance_id
  );
  const { data: contractor } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  const { mutate: updateCase } = useQueryCase().useCreate();
  const { mutate: assignSpecialist } = useQueryCase().useAssignSpecialist();

  const handleAssign = (e: any) => {
    e.preventDefault();
    if (specialist) {
      return updateCase(
        {
          applicant: {
            id: thisCase?.insured_id,
          },
          number: thisCase?.case_number,
          product_id: thisCase?.product_id,
          assistance_id: thisCase?.assistance_id,
          stage_id: thisStage,
          retail_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
          customer_id:
            contractor?.type === "P" ? thisCase?.contractor_id : null,
          user_id: user?.id,
          isactive: true,
          lead_id: thisCase?.lead_id,
          event_date: thisCase.event_date,
          event_location: thisCase.event_location,
        },
        {
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
                  router.push(
                    `/case/${thisCase?.case_id}/recepción de antecedentes`
                  );
                  queryClient.invalidateQueries(["case", thisCase?.case_id]);
                },
              }
            );
            queryClient.invalidateQueries(["case", thisCase?.case_id]);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (stages) {
      setThisStage(stages.find((s: any) => s.name.toLowerCase() === stage)?.id);
    }
    if (getAssignedSpecialist) {
      setSpecialist(getAssignedSpecialist?.specialist_id);
      setScheduledDate(getAssignedSpecialist?.scheduled_date?.split("T")[0]);
      setScheduledTime(getAssignedSpecialist?.scheduled_time);
      setDistrict(getAssignedSpecialist?.district_id);
    }
  }, [stages, stage, getAssignedSpecialist]);

  useEffect(() => {
    if (specialists?.length === 0) {
      setSpecialist("");
    }
  }, [district, specialists]);

  return (
    <div>
      <ContentCell gap="20px">
        <CaseDescription thisCase={thisCase} />
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
            {specialist !== getAssignedSpecialist?.specialist_id ? (
              <Button
                text="Asignar especialista"
                type="button"
                className="w-full"
                onClick={handleAssign}
              />
            ) : (
              getAssignedSpecialist && (
                <div className="mt-5">
                  <ContentCell gap="5px">
                    <ContentRow gap="5px">
                      <InputText
                        label="Fecha de visita"
                        type="date"
                        width="260px"
                        value={
                          thisCase?.stages.find(
                            (s: any) => s.name === "Designación de convenio"
                          )
                            ? thisCase?.stages.find(
                                (s: any) => s.name === "Designación de convenio"
                              )?.scheduled_date
                            : scheduledDate
                        }
                        onChange={(e: any) => setScheduledDate(e.target.value)}
                      />
                      <InputText
                        label="Hora de visita"
                        type="time"
                        width="260px"
                        value={
                          thisCase?.stages.find(
                            (s: any) => s.name === "Designación de convenio"
                          )
                            ? thisCase?.stages.find(
                                (s: any) => s.name === "Designación de convenio"
                              )?.scheduled_time
                            : scheduledTime
                        }
                        onChange={(e: any) => setScheduledTime(e.target.value)}
                      />
                    </ContentRow>
                    <Button
                      text="Programar visita"
                      type="button"
                      onClick={handleAssign}
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

export default CaseFormReimbursement;
