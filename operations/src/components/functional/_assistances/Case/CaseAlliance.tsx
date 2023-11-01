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
interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseAlliance = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase, getById: getCaseById, caseId } = useCase();
  const { partnerList, getPartnersByAssistanceId } = usePartner();
  const { qualificationList, getAll } = useQualification();
  const { assistance, getById } = useAssistance();
  const { specialties, getByFamilyId } = useSpecialty();
  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);

  const minDate = new Date();
  const router = useRouter();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;

    setCase({
      ...caseValue,
      alliance: {
        completed: confirmVisit,
        confirmed: confirmHour,
        scheduled_date: caseValue.alliance?.scheduled_date || "",
        scheduled_time: caseValue.alliance?.scheduled_time || "",
        partner_id: caseValue.alliance?.partner_id || "",
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
  useEffect(() => {
    getAll();
    if (caseValue) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, []);
  useEffect(() => {
    getById(caseValue.assistance.id);
    if (caseValue.alliance) {
      setConfirmHour(caseValue.alliance.confirmed);
      setConfirmVisit(caseValue.alliance.completed);
    }
  }, [caseValue]);

  useEffect(() => {
    if (assistance.family?.id) {
      getByFamilyId(assistance.family?.id);
    }
    if (assistance.id) {
      getPartnersByAssistanceId(assistance?.id);
    }
  }, [assistance]);

  useEffect(() => {
    if (router.query.id) {
      getCaseById(router.query.id as string);
    }
  }, [router.query.id]);

  const partner = partnerList.find(
    (partner) => partner?.id === caseValue.alliance?.partner_id
  );
  console.log(confirmHour);
  console.log(caseValue);
  return (
    <ContentCell gap="20px">
      <ContentCell gap="5px">
        {caseValue.retail?.rut !== caseValue.customer.rut && (
          <InputText
            id="retail"
            label="Empresa"
            type="text"
            value={caseValue ? caseValue.retail?.name || "" : ""}
            width="530px"
            disabled={true}
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            id="customer"
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
            disabled={true}
          />
        )}
        {caseValue.type === "C" && (
          <InputText
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue.insured?.name} ${caseValue.insured?.paternalLastName} ${caseValue.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
            disabled={true}
          />
        )}
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
          disabled={true}
        />
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
          {caseValue.specialist === null ? (
            <>
              <ContentRow gap="5px">
                {partnerList?.length > 0 ? (
                  <ComboBox
                    label="Alianza"
                    placeHolder="Seleccione alianza"
                    data={partnerList}
                    id="partner_id"
                    width="525px"
                    value={caseValue.alliance?.partner_id ?? ""}
                    onChange={handleChange}
                    dataText="name"
                    dataValue="id"
                    enabled={confirmHour === false}
                  />
                ) : (
                  <p className="font-bold text-red-500">Sin alianzas</p>
                )}
              </ContentRow>
              {specialties?.length > 0 ? (
                <ComboBox
                  label="Especialidad"
                  placeHolder="Seleccione especialidad"
                  data={specialties ?? []}
                  width="525px"
                  id="specialty_id"
                  value={caseValue.alliance?.specialty_id ?? ""}
                  onChange={handleChange}
                  dataText="name"
                  dataValue="id"
                  enabled={confirmHour === false}
                />
              ) : (
                <p className="font-bold text-red-500">Sin especialidades</p>
              )}
            </>
          ) : (
            <>
              <InputText
                label="Alianza"
                value={caseValue?.alliance?.partner_name ?? ""}
                type="text"
                disabled={true}
              />
              <InputText
                label="Especialidad"
                value={caseValue?.alliance?.specialty_name ?? ""}
                type="text"
                disabled={true}
              />
              <ContentRow
                className="flex flex-row items-center justify-between"
                gap="5px"
              ></ContentRow>
            </>
          )}
          {caseValue.alliance?.partner_id && (
            <ContentRow gap="5px">
              <InputText
                label="Districto alianza"
                value={partner?.district ?? ""}
                type="text"
                disabled={true}
                width="260px"
              />
              <InputText
                label="Direccion alianza"
                value={partner?.address ?? ""}
                type="text"
                disabled={true}
                width="260px"
              />
            </ContentRow>
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
            {caseId.alliance && (
              <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                <label className={`cursor-pointer  text-blue-500 `}>
                  <input
                    type="radio"
                    name="confirmRadio"
                    value={confirmHour === false ? "false" : "true"}
                    id="confirmed"
                    hidden
                    onChange={handleChange}
                    onClick={() => setConfirmHour(true)}
                  />
                  Confirmar
                </label>
                <label className={`cursor-pointer text-blue-500 `}>
                  <input
                    type="radio"
                    hidden
                    name="confirmRadio"
                    id="confirmed"
                    value={confirmHour === true ? "true" : "false"}
                    onChange={handleChange}
                    onClick={() => setConfirmHour(false)}
                  />
                  Anular
                </label>
              </div>
            )}
            {caseId.alliance?.confirmed === true && (
              <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                <label className={`cursor-pointer  text-blue-500 `}>
                  <input
                    type="radio"
                    name="confirmRadio"
                    value={"true"}
                    id="completed"
                    hidden
                    onChange={handleChange}
                    onClick={() => setConfirmVisit(true)}
                  />
                  Realizada
                </label>
                <label className={`cursor-pointer text-blue-500 `}>
                  <input
                    type="radio"
                    hidden
                    name="confirmRadio"
                    id="completed"
                    value={"true"}
                    onChange={handleChange}
                    onClick={() => setConfirmVisit(false)}
                  />
                  No Realizada
                </label>
              </div>
            )}
          </ContentRow>
          {caseId.alliance?.completed === true && (
            <>
              <ComboBox
                label="Calificación"
                placeHolder="Seleccione calificación"
                data={qualificationList || []}
                width="525px"
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
                width="525px"
                height="110px"
                id="comment"
              />
            </>
          )}
        </ContentCell>
        {confirmVisit === true && (
          <>
            <ContentCell gap="5px">
              <ContentRow className="flex flex-row justify-between">
                {caseValue?.cost?.amount && caseValue.cost?.amount !== 0 ? (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue.cost?.amount).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                    type="text"
                    width="120px"
                    disabled
                  />
                ) : (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue?.cost?.amount ?? "").toString()}
                    type="number"
                    width="120px"
                    id="amount"
                    onChange={handleChangeCost}
                  />
                )}
                {caseValue?.cost?.extra && caseValue.cost?.extra !== 0 ? (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
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
                width="525px"
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
