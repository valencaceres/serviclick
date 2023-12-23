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

const CaseImed = ({ setIsEnabledSave, itWasFound }: ICaseProductProps) => {
  const router = useRouter();
  const {
    caseValue,
    setCase,
    getById: getCaseByid,
    caseId,
    ufValue,
    getUfValue,
  } = useCase();
  const { user } = useUser();

  const [applicant, setApplicant] = useState<IApplicant>();

  const valueInChileanCurrency =
    caseValue?.assistance.assigned.currency === "U"
      ? Number(ufValue?.uf) * caseValue.assistance.assigned.amount
      : null;

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    const numericValue = parseFloat(value);

    const isNumeric = !isNaN(numericValue);

    setCase({
      ...caseValue,
      user_id: user?.id || "",
      refund: {
        amount: {
          refunded: caseValue?.refund?.amount.refunded || 0,
          required: caseValue?.refund?.amount.required || 0,
        },
        imed: {
          refunded: caseValue?.refund?.imed?.refunded || 0,
          required:
            id === "imed_amount" && isNumeric
              ? numericValue
              : caseValue.refund?.imed?.required || 0,
        },

        status: caseValue.refund?.status || "",
        comment: caseValue.refund?.comment || "",
      },
    });
  };

  const checkCompleteFields = () => {
    if (caseValue.refund && caseValue?.refund?.imed?.required !== 0) {
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
    if (router.query.id) {
      getCaseByid(router.query.id as string);
    }
  }, [router.query.id]);

  useEffect(() => {
    getUfValue();
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
              label={
                caseValue?.assistance.assigned.currency === "U"
                  ? "Monto Asignado en UF (UF)"
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
              value={
                caseValue.assistance.assigned.maximum.toString() ??
                "sin limited"
              }
              width="210px"
              disabled={itWasFound}
            />
          </ContentRow>
          <ContentRow gap="5px">
            {ufValue && (
              <InputText
                label={
                  caseValue?.assistance.assigned.currency === "U"
                    ? "Valor UF en pesos de la asistencia ($)"
                    : "Valor UF al dia de hoy ($)"
                }
                value={
                  caseValue?.assistance.assigned.currency === "U"
                    ? (valueInChileanCurrency ?? "").toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : (Number(ufValue?.uf) ?? "").toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                }
                type="text"
                width="530px"
                disabled={true}
              />
            )}
          </ContentRow>
          <ContentRow gap="5px">
            {caseId?.refund?.imed?.required && caseId.refund.status ? (
              <>
                <InputText
                  label="Monto solicitado ($)"
                  value={caseId?.refund?.imed?.required.toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                    }
                  )}
                  type="text"
                  width="190px"
                  disabled={true}
                  isValid={
                    Number(caseValue.refund?.imed?.required) <
                    (caseValue.assistance.assigned.currency === "U"
                      ? Number(valueInChileanCurrency)
                      : Number(caseValue.assistance.assigned.maximum))
                  }
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
                  caseValue && caseValue.refund?.imed?.required
                    ? caseValue.refund?.imed?.required.toString()
                    : ""
                }
                type="text"
                width="190px"
                id="imed_amount"
                onChange={handleChange}
                isValid={
                  Number(caseValue.refund?.imed?.required) <
                  (caseValue.assistance.assigned.currency === "U"
                    ? Number(valueInChileanCurrency)
                    : Number(caseValue.assistance.assigned.maximum))
                }
              />
            )}
          </ContentRow>
          <ContentRow gap="5px">
            {caseId?.refund?.imed.refunded && (
              <InputText
                label="Monto reembolsado ($)"
                value={caseId?.refund?.imed?.refunded.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
                type="text"
                width="190px"
                disabled={true}
                isValid={
                  Number(caseValue.refund?.imed?.required) <
                  (caseValue.assistance.assigned.currency === "U"
                    ? Number(valueInChileanCurrency)
                    : Number(caseValue.assistance.assigned.maximum))
                }
              />
            )}
            {caseId?.refund?.comment && (
              <InputText
                label="Motivo"
                value={caseId?.refund?.comment}
                type="text"
                width="335px"
                disabled={true}
              />
            )}
          </ContentRow>
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseImed;
