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

const CaseResolution = ({ thisCase }: any) => {
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

  const handleClose = (e: any) => {
    e.preventDefault();
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
        description: comment,
        isactive: false,
      },
      {
        onSuccess: () => {
          router.push(`/case`);
          queryClient.invalidateQueries(["case", thisCase?.case_id]);
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
    if (thisCase?.stages?.find((c: any) => c?.stage === "Cerrado")) {
      setAction("Cerrar caso");
      setComment(
        thisCase?.stages?.find((c: any) => c?.stage === "Cerrado")?.description
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
          {thisReimbursement && (
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
          )}
          {(assignedSpecialist || assignedPartner) && (
            <ContentCell gap="20px">
              <ContentCell gap="5px">
                <p className="font-semibold">Visita confirmada</p>
                {assignedSpecialist && (
                  <InputText
                    label="Especialista"
                    value={assignedSpecialist?.specialist_name}
                    type="text"
                    disabled={true}
                    width="525px"
                  />
                )}
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
                    value={
                      assignedSpecialist
                        ? assignedSpecialist?.confirmed_date?.split("T")[0]
                        : assignedPartner?.confirmed_date?.split("T")[0]
                    }
                    type="date"
                    disabled={true}
                    width="260px"
                  />
                  <InputText
                    label="Hora de visita"
                    value={
                      assignedSpecialist
                        ? assignedSpecialist?.confirmed_time
                        : assignedPartner?.confirmed_time
                    }
                    type="time"
                    disabled={true}
                    width="260px"
                  />
                </ContentRow>
              </ContentCell>
              <ComboBox
                label="Selecciona una acción"
                data={[{ name: "Calificar" }, { name: "Cerrar caso" }]}
                width="525px"
                dataText="name"
                dataValue="name"
                enabled={thisCase?.is_active === true ? true : false}
                placeHolder="Selecciona una acción"
                onChange={(e: any) => setAction(e.target.value)}
                value={action}
              />
              {action === "Calificar" && (
                <ContentCell gap="5px">
                  <TextArea
                    label="Comentarios"
                    width="525px"
                    height="100px"
                    value={comment}
                    disabled={thisCase?.is_active === true ? false : true}
                    onChange={(e: any) => setComment(e.target.value)}
                  />
                  <Button
                    text="Calificar & Cerrar"
                    type="button"
                    enabled={thisCase?.is_active === true ? true : false}
                    onClick={handleRate}
                  />
                </ContentCell>
              )}
              {action === "Cerrar caso" && (
                <ContentCell gap="5px">
                  <TextArea
                    label="Comentarios"
                    width="525px"
                    height="100px"
                    value={comment}
                    disabled={thisCase?.is_active === true ? false : true}
                    onChange={(e: any) => setComment(e.target.value)}
                  />
                  <Button
                    text="Cerrar caso"
                    type="button"
                    enabled={thisCase?.is_active === true ? true : false}
                    onClick={handleClose}
                  />
                </ContentCell>
              )}
            </ContentCell>
          )}
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseResolution;
