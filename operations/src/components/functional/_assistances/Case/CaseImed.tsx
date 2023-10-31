import React, { useState, useEffect, Fragment } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { InputText } from "~/components/ui";

import { useCase } from "~/store/hooks";

import { IApplicant } from "../../../../interfaces/applicant";

interface ICaseProductProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseImed = ({ setIsEnabledSave, itWasFound }: ICaseProductProps) => {
  const { caseValue, setCase } = useCase();

  const [applicant, setApplicant] = useState<IApplicant>();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
      refund: {
        amount: caseValue.refund?.amount || 0,
        imed_amount: caseValue.refund?.imed_amount || 0,
        status: caseValue.refund?.status || "",
        comment: caseValue.refund?.comment || "",
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
          )}
        </ContentCell>

        <ContentCell gap="5px">
          <InputText
            value="Devolución IMED"
            label="Procedimiento"
            disabled={true}
          />
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
            {caseValue?.refund?.imed_amount && caseValue.refund.status ? (
              <>
                <InputText
                  label="Monto solicitado ($)"
                  value={caseValue?.refund?.imed_amount?.toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                    }
                  )}
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
                  caseValue && caseValue.refund?.imed_amount
                    ? caseValue.refund?.imed_amount.toString()
                    : ""
                }
                id="imed_amount"
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

export default CaseImed;
