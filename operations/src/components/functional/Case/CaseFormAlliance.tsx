import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Document, Page } from "react-pdf";
import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";
import { Modal, Window } from "~/components/ui/Modal";
import {
  useQueryAssistances,
  useQueryCase,
  useQueryContractor,
  useQueryLead,
  useQueryStage,
  useQueryUF,
  useQueryProduct,
  useQuerySpecialist,
} from "../../../hooks/query";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/ButtonC";
import { useDistrict } from "~/hooks";
import { useUI } from "~/hooks";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useCase } from "~/store/hooks/useCase";
import { useQualification } from "~/store/hooks/useQualification";

import ButtonIcon from "~/components/ui/ButtonIcon";
import FloatMenu from "~/components/ui/FloatMenu";
import { useToast } from "~/components/ui/use-toast";
import CaseDocumentsTable from "./CaseDocumentsTable";

const CaseFormRefund = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { caseData, caseValue, getById, upsert, isLoading } = useCase();
  const { getAll, qualificationList } = useQualification();

  const idCase = router?.query?.id;
  useEffect(() => {
    getById(idCase as string);
  }, []);
  useEffect(() => {
    getAll();
  }, []);
  const { toast } = useToast();
  const { data: ufValue } = useQueryUF().useGetUFValue();
  const [specialist, setSpecialist] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [confirmHour, setConfirmHour] = useState(false);
  const [comment, setComment] = useState("");
  const [commentRefund, setCommentRefund] = useState("");
  const [confirmVisit, setConfirmVisit] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amountRefund, setAmountRefund] = useState("");
  const [district, setDistrict] = useState<string>("");
  const { user } = useUser();

  const { setTitleUI, filters } = useUI();

  useEffect(() => {
    let statusText = "";

    if (caseValue?.specialist?.completed) {
      statusText = "Realizado";
    } else if (caseValue?.specialist?.confirmed) {
      statusText = "Confirmado";
    }

    setTitleUI(`Caso - Envio de especialista ${statusText}`);
  }, [caseValue]);

  const { list: districtList } = useDistrict();
  const { data: specialists } = useQuerySpecialist().getByDistrict(
    district ?? "",
    caseValue?.assistance?.id ?? ""
  );
  useEffect(() => {
    if (caseValue?.specialist?.completed === true) {
      setConfirmVisit(true);
    }
    if (caseValue?.specialist?.confirmed === true) {
      setConfirmHour(true);
    }
    if (
      caseValue?.specialist?.qualification_id &&
      caseValue?.specialist.qualification_name
    ) {
      setSelectedQualification({
        id: caseValue?.specialist.qualification_id,
        name: caseValue?.specialist.qualification_name,
      });
    }
  }, [
    caseValue?.specialist?.completed,
    caseValue?.specialist?.confirmed,
    caseValue?.specialist?.qualification_id,
    caseValue?.specialist?.qualification_name,
  ]);
  const handleAddSpecialist = async () => {
    try {
      upsert({
        alliance: {
          confirmed: confirmHour,
          completed: confirmVisit,
          comment: comment,
          partner_id: specialist,
          partner_name: "prueba",
          qualification_id: selectedQualification?.id as string,
          qualification_name: selectedQualification?.name as string,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          specialty_id: caseValue?.specialist?.specialty_id as string,
          specialty_name: caseValue?.specialist?.specialty_name as string,
        },
        assistance_id: caseValue?.assistance?.id ?? "",
        beneficiary: caseValue?.beneficiary,
        case_number: caseValue?.case_number,
        case_id: idCase as string,
        cost: caseValue?.cost,
        customer: caseValue?.customer,
        event: caseValue?.event,
        files: caseValue?.files,
        history: caseValue?.history,
        insured: caseValue?.insured,
        is_active: false,
        lead_id: caseValue?.lead_id,
        procedure_id: caseValue?.procedure_id,
        product: caseValue?.product,
        products: caseValue?.products,
        refund_amount: parseFloat(amountRefund),
        retail: caseValue?.retail,
        retails: caseValue?.retails,
        /*         refund_comment: commentRefund,
         */ specialist: {
          confirmed: confirmHour,
          completed: confirmVisit,
          comment: comment,
          district_id: district,
          district_name: "prueba",
          qualification_id: selectedQualification?.id as string,
          qualification_name: selectedQualification?.name as string,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          specialist_id: specialist,
          specialist_name: "",
          specialty_id: caseValue?.specialist?.specialty_id as string,
          specialty_name: caseValue?.specialist?.specialty_name as string,
        },
        type: caseValue?.type,
        user_id: user?.id as string,
        values: caseValue?.values,
      });
    } catch (e) {
      setError("Faltaron campos");
    }
  };
  useEffect(() => {
    if (
      caseValue.assistance !== null &&
      caseValue.specialist?.scheduled_date &&
      caseValue.specialist?.scheduled_time
    ) {
      setScheduledDate(caseValue.specialist?.scheduled_date?.split("T")[0]);
      setScheduledTime(caseValue?.specialist?.scheduled_time);
    }
  }, [
    caseValue?.assistance?.id,
    caseValue?.specialist?.scheduled_date,
    caseValue?.specialist?.scheduled_time,
  ]);

  useEffect(() => {
    if (!specialists?.length) {
      setSpecialist("");
    }
  }, [district, specialists]);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickHome = () => {
    router.push("/");
  };
  const minDate = new Date();
  const handleClickBack = () => {
    router.push(`/assistance/case/attachment/${idCase as string}`);
  };
  const handleClickSave = () => {
    handleAddSpecialist();
  };

  const handleQualificationChange = (e: any) => {
    const selectedValue = e.target.value;
    const selectedOption = qualificationList?.find(
      (qualification) => qualification.id === selectedValue
    );
    setSelectedQualification(selectedOption || null);
  };
  return (
    <div className="w-1/2 lg:w-2/6">
      <ContentCell gap="20px">
        <div className="flex flex-col gap-[5px]">
          {caseValue?.customer && caseValue?.customer ? (
            <InputText
              label="Cliente"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseData?.customer?.name || `${caseValue?.customer?.name} `
              }
              disabled
            />
          ) : (
            <InputText
              label="Titular"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.insured?.name ||
                    `${caseValue?.insured?.name} ${caseValue?.insured?.paternallastname}`
              }
              disabled
            />
          )}
          {caseValue?.retail && caseValue?.retail && (
            <InputText
              label="Empresa"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.retail?.name || `${caseValue?.retail?.name} `
              }
              disabled
            />
          )}

          {caseValue?.beneficiary?.name && (
            <InputText
              label="Beneficiario"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.beneficiary?.name ||
                    `${caseValue?.beneficiary?.name} ${caseValue?.beneficiary?.paternallastname}`
              }
              disabled
            />
          )}
        </div>
        <div className="flex flex-col gap-[5px]">
          <InputText
            label="Producto"
            type="text"
            value={caseValue?.product?.name ?? ""}
            disabled={true}
          />
          <InputText
            label="Servicio"
            type="text"
            value={caseValue?.assistance?.name ?? ""}
            disabled={true}
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="flex flex-col gap-[5px]">
            <InputText
              value="Designación de alianza"
              label="Procedimiento"
              disabled={true}
            />
          </div>
          {caseValue.specialist === null ? (
            <ContentRow gap="5px">
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
            </ContentRow>
          ) : (
            <>
              <InputText
                label="Especialista"
                value={caseValue?.specialist?.specialist_name}
                type="text"
                disabled={true}
              />
              <InputText
                label="Especialidad"
                value={caseValue?.specialist?.specialty_name}
                type="text"
                disabled={true}
              />
            </>
          )}
          <div className="flex flex-row items-center justify-between gap-[5px]">
            <div className="flex flex-row gap-[5px]">
              <InputText
                label="Fecha de visita"
                type="date"
                width="160px"
                minDate={minDate.toISOString().split("T")[0]}
                value={scheduledDate}
                onChange={(e: any) => setScheduledDate(e.target.value)}
              />
              <InputText
                label="Hora de visita"
                type="time"
                width="100px"
                value={scheduledTime}
                onChange={(e: any) => setScheduledTime(e.target.value)}
                minTime="09:00"
                maxTime="20:00"
              />
            </div>
            {caseValue.specialist?.confirmed === false && (
              <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                <p
                  className="cursor-pointer border-b-2 border-blue-500 text-blue-500"
                  onClick={() => setConfirmHour(true)}
                >
                  Confirmar
                </p>
                <p
                  className="cursor-pointer border-b-2 border-blue-500 text-blue-500 "
                  onClick={() => setConfirmHour(false)}
                >
                  Anular
                </p>
              </div>
            )}
            {caseValue.specialist?.completed === false &&
              caseValue.specialist.confirmed === false && (
                <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                  <p
                    className="cursor-pointer border-b-2 border-blue-500 text-blue-500"
                    onClick={() => setConfirmVisit(true)}
                  >
                    Realizada
                  </p>
                  <p
                    className="cursor-pointer border-b-2 border-blue-500 text-blue-500 "
                    onClick={() => setConfirmVisit(false)}
                  >
                    No Realizada
                  </p>
                </div>
              )}
          </div>
          {caseValue.specialist?.completed === false ? (
            <TextArea
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              label="Comentario"
              width="525px"
              height="110px"
            />
          ) : (
            <>
              <ComboBox
                label="Calificación"
                placeHolder="Seleccione calificación"
                data={qualificationList || []}
                width="525px"
                value={
                  selectedQualification
                    ? `${selectedQualification.id} - ${selectedQualification.name}`
                    : ""
                }
                onChange={handleQualificationChange}
                dataText="name"
                dataValue="id"
              />
              <TextArea
                value={comment}
                onChange={(e: any) => setComment(e.target.value)}
                label="Descripcion del evento"
                width="525px"
                height="110px"
              />
            </>
          )}
        </div>
        {caseValue.assistance?.assigned.amount &&
          caseValue.specialist?.completed === true && (
            <>
              <div className="flex flex-col gap-[5px]">
                <div className="flex flex-row justify-between">
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue.assistance?.assigned?.amount).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                    type="text"
                    width="120px"
                    disabled={true}
                  />
                  <InputText
                    label="Extra ($)"
                    value={amountRefund}
                    type="number"
                    width="120px"
                    onChange={(e: any) => setAmountRefund(e.target.value)}
                  />
                </div>
                <TextArea
                  value={commentRefund}
                  onChange={(e: any) => setCommentRefund(e.target.value)}
                  label="Justificación"
                  width="525px"
                  height="110px"
                />
              </div>
            </>
          )}
      </ContentCell>

      <LoadingMessage />
      <Fragment>
        <FloatMenu>
          <ButtonIcon iconName="home" onClick={handleClickHome} />
          <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
          <ButtonIcon
            iconName="save"
            onClick={() => {
              handleClickSave();
            }}
          />
        </FloatMenu>
      </Fragment>
    </div>
  );
};

export default CaseFormRefund;
