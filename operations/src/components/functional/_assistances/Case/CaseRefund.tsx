import React, { useState, useEffect, Fragment } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { InputText } from "~/components/ui";

import { useCase } from "~/store/hooks";

import { IApplicant } from "../../../../interfaces/applicant";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
interface ICaseProductProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseRefund = ({ setIsEnabledSave, itWasFound }: ICaseProductProps) => {
  const router = useRouter();

  const { caseValue, setCase, getById: getCaseByid, caseId } = useCase();
  const { user } = useUser();

  const [applicant, setApplicant] = useState<IApplicant>();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    const numericValue = parseFloat(value);

    const isNumeric = !isNaN(numericValue);

    setCase({
      ...caseValue,
      user_id: user?.id || "",
      refund: {
        amount:
          id === "amount" && isNumeric
            ? numericValue
            : caseValue.refund?.amount || 0,
        imed_amount: caseValue.refund?.imed_amount || 0,
        status: caseValue.refund?.status || "",
        comment: caseValue.refund?.comment || "",
      },
    });
  };

  const checkCompleteFields = () => {
    if (caseValue.refund && caseValue.refund.amount !== 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsEnabledSave(checkCompleteFields());
  }, [caseValue, setIsEnabledSave]);

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

  useEffect(() => {
    if (router.query.id) {
      getCaseByid(router.query.id as string);
    }
  }, [router.query.id]);

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
          )}
        </ContentCell>

        <ContentCell gap="5px">
          <InputText value="Reembolso" label="Procedimiento" disabled={true} />
          <ContentRow gap="5px">
            <InputText
              id="assistance"
              label={
                caseValue?.assistance.assigned.currency === "U"
                  ? "Monto Disponible (UF)"
                  : "Monto Disponible ($)"
              }
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
            {caseId?.refund?.amount && caseId.refund.status ? (
              <>
                <InputText
                  label="Monto solicitado ($)"
                  value={caseId?.refund?.amount?.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                  type="text"
                  width="190px"
                  disabled={true}
                />
                <InputText
                  label="Estado"
                  value={caseId?.refund?.status}
                  type="text"
                  width="335px"
                  disabled={true}
                />
              </>
            ) : (
              <InputText
                label="Monto solicitado ($)"
                value={
                  caseValue && caseValue.refund?.amount
                    ? caseValue.refund?.amount.toString()
                    : ""
                }
                id="amount"
                type="number"
                width="190px"
                onChange={handleChange}
              />
            )}
          </ContentRow>
          {caseId?.refund?.comment && (
            <InputText
              label="Motivo"
              value={caseId?.refund?.comment}
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
