import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";
import { useToast } from "~/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import TextArea from "~/components/ui/TextArea/TextArea";
import { usePartner } from "~/store/hooks";
import { useQualification } from "~/store/hooks";
import useSpecialty from "~/store/hooks/useSpecialty";
interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseAlliance = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase } = useCase();
  const { partnerList, getPartnersBySpecialtyId } = usePartner();
  const { qualificationList, getAll } = useQualification();
  const { getAll: getSpecialties, specialtyList } = useSpecialty();
  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);
  const [specialtyId, setSpecialtyId] = useState<string>("");

  const minDate = new Date();
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
        qualification_id: caseValue.alliance?.qualification_id || "",
        qualification_name: caseValue.alliance?.qualification_name || "",
        comment: caseValue.alliance?.comment || "",
        [id]: value,
      },
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
    getSpecialties();
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
    if (caseValue.alliance) {
      setConfirmHour(caseValue.alliance.confirmed);
      setConfirmVisit(caseValue.alliance.completed);
    }
  }, [caseValue]);

  useEffect(() => {
    if (specialtyId) {
      getPartnersBySpecialtyId(specialtyId);
    }
  }, [specialtyId]);

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
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            id="customer"
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
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
              <ComboBox
                label="Especialidad"
                placeHolder="Seleccione especialidad"
                data={specialtyList}
                width="525px"
                id="specialty_id"
                value={specialtyList
                  .map((specialty) => specialty.id)
                  .join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSpecialtyId(e.target.value)
                }
                dataText="name"
                dataValue="id"
              />
              <ContentRow gap="5px">
                {partnerList?.length > 0 && (
                  <ComboBox
                    label="Especialista"
                    placeHolder="Seleccione especialista"
                    data={partnerList}
                    id="partner_id"
                    width="525px"
                    value={caseValue.alliance?.partner_id ?? ""}
                    onChange={handleChange}
                    dataText="name"
                    dataValue="id"
                  />
                )}
              </ContentRow>
            </>
          ) : (
            <>
              <InputText
                label="Especialista"
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
              />
            </ContentRow>
            {confirmHour === false && (
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
            {confirmVisit === false && confirmHour === true && (
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
          </ContentRow>
          {confirmVisit === true && (
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
                {caseValue.cost?.amount ? (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue.cost?.amount).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                    type="text"
                    width="120px"
                  />
                ) : (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue?.cost?.amount ?? "").toString()}
                    type="number"
                    width="120px"
                    id="amount"
                    onChange={handleChange}
                  />
                )}
                {caseValue.cost?.extra ? (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue.cost?.extra).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                    type="text"
                    width="120px"
                    onChange={handleChange}
                  />
                ) : (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra ?? "").toString()}
                    type="text"
                    width="120px"
                    id="extra"
                    onChange={handleChange}
                  />
                )}
              </ContentRow>
              <TextArea
                value={caseValue.cost?.comment ?? ""}
                onChange={handleChange}
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
