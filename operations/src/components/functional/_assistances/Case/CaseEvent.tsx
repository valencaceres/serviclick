import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import TextArea from "~/components/ui/TextArea/TextArea";
import { useDistrict } from "~/hooks";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";

interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseEvent = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase } = useCase();
  const { list: districtList } = useDistrict();
  const [applicant, setApplicant] = useState<IApplicant>();
  console.log(caseValue);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
      event: {
        date: caseValue.event?.date || "",
        location: caseValue.event?.location || "",
        description: caseValue.event?.description || "",
        [id]: value,
      },
    });
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
            label="Empresa"
            type="text"
            value={caseValue ? caseValue.retail?.name || "" : ""}
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
            disabled={itWasFound}
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
            disabled={itWasFound}
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
          disabled={itWasFound}
        />
      </ContentCell>
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          {caseValue.case_id !== "" && (
            <Fragment>
              <InputText
                label="Producto"
                type="text"
                value={caseValue.product.name}
                width="530px"
                disabled={itWasFound}
              />
              <InputText
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
          <ContentRow gap="5px">
            <InputText
              label="Fecha del evento"
              value={caseValue?.event?.date || ""}
              id="date"
              type="date"
              width="234px"
              onChange={handleChange}
            />

            <ComboBox
              id="location"
              label="Comuna"
              value={caseValue ? caseValue?.event?.location || "" : ""}
              placeHolder=":: Seleccione una comuna ::"
              onChange={handleChange}
              data={districtList}
              dataValue={"district_name"}
              dataText={"district_name"}
              width="290px"
            />
          </ContentRow>
          <TextArea
            id="description"
            value={caseValue?.event?.description || ""}
            onChange={handleChange}
            label="Descripción del evento"
            width="530px"
            height="110px"
          />
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseEvent;
