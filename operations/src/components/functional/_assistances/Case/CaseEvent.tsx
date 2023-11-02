import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import TextArea from "~/components/ui/TextArea/TextArea";
import { useDistrict } from "~/hooks";
import { IApplicant } from "~/interfaces/applicant";
import { useCase, useProcedure } from "~/store/hooks";
import { useUser } from "@clerk/nextjs";
interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseEvent = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const minDate = new Date();

  const { caseValue, setCase, getById: getCaseByid, caseId } = useCase();
  const { list: districtList } = useDistrict();
  const [applicant, setApplicant] = useState<IApplicant>();
  const { procedureList, getAll } = useProcedure();
  const { user } = useUser();
  const router = useRouter();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
      user_id: user?.id || "",
      event: {
        date: caseValue.event?.date || "",
        location: caseValue.event?.location || "",
        description: caseValue.event?.description || "",
        [id]: value,
      },
      [id]: value,
    });
  };

  const checkCompleteFields = () => {
    if (
      caseValue.event &&
      caseValue.event.date !== "" &&
      caseValue.event?.description !== "" &&
      caseValue.event?.location !== "" &&
      caseValue.procedure_id !== null
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
              maxTime={minDate?.toISOString().split("T")[0]}
              disabled={caseId?.event?.date != null}
            />

            <ComboBox
              id="location"
              label="Comuna"
              value={caseValue ? caseValue?.event?.location || "" : ""}
              placeHolder=":: Seleccione una comuna ::"
              onChange={handleChange}
              data={districtList}
              dataValue={"id"}
              dataText={"district_name"}
              width="290px"
              enabled={caseId.event?.location === null}
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
          <ComboBox
            label="Procedimiento"
            id="procedure_id"
            placeHolder="Seleccione el procedimiento"
            width="525px"
            value={caseValue.procedure_id ?? ""}
            onChange={handleChange}
            data={procedureList}
            dataText="name"
            dataValue="id"
            enabled={caseId.procedure_id === null}
          />
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseEvent;
