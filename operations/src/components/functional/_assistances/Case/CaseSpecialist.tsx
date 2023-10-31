import React, { Fragment, useEffect, useState } from "react";
import { ContentCell, ContentRow } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import { useDistrict } from "~/hooks";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";
import TextArea from "~/components/ui/TextArea/TextArea";
import { useSpecialist } from "~/store/hooks";
import { useQualification } from "~/store/hooks";

interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseSpecialist = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase } = useCase();
  const { list: districtList } = useDistrict();
  const { specialistList, getByDistrict } = useSpecialist();
  const { qualificationList, getAll } = useQualification();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [confirmHour, setConfirmHour] = useState(false);
  const [confirmVisit, setConfirmVisit] = useState(false);
  const [district, setDistrict] = useState<string>("");

  const minDate = new Date();
  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;
    setCase({
      ...caseValue,
      specialist: {
        completed: confirmVisit,
        confirmed: confirmHour,
        scheduled_date: caseValue.specialist?.scheduled_date || "",
        scheduled_time: caseValue.specialist?.scheduled_time || "",
        comment: caseValue.specialist?.comment || "",
        district_id: caseValue.specialist?.district_id || "",
        district_name: caseValue.specialist?.district_name || "",
        specialist_id: caseValue.specialist?.specialist_id || "",
        specialist_name: caseValue.specialist?.specialist_name || "",
        specialty_id: caseValue.specialist?.specialty_id || "",
        specialty_name: caseValue.specialist?.specialty_name || "",
        qualification_id: caseValue.specialist?.qualification_id || "",
        qualification_name: caseValue.specialist?.qualification_name || "",
        [id]: value,
      },
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
    if (caseValue.specialist) {
      setConfirmHour(caseValue.specialist.confirmed);
      setConfirmVisit(caseValue.specialist.completed);
    }
  }, [caseValue]);

  useEffect(() => {
    if (district) {
      getByDistrict(district, caseValue.assistance.id);
    }
  }, [district]);

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
              value="Envio de especialista"
              label="Procedimiento"
              disabled={true}
            />
          </ContentCell>
          {caseValue.alliance === null ? (
            <>
              <ComboBox
                id="district_id"
                label="Comuna"
                value={
                  caseValue ? caseValue.specialist?.district_name || "" : ""
                }
                placeHolder=":: Seleccione una comuna ::"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDistrict(e.target.value)
                }
                data={districtList}
                dataValue={"district_name"}
                dataText={"district_name"}
                width="535px"
              />
              <ContentRow gap="5px">
                {specialistList?.length > 0 && (
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
                  />
                )}
              </ContentRow>
            </>
          ) : (
            <>
              <InputText
                label="Comuna del evento"
                value={caseValue?.specialist?.district_name ?? ""}
                type="text"
                disabled={true}
              />
              <InputText
                label="Especialista"
                value={caseValue?.specialist?.specialist_name ?? ""}
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
            {confirmHour === false && (
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
            {confirmVisit === false && confirmHour === true && (
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
          {confirmVisit === true && (
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
        {confirmVisit === true && (
          <>
            <ContentCell gap="5px">
              <ContentRow className="flex flex-row justify-between">
                {caseValue.cost?.amount ? (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue.cost?.amount).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                    type="text"
                    width="120px"
                  />
                ) : (
                  <InputText
                    label="Costo fijo ($)"
                    value={(caseValue?.cost?.amount ?? "").toString()}
                    type="number"
                    width="120px"
                    id="amount"
                    onChange={handleChange}
                  />
                )}
                {caseValue.cost?.extra ? (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue.cost?.extra).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                    type="text"
                    width="120px"
                    onChange={handleChange}
                  />
                ) : (
                  <InputText
                    label="Extra ($)"
                    value={(caseValue?.cost?.extra ?? "").toString()}
                    type="text"
                    width="120px"
                    id="extra"
                    onChange={handleChange}
                  />
                )}
              </ContentRow>
              <TextArea
                value={caseValue.cost?.comment ?? ""}
                onChange={handleChange}
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
