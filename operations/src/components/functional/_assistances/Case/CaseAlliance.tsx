import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";
import TextArea from "~/components/ui/TextArea/TextArea";
import { usePartner } from "~/store/hooks";
import { useQualification } from "~/store/hooks";
import { useRouter } from "next/router";
import { useAssistance } from "~/store/hooks";
import { useSpecialty } from "~/store/hooks";
import { useUser } from "@clerk/nextjs";
interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseAlliance = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const {
    caseValue,
    setCase,
    getById: getCaseById,
    caseId,
    upsert: caseUpsert,
  } = useCase();
  const { partnerList, getPartnersByAssistanceId } = usePartner();
  const { user } = useUser();
  const { qualificationList, getAll } = useQualification();
  const { assistance, getById } = useAssistance();
  const { specialties, getSpecialitiesByPartner } = useSpecialty();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const minDate = new Date();
  const router = useRouter();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;

    setCase({
      ...caseValue,
      user_id: user?.id || "",
      alliance: {
        completed: confirmVisit,
        confirmed: confirmHour,
        cancel: cancel,

        scheduled_date: caseValue.alliance?.scheduled_date || "",
        scheduled_time: caseValue.alliance?.scheduled_time || "",
        partner_id: caseValue.alliance?.partner_id || "",
        partner_address: caseValue.alliance?.partner_address || "",
        partner_district: caseValue.alliance?.partner_district || "",
        partner_email: caseValue.alliance?.partner_email || "",
        partner_phone: caseValue.alliance?.partner_phone || "",
        partner_name: caseValue.alliance?.partner_name || "",
        specialty_id: caseValue.alliance?.specialty_id || "",
        specialty_name: caseValue.alliance?.specialty_name || "",
        qualification_id: caseValue.alliance?.qualification_id || null,
        qualification_name: caseValue.alliance?.qualification_name || "",
        comment: caseValue.alliance?.comment || "",

        [id]: value,
      },
    });
  };

  const sendConfirmation = (e: boolean) => {
    caseUpsert({
      ...caseValue,
      alliance: {
        completed: confirmVisit,
        confirmed: e,
        cancel: cancel,
        scheduled_date: caseValue.alliance?.scheduled_date || "",
        scheduled_time: caseValue.alliance?.scheduled_time || "",
        partner_id: caseValue.alliance?.partner_id || "",
        partner_name: caseValue.alliance?.partner_name || "",
        partner_address: caseValue.alliance?.partner_address || "",
        partner_district: caseValue.alliance?.partner_district || "",
        partner_email: caseValue.alliance?.partner_email || "",
        partner_phone: caseValue.alliance?.partner_phone || "",
        specialty_id: caseValue.alliance?.specialty_id || "",
        specialty_name: caseValue.alliance?.specialty_name || "",
        qualification_id: caseValue.alliance?.qualification_id || null,
        qualification_name: caseValue.alliance?.qualification_name || "",
        comment: caseValue.alliance?.comment || "",
      },
      user_id: user?.id ?? "",
    });
    router.push("/assistance/case");
  };
  const sendConfirmationVisit = (e: boolean) => {
    caseUpsert({
      ...caseValue,
      alliance: {
        completed: e,
        confirmed: confirmHour,
        cancel: cancel,
        scheduled_date: caseValue.alliance?.scheduled_date || "",
        scheduled_time: caseValue.alliance?.scheduled_time || "",
        partner_id: caseValue.alliance?.partner_id || "",
        partner_name: caseValue.alliance?.partner_name || "",
        partner_address: caseValue.alliance?.partner_address || "",
        partner_district: caseValue.alliance?.partner_district || "",
        partner_email: caseValue.alliance?.partner_email || "",
        partner_phone: caseValue.alliance?.partner_phone || "",
        specialty_id: caseValue.alliance?.specialty_id || "",
        specialty_name: caseValue.alliance?.specialty_name || "",
        qualification_id: caseValue.alliance?.qualification_id || null,
        qualification_name: caseValue.alliance?.qualification_name || "",
        comment: caseValue.alliance?.comment || "",
      },
      user_id: user?.id ?? "",
    });
    router.push("/assistance/case");
  };
  const sendCancel = (e: boolean) => {
    caseUpsert({
      ...caseValue,
      alliance: {
        completed: confirmVisit,
        confirmed: confirmHour,
        cancel: e,
        scheduled_date: caseValue.alliance?.scheduled_date || "",
        scheduled_time: caseValue.alliance?.scheduled_time || "",
        partner_id: caseValue.alliance?.partner_id || "",
        partner_name: caseValue.alliance?.partner_name || "",
        partner_address: caseValue.alliance?.partner_address || "",
        partner_district: caseValue.alliance?.partner_district || "",
        partner_email: caseValue.alliance?.partner_email || "",
        partner_phone: caseValue.alliance?.partner_phone || "",
        specialty_id: caseValue.alliance?.specialty_id || "",
        specialty_name: caseValue.alliance?.specialty_name || "",
        qualification_id: caseValue.alliance?.qualification_id || null,
        qualification_name: caseValue.alliance?.qualification_name || "",
        comment: caseValue.alliance?.comment || "",
      },
      user_id: user?.id ?? "",
    });
    router.push(`/assistance/case/anulled_alliance/${caseValue.case_id}`);
  };
  const handleChangeCost = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
      cost: {
        amount: caseValue.cost?.amount || 0,
        extra: caseValue.cost?.extra || 0,
        comment: caseValue.cost?.comment || "",
        [id]: value,
      },
    });
  };

  const checkCompleteFields = () => {
    if (
      caseValue.alliance &&
      caseValue.alliance.partner_id !== "" &&
      caseValue.alliance.specialty_id !== "" &&
      caseValue.alliance.scheduled_date !== "" &&
      caseValue.alliance.scheduled_time !== ""
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsEnabledSave(checkCompleteFields());
  }, [caseValue, setIsEnabledSave]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (caseValue) {
      const applicant =
        caseValue?.type === "I"
          ? caseValue?.insured
          : caseValue?.type === "C"
          ? caseValue?.beneficiary &&
            Object.keys(caseValue.beneficiary).length > 0 &&
            caseValue.beneficiary.name !== ""
            ? caseValue?.beneficiary
            : caseValue?.insured
          : caseValue?.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, [caseValue.insured, caseValue.beneficiary, setIsEnabledSave]);

  useEffect(() => {
    getById(caseId.assistance.id);
    if (caseId.alliance) {
      setConfirmHour(caseId.alliance.confirmed);
      setConfirmVisit(caseId.alliance.completed);
      setCancel(caseId.alliance.cancel);
    }
  }, [caseId]);

  useEffect(() => {
    if (assistance.id) {
      getPartnersByAssistanceId(assistance?.id);
    }
  }, [assistance?.id]);

  useEffect(() => {
    if (router.query.id) {
      getCaseById(router.query.id as string);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (caseValue.assistance && caseValue.alliance?.partner_id) {
      getSpecialitiesByPartner(
        caseValue.alliance?.partner_id,
        caseValue.assistance.id
      );
    }
  }, [caseValue.assistance, caseValue.alliance?.partner_id]);
  return (
    <ContentCell gap="20px">
      <ContentCell gap="5px">
        {caseValue.retail?.rut !== caseValue.customer.rut && (
          <InputText
            id="retail"
            label="Origen"
            type="text"
            value={caseValue ? caseValue.retail?.name || "" : ""}
            width="530px"
            disabled={true}
          />
        )}
        {caseValue.type === "C" &&
          caseValue.insured.rut !== caseValue.customer.rut && (
            <InputText
              id="insured"
              label="Titular"
              type="text"
              value={
                caseValue
                  ? `${caseValue?.insured?.name} ${caseValue?.insured?.paternalLastName} ${caseValue?.insured?.maternalLastName}` ||
                    ""
                  : ""
              }
              width="530px"
              disabled={itWasFound}
            />
          )}
        {caseValue.type != "B" && (
          <InputText
            label="Beneficiario"
            type="text"
            value={
              caseValue
                ? `${applicant?.name} ${applicant?.paternalLastName} ${applicant?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
          />
        )}
        {caseValue.type === "B" && (
          <InputText
            id="insured"
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue?.insured?.name} ${caseValue?.insured?.paternalLastName} ${caseValue?.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue.type === "B" && (
          <InputText
            label="Beneficiario"
            type="text"
            value={
              caseValue
                ? `${caseValue?.beneficiary?.name} ${caseValue?.beneficiary?.paternalLastName} ${caseValue?.beneficiary?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
          />
        )}
      </ContentCell>
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          {caseValue.case_id !== "" && (
            <Fragment>
              <InputText
                id="product"
                label="Producto"
                type="text"
                value={caseValue.product.name}
                width="530px"
                disabled={itWasFound}
              />
              <InputText
                id="assistance"
                label="Asistencia"
                type="text"
                value={caseValue.assistance.name}
                width="530px"
                disabled={itWasFound}
              />
            </Fragment>
          )}{" "}
        </ContentCell>
        <ContentCell gap="5px">
          <ContentCell gap="5px">
            <InputText
              value="Designación de alianza"
              label="Procedimiento"
              disabled={true}
            />
          </ContentCell>
          {caseId?.alliance === null ? (
            <>
              <ContentRow gap="5px">
                <ComboBox
                  label="Alianza"
                  placeHolder="Seleccione alianza"
                  data={partnerList}
                  id="partner_id"
                  width="530px"
                  value={caseValue.alliance?.partner_id ?? ""}
                  onChange={handleChange}
                  dataText="name"
                  dataValue="id"
                  enabled={confirmHour === false}
                />
              </ContentRow>
              <ComboBox
                label="Especialidad"
                placeHolder="Seleccione especialidad"
                data={specialties ?? []}
                width="530px"
                id="specialty_id"
                value={caseValue.alliance?.specialty_id ?? ""}
                onChange={handleChange}
                dataText={"specialty_name"}
                dataValue={"specialty_id"}
                enabled={confirmHour === false}
              />
            </>
          ) : (
            <>
              <InputText
                label="Alianza"
                value={caseValue?.alliance?.partner_name ?? ""}
                type="text"
                width="530px"
                disabled={true}
              />
              <InputText
                label="Especialidad"
                value={caseValue?.alliance?.specialty_name ?? ""}
                type="text"
                width="530px"
                disabled={true}
              />
              <ContentRow
                className="flex flex-row items-center justify-between"
                gap="5px"
              ></ContentRow>
            </>
          )}
          {caseValue.alliance?.partner_district && (
            <>
              <InputText
                label="Districto alianza"
                value={caseValue.alliance.partner_district ?? ""}
                type="text"
                disabled={true}
                width="530px"
              />
              <InputText
                label="Direccion alianza"
                value={caseValue.alliance.partner_address ?? ""}
                type="text"
                disabled={true}
                width="530px"
              />
              <ContentRow gap="5px">
                <InputText
                  label="Email alianza"
                  value={caseValue.alliance.partner_email ?? ""}
                  type="text"
                  disabled={true}
                  width="262px"
                />
                <InputText
                  label="Telefono alianza"
                  value={caseValue.alliance.partner_phone ?? ""}
                  type="text"
                  disabled={true}
                  width="262px"
                />
              </ContentRow>
            </>
          )}
          <ContentRow
            gap="5px"
            className="flex flex-row items-center justify-between "
          >
            <ContentRow gap="5px">
              <InputText
                label="Fecha de visita"
                type="date"
                width="160px"
                minDate={minDate?.toISOString().split("T")[0]}
                value={caseValue?.alliance?.scheduled_date ?? ""}
                onChange={handleChange}
                id="scheduled_date"
                disabled={caseValue?.alliance?.confirmed}
              />
              <InputText
                label="Hora de visita"
                type="time"
                width="100px"
                value={caseValue?.alliance?.scheduled_time ?? ""}
                onChange={handleChange}
                minTime="09:00"
                maxTime="20:00"
                id="scheduled_time"
                disabled={caseValue?.alliance?.confirmed}
              />
            </ContentRow>
            {caseId?.alliance && caseId?.alliance?.confirmed === false && (
              <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                <p
                  onClick={() => {
                    sendConfirmation(true);
                  }}
                  className="cursor-pointer  font-semibold text-blue-500"
                >
                  Confirmar
                </p>{" "}
                <p
                  className="cursor-pointer  font-semibold text-blue-500"
                  onClick={() => {
                    sendCancel(true);
                  }}
                >
                  Anular
                </p>
              </div>
            )}
            {caseId?.alliance?.confirmed === true &&
              caseId?.alliance?.completed === false && (
                <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                  <p
                    onClick={() => {
                      sendConfirmationVisit(true);
                    }}
                    className="cursor-pointer  font-semibold text-blue-500"
                  >
                    Realizada
                  </p>{" "}
                  <p
                    className="cursor-pointer  font-semibold text-blue-500"
                    onClick={() => {
                      sendCancel(true);
                    }}
                  >
                    No Realizada
                  </p>
                </div>
              )}
          </ContentRow>
          {caseId.alliance?.completed === true && (
            <>
              <ComboBox
                label="Calificación"
                placeHolder="Seleccione calificación"
                data={qualificationList || []}
                width="530px"
                value={caseValue.alliance?.qualification_id ?? ""}
                onChange={handleChange}
                dataText="name"
                dataValue="id"
                id="qualification_id"
              />
              <TextArea
                value={caseValue.alliance?.comment ?? ""}
                onChange={handleChange}
                label="Descripcion del evento"
                width="530px"
                height="110px"
                id="comment"
              />
            </>
          )}
        </ContentCell>
        {caseId.alliance?.completed === true && (
          <>
            <ContentCell gap="5px">
              <ContentRow className="flex flex-row justify-between">
                {caseId?.cost?.amount && caseId.cost?.amount !== 0 ? (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue.cost?.amount ?? 0).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                    type="text"
                    width="120px"
                    disabled
                  />
                ) : (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue?.cost?.amount ?? "").toString()}
                    type="text"
                    width="120px"
                    id="amount"
                    onChange={handleChangeCost}
                  />
                )}
                {caseId?.cost?.extra && caseId.cost?.extra !== 0 ? (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra ?? 0).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                    type="text"
                    width="120px"
                    disabled
                  />
                ) : (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra ?? "").toString()}
                    type="text"
                    width="120px"
                    id="extra"
                    onChange={handleChangeCost}
                  />
                )}
              </ContentRow>
              <TextArea
                value={caseValue.cost?.comment ?? ""}
                onChange={handleChangeCost}
                label="Justificación"
                width="530px"
                height="110px"
                id="comment"
              />
            </ContentCell>
          </>
        )}
      </ContentCell>
    </ContentCell>
  );
};

export default CaseAlliance;
