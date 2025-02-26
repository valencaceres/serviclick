import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import { useDistrict } from "~/hooks";
import { IApplicant } from "~/interfaces/applicant";
import { useAssistance, useCase, useSpecialty } from "~/store/hooks";
import TextArea from "~/components/ui/TextArea/TextArea";
import { useSpecialist } from "~/store/hooks";
import { useQualification } from "~/store/hooks";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseNulledSpecialist = ({
  setIsEnabledSave,
  itWasFound,
}: ICaseEventProps) => {
  const router = useRouter();
  const minDate = new Date();

  const {
    caseValue,
    setCase,
    getById: getCaseByid,
    caseId,
    upsert: caseUpsert,
  } = useCase();
  const { list: districtList } = useDistrict();
  const { qualificationList, getAll } = useQualification();
  const { specialties, getSpecialitiesByAssistance } = useSpecialty();
  const { getSpecialistByDistrictAndAsssitance, specialistList } =
    useSpecialist();
  const { user } = useUser();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    let location;
    let locationValue;
    if (id === "district_id") {
      location = id;
    }
    if (value && districtList.some((district) => district.id === value)) {
      locationValue = value;
    } else {
      locationValue = caseValue.event?.location || "";
    }
    setCase({
      ...caseValue,
      user_id: user?.id || "",
      specialist: {
        completed: confirmVisit,
        confirmed: confirmHour,
        cancel: false,
        scheduled_date: caseValue.specialist?.scheduled_date || "",
        scheduled_time: caseValue.specialist?.scheduled_time || "",
        comment: caseValue.specialist?.comment || "",
        district_id: caseValue.event?.location || "",
        district_name: caseValue.specialist?.district_name || "",
        specialist_id: caseValue.specialist?.specialist_id || "",
        specialist_name: caseValue.specialist?.specialist_name || "",
        specialty_id: caseValue.specialist?.specialty_id || "",
        specialty_name: caseValue.specialist?.specialty_name || "",
        qualification_id: caseValue.specialist?.qualification_id || null,
        qualification_name: caseValue.specialist?.qualification_name || "",
        [id]: value,
      },
      event: {
        date: caseValue.event?.date || "",
        description: caseValue.event?.description || "",
        location: locationValue,
      },
    });
  };

  const sendConfirmation = (e: boolean) => {
    caseUpsert({
      ...caseValue,
      specialist: {
        completed: confirmVisit,
        confirmed: confirmHour,
        cancel: e,
        scheduled_date: caseValue.specialist?.scheduled_date || "",
        scheduled_time: caseValue.specialist?.scheduled_time || "",
        comment: caseValue.specialist?.comment || "",
        district_id: caseValue.event?.location || "",
        district_name: caseValue.specialist?.district_name || "",
        qualification_id: caseValue.specialist?.qualification_id || "",
        qualification_name: caseValue.specialist?.qualification_name || "",
        specialist_id: caseValue.specialist?.specialist_id || "",
        specialist_name: caseValue.specialist?.specialist_name || "",
        specialty_id: caseValue.specialist?.specialty_id || "",
        specialty_name: caseValue.specialist?.specialty_name || "",
      },
      user_id: user?.id ?? "",
    });
    router.push(`/assistance/case/specialist/${caseValue.case_id}`);
  };

  const checkCompleteFields = () => {
    if (
      caseValue.specialist &&
      caseValue.specialist.district_id !== "" &&
      caseValue.specialist.specialist_id !== "" &&
      caseValue.specialist.specialty_id !== "" &&
      caseValue.specialist.scheduled_date !== "" &&
      caseValue.specialist.scheduled_time !== ""
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
  }, []);

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
    if (caseValue.specialist) {
      setConfirmHour(caseValue.specialist.confirmed);
      setConfirmVisit(caseValue.specialist.completed);
      setCancel(caseValue.specialist.cancel);
    }
  }, [caseValue]);

  useEffect(() => {
    if (caseValue.assistance && caseValue.event?.location) {
      getSpecialistByDistrictAndAsssitance(
        caseValue.event.location,
        caseValue.assistance.id
      );
    }
  }, [caseValue.assistance, caseValue.event?.location]);

  useEffect(() => {
    if (caseValue.assistance && caseValue.specialist?.specialist_id) {
      getSpecialitiesByAssistance(
        caseValue.specialist?.specialist_id,
        caseValue.assistance.id
      );
    }
  }, [caseValue.assistance, caseValue.specialist?.specialist_id]);

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
          )}{" "}
        </ContentCell>
        <ContentCell gap="5px">
          <ContentCell gap="5px">
            <InputText
              value="Envio de especialista"
              label="Procedimiento"
              disabled={true}
            />
          </ContentCell>
          <ComboBox
            label="Comuna"
            value={caseValue ? caseValue.event?.location || "" : ""}
            placeHolder=":: Seleccione una comuna del evento ::"
            onChange={handleChange}
            data={districtList}
            id="district_id"
            dataValue={"id"}
            dataText={"district_name"}
            width="530px"
          />
          <ContentRow gap="5px">
            <ComboBox
              label="Especialista"
              placeHolder="Seleccione especialista"
              data={specialistList}
              id="specialist_id"
              width="530px"
              value={caseValue.specialist?.specialist_id ?? ""}
              onChange={handleChange}
              dataText={"name"}
              dataValue={"id"}
              enabled={true}
            />
          </ContentRow>
          <ComboBox
            label="Especialidad"
            placeHolder="Seleccione especialidad"
            data={specialties ?? []}
            width="530px"
            id="specialty_id"
            value={caseValue.specialist?.specialty_id ?? ""}
            onChange={handleChange}
            dataText={"specialty_name"}
            dataValue={"specialty_id"}
            enabled={true}
          />

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
                value={caseValue?.specialist?.scheduled_date ?? ""}
                onChange={handleChange}
                id="scheduled_date"
              />
              <InputText
                label="Hora de visita"
                type="time"
                width="100px"
                value={caseValue?.specialist?.scheduled_time ?? ""}
                onChange={handleChange}
                minTime="09:00"
                maxTime="20:00"
                id="scheduled_time"
              />
            </ContentRow>
            <div className=" flex   font-bold ">
              <p
                onClick={() => {
                  sendConfirmation(false);
                }}
                className="cursor-pointer text-base font-semibold text-blue-500"
              >
                Reapertura de el especialista
              </p>{" "}
            </div>
          </ContentRow>
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseNulledSpecialist;
