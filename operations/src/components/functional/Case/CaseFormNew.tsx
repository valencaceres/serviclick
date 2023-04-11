import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import { unFormatRut, formatRut } from "../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import { useCase } from "../../../store/hooks/useCase";
import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { useUser } from "../../../hooks";

const CaseFormNew = ({ thisCase }: any) => {
  const router = useRouter();
  const { getBeneficiaryByRut, data, beneficiaryIsLoading } = useCase();
  const initialFormData = {
    rut: { value: "", isValid: true },
    birthDate: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSearching, setIsSearching] = useState(false);
  const [isNewBeneficiary, setIsNewBeneficiary] = useState(false);
  const [stage, setStage] = useState("");

  const { id: user_id } = useUser().user;
  const { data: stageData } = useQueryStage().useGetAll();
  const { mutate: createCase } = useQueryCase().useCreate();
  const { data: newCaseNumber } = useQueryCase().useGetNewCaseNumber();

  const handleClickNext = () => {
    createCase(
      {
        applicant: {
          type: isNewBeneficiary ? "C" : data.beneficiary.type,
          id: isNewBeneficiary ? null : data.beneficiary.id,
          rut: formData.rut.value,
          name: formData.name.value,
          paternalLastName: formData.paternalLastName.value,
          maternalLastName: formData.maternalLastName.value,
          birthDate: formData.birthDate.value,
          address: formData.address.value,
          district: formData.district.value,
          email: formData.email.value,
          phone: formData.phone.value,
        },
        number: thisCase !== null ? thisCase?.case_number : newCaseNumber,
        stage_id: stage,
        user_id: user_id,
      },
      {
        onSuccess: (response) => {
          router.push(`/case/${response.data.id}/registro de servicio`);
        },
      }
    );
  };

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const handleBlurRut = (event: any) => {
    if (
      event.target.value !== "" &&
      rutValidate(unFormatRut(event.target.value))
    ) {
      event.target.value = formatRut(event.target.value);
      setIsSearching(true);
      setFormData({
        ...formData,
        rut: {
          value: event.target.value,
          isValid: isValidRut(event.target.value),
        },
      });
      if (event.target.value !== null) {
        getBeneficiaryByRut(event.target.value);
      }
    }
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const refreshFormData = () => {
    const dateString = new Date(data.beneficiary.birthdate)
      .toISOString()
      .substring(0, 10);
    setFormData({
      rut: { value: data.beneficiary.rut, isValid: true },
      birthDate: { value: dateString, isValid: true },
      name: { value: data.beneficiary.name, isValid: true },
      paternalLastName: {
        value: data.beneficiary.paternallastname,
        isValid: true,
      },
      maternalLastName: {
        value: data.beneficiary.maternallastname,
        isValid: true,
      },
      address: { value: data.beneficiary.address, isValid: true },
      district: { value: data.beneficiary.district, isValid: true },
      email: { value: data.beneficiary.email, isValid: true },
      phone: { value: data.beneficiary.phone, isValid: true },
    });
  };

  useEffect(() => {
    console.log("data", data);
    if (data.beneficiary.rut !== "") {
      setIsSearching(false);
      setIsNewBeneficiary(false);
      setStage(stageData?.find((s: any) => s.name === "Apertura")?.id || "");
      return refreshFormData();
    }
    setIsSearching(false);
    setIsNewBeneficiary(true);
    setStage(stageData?.find((s: any) => s.name === "Contención")?.id || "");
    return setFormData({
      rut: { value: formData.rut.value, isValid: true },
      birthDate: { value: "", isValid: true },
      name: { value: "", isValid: true },
      paternalLastName: { value: "", isValid: true },
      maternalLastName: { value: "", isValid: true },
      address: { value: "", isValid: true },
      district: { value: "", isValid: true },
      email: { value: "", isValid: true },
      phone: { value: "", isValid: true },
    });
  }, [isSearching, beneficiaryIsLoading, thisCase]);

  useEffect(() => {
    if (router.pathname === "/case/new") {
      setIsNewBeneficiary(false);
      setFormData(initialFormData);
    }
  }, [router]);

  return (
    <div>
      <ContentCell gap="20px">
        <ContentRow gap="5px">
          <InputText
            label="N° Caso"
            value={
              router.pathname === "/case/new"
                ? newCaseNumber
                : thisCase?.case_number
            }
            type="text"
            disabled={true}
            width="260px"
          />
          <InputText
            label="Fecha/hora de apertura"
            value={"2021-01-01 12:00:00"}
            type="text"
            disabled={true}
            width="260px"
          />
        </ContentRow>
        {isNewBeneficiary ? (
          <ContentCell gap="2px">
            <h2 className="font-semibold text-red-500">Contención</h2>
            <p className="text-sm text-secondary-500">
              El beneficiario no existe, por favor ingrese los datos
            </p>
          </ContentCell>
        ) : null}

        <ContentCell gap="5px">
          <ContentRow gap="5px">
            <InputText
              label="Rut"
              width={"260px"}
              onFocus={handleFocusRut}
              onBlur={handleBlurRut}
              maxLength={9}
              disabled={
                thisCase?.is_active || !thisCase === true ? false : true
              }
              value={thisCase !== null ? thisCase?.rut : formData?.rut.value}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  rut: {
                    value: e.target.value,
                    isValid: isValidRut(e.target.value),
                  },
                });
              }}
              isValid={formData?.rut.isValid}
            />
            <InputText
              type="date"
              label="Fecha de nacimiento"
              width="260px"
              maxLength={10}
              disabled={
                thisCase?.is_active || !thisCase === true ? false : true
              }
              value={
                thisCase !== null
                  ? thisCase?.birthdate?.split("T")[0]
                  : formData?.birthDate.value
              }
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  birthDate: { value: e.target.value, isValid: true },
                });
              }}
              isValid={formData?.birthDate.isValid}
            />
          </ContentRow>
          <InputText
            label="Nombres"
            value={
              thisCase !== null ? thisCase?.applicant_name : formData.name.value
            }
            type="text"
            disabled={thisCase?.is_active || !thisCase === true ? false : true}
            onChange={(e: any) => {
              setFormData({
                ...formData,
                name: { value: e.target.value, isValid: true },
              });
            }}
            width="525px"
          />
          <ContentRow gap="5px">
            <InputText
              label="Apellido paterno"
              value={
                thisCase !== null
                  ? thisCase?.applicant_lastname
                  : formData.paternalLastName.value
              }
              type="text"
              disabled={
                thisCase?.is_active || !thisCase === true ? false : true
              }
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  paternalLastName: { value: e.target.value, isValid: true },
                });
              }}
              width="260px"
            />
            <InputText
              label="Apellido materno"
              value={
                thisCase !== null
                  ? thisCase?.applicant_maternallastname
                  : formData.maternalLastName.value
              }
              type="text"
              disabled={
                thisCase?.is_active || !thisCase === true ? false : true
              }
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  maternalLastName: { value: e.target.value, isValid: true },
                });
              }}
              width="260px"
            />
          </ContentRow>
          <InputText
            label="Dirección"
            value={
              thisCase !== null
                ? thisCase?.applicant_address
                : formData.address.value
            }
            type="text"
            disabled={thisCase?.is_active || !thisCase === true ? false : true}
            onChange={(e: any) => {
              setFormData({
                ...formData,
                address: { value: e.target.value, isValid: true },
              });
            }}
            width="525px"
          />
          <InputText
            label="Comuna"
            value={
              thisCase !== null
                ? thisCase?.applicant_district
                : formData.district.value
            }
            type="text"
            disabled={thisCase?.is_active || !thisCase === true ? false : true}
            onChange={(e: any) => {
              setFormData({
                ...formData,
                district: { value: e.target.value, isValid: true },
              });
            }}
            width="525px"
          />
          <ContentRow gap="5px">
            <InputText
              label="Correo electrónico"
              value={
                thisCase !== null
                  ? thisCase?.applicant_email
                  : formData.email.value
              }
              type="email"
              disabled={
                thisCase?.is_active || !thisCase === true ? false : true
              }
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  email: {
                    value: e.target.value,
                    isValid:
                      emailRegEx.test(e.target.value) || e.target.value === "",
                  },
                });
              }}
              width="260px"
              isValid={formData?.email.isValid}
            />
            <InputText
              label="Teléfono"
              value={
                thisCase !== null
                  ? thisCase?.applicant_phone
                  : formData.phone.value
              }
              type="text"
              disabled={
                thisCase?.is_active || !thisCase === true ? false : true
              }
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  phone: {
                    value: e.target.value,
                    isValid: e.target.value.length === 9,
                  },
                });
              }}
              width="260px"
              isValid={formData?.phone.isValid}
            />
          </ContentRow>
        </ContentCell>
        <Button
          text="Continuar"
          enabled={thisCase?.is_active === true || !thisCase ? true : false}
          type="button"
          onClick={handleClickNext}
        />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormNew;
