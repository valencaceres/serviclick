import React, { useState, useEffect, Fragment } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { InputText } from "~/components/ui";

import { useCase } from "~/store/hooks";

import { IApplicant } from "../../../../interfaces/applicant";

interface ICaseProductProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseRefund = ({ setIsEnabledSave, itWasFound }: ICaseProductProps) => {
  const { caseValue, setCase } = useCase();

  const [applicant, setApplicant] = useState<IApplicant>();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    console.log(value);
    switch (id) {
      default:
        setCase({
          ...caseValue,
          refund: { [id]: value },
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
          )}
        </ContentCell>

        <ContentCell gap="5px">
          <InputText value="Reembolso" label="Procedimiento" disabled={true} />
          <ContentRow gap="5px">
            <InputText
              id="assistance"
              label="Monto autorizado ($)"
              type="text"
              value={caseValue.assistance.assigned.amount.toString()}
              width="190px"
              disabled={itWasFound}
            />
            <InputText
              id="events"
              label="Eventos"
              type="text"
              value={caseValue.assistance.assigned.events.toString()}
              width="120px"
              disabled={itWasFound}
            />
            <InputText
              id="limit"
              label="Límite"
              type="text"
              value={caseValue.assistance.assigned.maximum.toString()}
              width="210px"
              disabled={itWasFound}
            />
          </ContentRow>

          <ContentRow gap="5px">
            {caseValue?.refund?.amount && caseValue.refund.status ? (
              <>
                <InputText
                  label="Monto solicitado ($)"
                  value={(caseValue?.refund?.amount).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                  type="text"
                  width="260px"
                  disabled={true}
                />
                <InputText
                  label="Monto solicitado ($)"
                  value={caseValue?.refund?.status}
                  type="text"
                  width="260px"
                  disabled={true}
                />
              </>
            ) : (
              <InputText
                label="Monto solicitado ($)"
                value={
                  caseValue && caseValue.refund?.amount
                    ? caseValue.product.id || ""
                    : ""
                }
                type="number"
                width="260px"
                onChange={handleChange}
              />
            )}
          </ContentRow>
          {caseValue?.refund?.comment && (
            <InputText
              label="Motivo"
              value={caseValue?.refund?.comment}
              type="text"
              width="260px"
              disabled={true}
            />
          )}
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseRefund;
