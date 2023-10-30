import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import { useDistrict } from "~/hooks";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";
import CaseDocumentsTable from "../../Case/CaseDocumentsTable";
import { useToast } from "~/components/ui/use-toast";
import { useQueryCase } from "~/hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import TextArea from "~/components/ui/TextArea/TextArea";
import { usePartner } from "~/store/hooks";
import { useQualification } from "~/store/hooks";

interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseAlliance = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase } = useCase();
  const queryClient = useQueryClient();
  const { list: districtList } = useDistrict();
  const { partnerList } = usePartner();
  const { qualificationList } = useQualification();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);
  const { toast } = useToast();

  const minDate = new Date();
  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    console.log(value);
    switch (id) {
      default:
        setCase({
          ...caseValue,
          assistance: { [id]: value },
        });
        return;
    }
  };
  useEffect(() => {
    if (caseValue) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, []);
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
            disabled={itWasFound}
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            id="customer"
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue.type === "C" && (
          <InputText
            id="insured"
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue.insured?.name} ${caseValue.insured?.paternalLastName} ${caseValue.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
            disabled={itWasFound}
          />
        )}
        <InputText
          id="applicant"
          label="Beneficiario"
          type="text"
          value={
            caseValue
              ? `${applicant?.name} ${applicant?.paternalLastName} ${applicant?.maternalLastName}` ||
                ""
              : ""
          }
          width="530px"
          disabled={itWasFound}
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
            <ContentRow gap="5px">
              <ComboBox
                label="Comuna de atención"
                placeHolder="Seleccione comuna"
                value={caseValue?.event?.location ?? ""}
                data={districtList}
                onChange={handleChange}
                width="525px"
                dataText="district_name"
                dataValue="id"
              />
              {partnerList?.length > 0 && (
                <ComboBox
                  label="Especialista"
                  placeHolder="Seleccione especialista"
                  data={partnerList}
                  width="525px"
                  value={caseValue.alliance?.partner_name ?? ""}
                  onChange={handleChange}
                  dataText="name"
                  dataValue="id"
                />
              )}
            </ContentRow>
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
                minDate={minDate.toISOString().split("T")[0]}
                value={caseValue?.alliance?.scheduled_date ?? ""}
                onChange={handleChange}
              />
              <InputText
                label="Hora de visita"
                type="time"
                width="100px"
                value={caseValue?.alliance?.scheduled_time ?? ""}
                onChange={handleChange}
                minTime="09:00"
                maxTime="20:00"
              />
            </ContentRow>
            {caseValue.alliance?.confirmed === false && (
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
            {caseValue.alliance?.completed === false &&
              caseValue.alliance.confirmed === false && (
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
          {caseValue.alliance?.completed === false ? (
            <TextArea
              value={caseValue?.refund?.comment ?? ""}
              onChange={handleChange}
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
                value={caseValue.alliance?.qualification_name ?? ""}
                onChange={handleChange}
                dataText="name"
                dataValue="id"
              />
              <TextArea
                value={caseValue.refund?.comment ?? ""}
                onChange={handleChange}
                label="Descripcion del evento"
                width="525px"
                height="110px"
              />
            </>
          )}
        </ContentCell>
        {caseValue.assistance?.assigned.amount &&
          caseValue.alliance?.completed === true && (
            <>
              <ContentCell gap="5px">
                <ContentRow className="flex flex-row justify-between">
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
                    value={(caseValue.assistance?.assigned?.amount).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                    type="text"
                    width="120px"
                    onChange={handleChange}
                  />
                </ContentRow>
                <TextArea
                  value={caseValue.alliance?.comment ?? ""}
                  onChange={handleChange}
                  label="Justificación"
                  width="525px"
                  height="110px"
                />
              </ContentCell>
            </>
          )}
      </ContentCell>
    </ContentCell>
  );
};

export default CaseAlliance;
