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

const CaseClosed = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
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
    getAll();
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
            label="Origen"
            type="text"
            value={caseValue ? caseValue.retail?.name || "" : ""}
            width="530px"
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut &&
          caseValue.type !== "C" && (
            <InputText
              id="customer"
              label="Titular"
              type="text"
              value={caseValue ? caseValue.customer?.name || "" : ""}
              width="530px"
            />
          )}
        {caseValue.type === "C" &&
          caseValue.insured.rut !== caseValue.customer.rut && (
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
        {caseValue?.event?.date && (
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputText
                label="Fecha del evento"
                value={(caseValue?.event?.date || "").split("T")[0] || ""}
                id="date"
                type="date"
                width="234px"
                onChange={handleChange}
                maxTime={minDate?.toISOString().split("T")[0]}
                disabled={
                  caseId?.event?.date !== null &&
                  user?.publicMetadata.roles?.operaciones !== "admin"
                }
                timeFormat=""
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
                enabled={false}
              />
            </ContentRow>

            <ComboBox
              label="Procedimiento"
              id="procedure_id"
              placeHolder="Seleccione el procedimiento"
              width="530px"
              value={caseValue.procedure_id ?? ""}
              onChange={handleChange}
              data={procedureList}
              dataText="name"
              dataValue="id"
              enabled={false}
            />
          </ContentCell>
        )}
        {caseValue.specialist?.specialist_name &&
          caseValue.specialist.specialty_name && (
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Especialista"
                  value={caseValue?.specialist?.specialist_name ?? ""}
                  type="text"
                  disabled={true}
                  width="260px"
                />
                <InputText
                  label="Especialidad"
                  value={caseValue?.specialist?.specialty_name ?? ""}
                  type="text"
                  disabled={true}
                  width="260px"
                />
              </ContentRow>
            </ContentCell>
          )}
        {caseValue.specialist?.scheduled_date &&
          caseValue.specialist.scheduled_time && (
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="160px"
                  minDate={minDate?.toISOString().split("T")[0]}
                  value={caseValue?.specialist?.scheduled_date ?? ""}
                  id="scheduled_date"
                  disabled={true}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="100px"
                  value={caseValue?.specialist?.scheduled_time ?? ""}
                  minTime="09:00"
                  maxTime="20:00"
                  id="scheduled_time"
                  disabled={true}
                />
              </ContentRow>
            </ContentCell>
          )}
        {caseValue.alliance?.partner_name &&
          caseValue.alliance.specialty_name && (
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Alianza"
                  value={caseValue?.alliance?.partner_name ?? ""}
                  type="text"
                  width="260px"
                  disabled={true}
                />
                <InputText
                  label="Especialidad"
                  value={caseValue?.alliance?.specialty_name ?? ""}
                  type="text"
                  width="260px"
                  disabled={true}
                />
              </ContentRow>
            </ContentCell>
          )}
        {caseValue.alliance?.scheduled_date &&
          caseValue.alliance.scheduled_time && (
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Fecha de visita"
                  type="date"
                  width="160px"
                  minDate={minDate?.toISOString().split("T")[0]}
                  value={caseValue?.alliance?.scheduled_date ?? ""}
                  id="scheduled_date"
                  disabled={true}
                />
                <InputText
                  label="Hora de visita"
                  type="time"
                  width="100px"
                  value={caseValue?.alliance?.scheduled_time ?? ""}
                  minTime="09:00"
                  maxTime="20:00"
                  id="scheduled_time"
                  disabled={true}
                />
              </ContentRow>
            </ContentCell>
          )}
        {caseValue.refund?.amount.required && (
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputText
                label="Monto solicitado ($)"
                value={caseValue?.refund?.amount.required.toLocaleString(
                  "es-CL",
                  {
                    style: "currency",
                    currency: "CLP",
                  }
                )}
                type="text"
                width="190px"
                disabled={true}
              />
            </ContentRow>
          </ContentCell>
        )}
        {caseValue.refund?.amount.refunded && (
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputText
                label="Monto reembolsado ($)"
                value={caseValue?.refund?.amount.refunded.toLocaleString(
                  "es-CL",
                  {
                    style: "currency",
                    currency: "CLP",
                  }
                )}
                type="text"
                width="190px"
                disabled={true}
              />
            </ContentRow>
          </ContentCell>
        )}
        {caseValue?.refund?.imed.required && (
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputText
                label="Monto solicitado ($)"
                value={caseValue?.refund?.imed.required.toLocaleString(
                  "es-CL",
                  {
                    style: "currency",
                    currency: "CLP",
                  }
                )}
                type="text"
                width="190px"
                disabled={true}
              />
            </ContentRow>
          </ContentCell>
        )}
        {caseValue.refund?.imed.refunded && (
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputText
                label="Monto reembolsado ($)"
                value={caseValue?.refund?.imed?.refunded?.toLocaleString(
                  "es-CL",
                  {
                    style: "currency",
                    currency: "CLP",
                  }
                )}
                type="text"
                width="190px"
                disabled={true}
              />
            </ContentRow>
          </ContentCell>
        )}
        <TextArea
          id="description"
          value={caseValue?.status?.description || ""}
          onChange={handleChange}
          label="Motivo de cierre"
          width="530px"
          height="110px"
          disabled={true}
        />
      </ContentCell>
    </ContentCell>
  );
};

export default CaseClosed;
