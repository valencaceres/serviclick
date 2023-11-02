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

const CaseSpecialist = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase, getById: getCaseByid, caseId } = useCase();
  const { list: districtList } = useDistrict();
  const { qualificationList, getAll } = useQualification();
  const { assistance, getById } = useAssistance();
  const { specialties, getByFamilyId } = useSpecialty();
  const { getSpecialistByDistrictAndAsssitance, specialistList } =
    useSpecialist();
  const { user } = useUser();
  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);

  const router = useRouter();
  const minDate = new Date();

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    const selectedDistrict = districtList.find(
      (district) => district.district_name === e.target.value
    );
    let districtId;
    if (selectedDistrict) {
      districtId = selectedDistrict.id;
    }
    setCase({
      ...caseValue,
      user_id: user?.id || "",
      specialist: {
        completed: confirmVisit,
        confirmed: confirmHour,
        scheduled_date: caseValue.specialist?.scheduled_date || "",
        scheduled_time: caseValue.specialist?.scheduled_time || "",
        comment: caseValue.specialist?.comment || "",
        district_id: districtId || "",
        district_name: caseValue.specialist?.district_name || "",
        specialist_id: caseValue.specialist?.specialist_id || "",
        specialist_name: caseValue.specialist?.specialist_name || "",
        specialty_id: caseValue.specialist?.specialty_id || "",
        specialty_name: caseValue.specialist?.specialty_name || "",
        qualification_id: caseValue.specialist?.qualification_id || "",
        qualification_name: caseValue.specialist?.qualification_name || "",
        [id]: value,
      },
    });
  };

  const sendConfirmation = (e: boolean) => {
    setCase({
      ...caseValue,
      specialist: {
        completed: confirmVisit,
        confirmed: e,
        scheduled_date: caseValue.specialist?.scheduled_date || "",
        scheduled_time: caseValue.specialist?.scheduled_time || "",
        comment: caseValue.specialist?.comment || "",
        district_id: caseValue.specialist?.district_id || "",
        district_name: caseValue.specialist?.district_name || "",
        qualification_id: caseValue.specialist?.qualification_id || "",
        qualification_name: caseValue.specialist?.qualification_name || "",
        specialist_id: caseValue.specialist?.specialist_id || "",
        specialist_name: caseValue.specialist?.specialist_name || "",
        specialty_id: caseValue.specialist?.specialty_id || "",
        specialty_name: caseValue.specialist?.specialty_name || "",
      },
    });
  };
  const sendConfirmationVisit = (e: boolean) => {
    console.log("hgol");
    setCase({
      ...caseValue,
      specialist: {
        completed: e,
        confirmed: confirmHour,
        scheduled_date: caseValue.specialist?.scheduled_date || "",
        scheduled_time: caseValue.specialist?.scheduled_time || "",
        comment: caseValue.specialist?.comment || "",
        district_id: caseValue.specialist?.district_id || "",
        district_name: caseValue.specialist?.district_name || "",
        qualification_id: caseValue.specialist?.qualification_id || "",
        qualification_name: caseValue.specialist?.qualification_name || "",
        specialist_id: caseValue.specialist?.specialist_id || "",
        specialist_name: caseValue.specialist?.specialist_name || "",
        specialty_id: caseValue.specialist?.specialty_id || "",
        specialty_name: caseValue.specialist?.specialty_name || "",
      },
    });
  };

  const handleChangeCost = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
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
    getById(caseValue.assistance.id);
    if (caseValue.specialist) {
      setConfirmHour(caseValue.specialist.confirmed);
      setConfirmVisit(caseValue.specialist.completed);
    }
  }, [caseValue]);

  useEffect(() => {
    if (assistance.family?.id) {
      getByFamilyId(assistance.family?.id);
    }
  }, [assistance]);

  useEffect(() => {
    if (caseValue.assistance && caseValue.specialist?.district_id) {
      getSpecialistByDistrictAndAsssitance(
        caseValue.specialist?.district_id,
        caseValue.assistance.id
      );
    }
  }, [caseValue.assistance, caseValue.specialist?.district_id]);

  useEffect(() => {
    if (router.query.id) {
      getCaseByid(router.query.id as string);
    }
  }, [router.query.id]);
  console.log(caseValue);
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
          {caseValue.alliance === null ? (
            <>
              <ComboBox
                label="Comuna"
                value={
                  caseValue ? caseValue.specialist?.district_name || "" : ""
                }
                placeHolder=":: Seleccione una comuna del evento ::"
                onChange={handleChange}
                data={districtList}
                id="district_name"
                dataValue={"district_name"}
                dataText={"district_name"}
                width="535px"
              />
              <ContentRow gap="5px">
                {specialistList?.length > 0 ? (
                  <ComboBox
                    label="Especialista"
                    placeHolder="Seleccione especialista"
                    data={specialistList}
                    id="specialist_id"
                    width="525px"
                    value={caseValue.specialist?.specialist_id ?? ""}
                    onChange={handleChange}
                    dataText="name"
                    dataValue="id"
                    enabled={confirmHour === false}
                  />
                ) : (
                  <p className="font-bold text-red-500">Sin especialistas</p>
                )}
              </ContentRow>
              {specialties?.length > 0 ? (
                <ComboBox
                  label="Especialidad"
                  placeHolder="Seleccione especialidad"
                  data={specialties ?? []}
                  width="525px"
                  id="specialty_id"
                  value={caseValue.specialist?.specialty_id ?? ""}
                  onChange={handleChange}
                  dataText="name"
                  dataValue="id"
                  enabled={confirmHour === false}
                />
              ) : (
                <p className="font-bold text-red-500">Sin especialidades</p>
              )}
            </>
          ) : (
            <>
              <InputText
                label="Comuna "
                value={caseValue?.specialist?.district_name ?? ""}
                type="text"
                disabled={true}
              />
              <InputText
                label="Alianza"
                value={caseValue?.specialist?.specialist_name ?? ""}
                type="text"
                disabled={true}
              />
              <InputText
                label="Especialidad"
                value={caseValue?.specialist?.specialty_name ?? ""}
                type="text"
                disabled={true}
              />
              <ContentRow
                className="flex flex-row items-center justify-between"
                gap="5px"
              ></ContentRow>
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
                value={caseValue?.specialist?.scheduled_date ?? ""}
                onChange={handleChange}
                id="scheduled_date"
                disabled={caseValue?.specialist?.confirmed}
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
                disabled={caseValue?.specialist?.confirmed}
              />
            </ContentRow>
            {caseId?.specialist && caseId?.specialist?.confirmed === false && (
              <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                <p
                  onClick={() => {
                    sendConfirmation(true);
                  }}
                  className="cursor-pointer  font-semibold text-blue-500"
                >
                  Confirmar
                </p>{" "}
                <p
                  className="cursor-pointer  font-semibold text-blue-500"
                  onClick={() => {
                    sendConfirmation(false);
                  }}
                >
                  Anular
                </p>
              </div>
            )}
            {caseId?.specialist?.confirmed === true &&
              caseId?.specialist?.completed === false && (
                <div className="mr-12 flex  h-6 gap-[10px] font-bold ">
                  <p
                    onClick={() => {
                      sendConfirmationVisit(true);
                    }}
                    className="cursor-pointer  font-semibold text-blue-500"
                  >
                    Realizada
                  </p>{" "}
                  <p
                    className="cursor-pointer  font-semibold text-blue-500"
                    onClick={() => {
                      sendConfirmationVisit(false);
                    }}
                  >
                    No Realizada
                  </p>
                </div>
              )}
          </ContentRow>
          {caseId.specialist?.completed === true && (
            <>
              <ComboBox
                label="Calificación"
                placeHolder="Seleccione calificación"
                data={qualificationList || []}
                width="525px"
                value={caseValue.specialist?.qualification_id ?? ""}
                onChange={handleChange}
                dataText="name"
                dataValue="id"
                id="qualification_id"
              />
              <TextArea
                value={caseValue.specialist?.comment ?? ""}
                onChange={handleChange}
                label="Descripcion del evento"
                width="525px"
                height="110px"
                id="comment"
              />
            </>
          )}
        </ContentCell>
        {caseId.specialist?.completed === true && (
          <>
            <ContentCell gap="5px">
              <ContentRow className="flex flex-row justify-between">
                {caseId?.cost?.amount && caseId.cost?.amount !== 0 ? (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue.cost?.amount ?? 0).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                    type="text"
                    width="120px"
                    disabled
                  />
                ) : (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue?.cost?.amount ?? "").toString()}
                    type="text"
                    width="120px"
                    id="amount"
                    onChange={handleChangeCost}
                  />
                )}
                {caseId?.cost?.extra && caseId.cost?.extra !== 0 ? (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra ?? 0).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                    type="text"
                    width="120px"
                    disabled
                  />
                ) : (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra ?? "").toString()}
                    type="text"
                    width="120px"
                    id="extra"
                    onChange={handleChangeCost}
                  />
                )}
              </ContentRow>
              <TextArea
                value={caseValue.cost?.comment ?? ""}
                onChange={handleChangeCost}
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

export default CaseSpecialist;
