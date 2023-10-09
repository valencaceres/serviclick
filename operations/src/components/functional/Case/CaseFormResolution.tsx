import { useEffect, useState } from "react";

import { ContentCell, ContentRow } from "../../layout/Content";
import InputText from "../../ui/InputText";
import ComboBox from "../../ui/ComboBox";
import TextArea from "../../ui/TextArea/TextArea";

import {
  useQueryCase,
  useQueryContractor,
  useQueryStage,
  useQueryUF,
  useQueryAssistances,
  useQueryInsured,
} from "../../../hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";
import { Button } from "~/components/ui/ButtonC";

const CaseFormResolution = ({ thisCase }: any) => {
  const router = useRouter();
  const [action, setAction] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [bankNumber, setBankNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [amountSpecialist, setAmountSpecialist] = useState<string>("");
  const [extraAmount, setExtraAmount] = useState<string>("");
  const [commentSummary, setCommentSummary] = useState<string>("");
  const { data: stages } = useQueryStage().useGetAll();

  const queryClient = useQueryClient();

  const { user } = useUser();
  const { data: thisReimbursement } = useQueryCase().useGetReimbursment(
    thisCase?.case_id
  );
  const { data: assignedPartner } = useQueryCase().useGetAssignedPartner(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de alianza")?.id
  );
  const { data: assignedSpecialist } = useQueryCase().useGetAssignedSpecialist(
    thisCase?.case_id,
    stages?.find((s: any) => s?.name === "Designación de especialista")?.id
  );
  const { data: contractor } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );
  const { data: insured } = useQueryInsured().useGetById(thisCase?.insured_id);

  const { data: customerAccount } =
    useQueryInsured().useGetCustomerAccountByInsuredRut(insured?.rut);

  const { mutate: updateCase } = useQueryCase().useCreate();

  const { data: assistanceData } = useQueryCase().useGetAssistanceData(
    thisCase?.insured_id,
    thisCase?.assistance_id,
    thisCase?.product_id
  );
  const { mutate: discountAssistanceData } =
    useQueryCase().useDiscountAssistanceData(
      thisCase?.insured_id,
      thisCase?.assistance_id,
      thisCase?.product_id
    );
  const { mutate: createCaseSummary } = useQueryCase().useCreateCaseSummary();

  const handleRate = (e: any) => {
    e.preventDefault();
    return updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        retail_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id: stages.find((s: any) => s?.name === "Calificación")?.id,
        user_id: user?.id,
        description: comment,
        isactive: true,
        lead_id: thisCase?.lead_id,
        event_date: thisCase.event_date,
        event_location: thisCase.event_location,
      },
      {
        onSuccess: () => {
          return updateCase(
            {
              applicant: {
                id: thisCase?.insured_id,
              },
              number: thisCase?.case_number,
              product_id: thisCase?.product_id,
              assistance_id: thisCase?.assistance_id,
              retail_id:
                contractor?.type === "C" ? thisCase?.contractor_id : null,
              customer_id:
                contractor?.type === "P" ? thisCase?.contractor_id : null,
              stage_id: stages.find((s: any) => s?.name === "Cerrado")?.id,
              user_id: user?.id,
              isactive: false,
              event_date: thisCase.event_date,
              event_location: thisCase.event_location,
            },
            {
              onSuccess: () => {
                router.push(`/case/${thisCase?.case_id}/calificación`);
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
                discountAssistanceData();
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
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        retail_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id: stages.find((s: any) => s?.name === "Cerrado")?.id,
        user_id: user?.id,
        description: comment,
        isactive: false,
        event_date: thisCase.event_date,
        event_location: thisCase.event_location,
      },
      {
        onSuccess: () => {
          createCaseSummary(
            {
              case_id: thisCase?.case_id,
              amount: amountSpecialist,
              extraamount: extraAmount,
              comment: commentSummary,
            },
            {
              onSuccess: () => {
                router.push(`/case`);
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
                discountAssistanceData();
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
    if (thisCase?.stages?.find((c: any) => c?.stage === "Cerrado")) {
      setAction("Cerrar caso");
      setComment(
        thisCase?.stages?.find((c: any) => c?.stage === "Calificación")
          ?.description
      );
    }
  }, [thisCase]);

  useEffect(() => {
    if (customerAccount) {
      if (customerAccount.bank && customerAccount.account_number) {
        setBankNumber(customerAccount.account_number);
        setBankName(customerAccount.bank);
      } else {
        setBankNumber("");
        setBankName("");
      }
    }
  }, [customerAccount]);
  useEffect(() => {
    if (thisReimbursement) {
      if (
        thisReimbursement.casesummary_amount &&
        thisReimbursement.casesummary_extraamount &&
        thisReimbursement.casesummary_comment
      ) {
        setAmountSpecialist(thisReimbursement.casesummary_amount);
        setExtraAmount(thisReimbursement.casesummary_extraamount);
        setCommentSummary(thisReimbursement.casesummary_comment);
      } else {
        setAmountSpecialist("0");
        setExtraAmount("0");
        setCommentSummary("");
      }
    }
  }, [thisReimbursement]);
  return (
    <form>
      <ContentCell gap="20px">
        <CaseDescription thisCase={thisCase} />
        <ContentCell gap="5px">
          {thisReimbursement && (
            <ContentCell gap="20px">
              {thisCase?.stages.find((c: any) => c?.stage === "Resolución")
                ?.description === "Reembolsar IMED" && (
                <h2 className="text-xl font-semibold text-teal-blue">
                  Reembolso IMED
                </h2>
              )}
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
                      : (
                          thisReimbursement?.amount *
                          thisReimbursement?.uf_value
                        ).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                  }
                  type="text"
                  disabled={true}
                  width="260px"
                />
                <InputText
                  label="Estado"
                  value={thisReimbursement?.status}
                  type="text"
                  disabled={true}
                  width="260px"
                />
              </ContentRow>
              <ContentCell gap="5px">
                <h2 className="text-xl font-semibold text-teal-blue">
                  Datos Bancarios
                </h2>
                <ContentRow gap="5px">
                  <div className="flex flex-col gap-[20px]">
                    <InputText
                      label={"Numero de cuenta"}
                      value={bankNumber}
                      type="number"
                      width="525px"
                      disabled={true}
                    />
                    <InputText
                      label={"Banco"}
                      value={bankName}
                      type="text"
                      width="525px"
                      disabled={true}
                    />
                  </div>
                </ContentRow>
              </ContentCell>
              {thisReimbursement?.status === "Pendiente" && (
                <p className="text-red-600">
                  {" "}
                  Debe de aprobarse el reembolso para proseguir
                </p>
              )}
              {thisReimbursement?.status === "Aprobado" && (
                <>
                  <ContentRow gap="5px">
                    <>
                      {thisReimbursement?.imed_amount !== null && (
                        <InputText
                          label="Descuento IMED"
                          value={thisReimbursement?.imed_amount?.toLocaleString(
                            "es-CL",
                            {
                              style: "currency",
                              currency: "CLP",
                            }
                          )}
                          type="text"
                          disabled={true}
                          width="260px"
                        />
                      )}
                      <InputText
                        label="Reembolso ServiClick"
                        value={
                          thisReimbursement?.serviclick_amount
                            ? thisReimbursement.serviclick_amount.toLocaleString(
                                "es-CL",
                                {
                                  style: "currency",
                                  currency: "CLP",
                                }
                              )
                            : 0
                        }
                        type="text"
                        disabled={true}
                        width="260px"
                      />
                    </>
                  </ContentRow>
                  {thisCase?.is_active === false && (
                    <>
                      <ContentRow gap="5px">
                        <>
                          <InputText
                            label="Gastos especialista"
                            value={amountSpecialist}
                            type="number"
                            onChange={(e: any) =>
                              setAmountSpecialist(e.target.value)
                            }
                            width="260px"
                          />
                          <InputText
                            label="Gastos Extras"
                            value={extraAmount}
                            type="number"
                            width="260px"
                            onChange={(e: any) =>
                              setExtraAmount(e.target.value)
                            }
                          />
                        </>
                      </ContentRow>
                      <ContentRow gap="5px">
                        <TextArea
                          label="Observaciones de gastos extras"
                          width="525px"
                          height="100px"
                          value={commentSummary}
                          onChange={(e: any) =>
                            setCommentSummary(e.target.value)
                          }
                        />
                      </ContentRow>
                    </>
                  )}
                </>
              )}
              {thisReimbursement?.comment && (
                <ContentRow gap="5px">
                  <TextArea
                    label="Observaciones del reembolso"
                    width="525px"
                    height="100px"
                    value={thisReimbursement?.comment}
                    disabled={true}
                  />
                </ContentRow>
              )}
              {["Aprobado", "Rechazado"].includes(
                thisReimbursement?.status
              ) && (
                <ContentCell gap="20px">
                  <TextArea
                    label="Comentarios"
                    width="525px"
                    height="100px"
                    value={comment}
                    disabled={thisCase?.is_active === true ? false : true}
                    onChange={(e: any) => setComment(e.target.value)}
                  />
                  {thisCase?.is_active === true ? (
                    <Button
                      onClick={handleClose}
                      disabled={thisCase?.is_active === true ? false : true}
                    >
                      Cerrar caso
                    </Button>
                  ) : (
                    <Button onClick={handleClose}>Actualizar caso</Button>
                  )}
                </ContentCell>
              )}
            </ContentCell>
          )}
          {(assignedSpecialist || assignedPartner) && (
            <ContentCell gap="20px">
              <ContentCell gap="5px">
                <h2 className="pb-5 pt-2 text-xl font-semibold text-teal-blue">
                  Visita confirmada
                </h2>
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
                    label="alianza"
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
                <ContentCell gap="20px">
                  <TextArea
                    label="Comentarios"
                    width="525px"
                    height="100px"
                    value={comment}
                    disabled={thisCase?.is_active === true ? false : true}
                    onChange={(e: any) => setComment(e.target.value)}
                  />
                  <Button
                    type="button"
                    disabled={thisCase?.is_active ? false : true}
                    onClick={handleRate}
                  >
                    Calificar & cerrar
                  </Button>
                </ContentCell>
              )}
              {action === "Cerrar caso" && (
                <ContentCell gap="20px">
                  <TextArea
                    label="Comentarios"
                    width="525px"
                    height="100px"
                    value={comment}
                    disabled={thisCase?.is_active === true ? false : true}
                    onChange={(e: any) => setComment(e.target.value)}
                  />
                  <Button
                    type="button"
                    disabled={thisCase?.is_active ? false : true}
                    onClick={handleClose}
                  >
                    Cerrar caso
                  </Button>
                </ContentCell>
              )}
            </ContentCell>
          )}
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseFormResolution;
