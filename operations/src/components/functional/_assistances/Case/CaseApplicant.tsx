import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { ContentCell, ContentRow } from "../../../layout/Content";

import {
  InputText,
  ComboBox,
  RadioButtonGroup,
  RadioButtonItem,
} from "~/components/ui";

import {
  unFormatRut,
  formatRut,
  isValidRut,
  isValidPhone,
  isValidEmail,
} from "~/utils";

import { useUI, useDistrict } from "~/hooks";
import { useCase } from "~/store/hooks";

interface IInitialValues {
  rut: string;
  birthdate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string | undefined;
  email: string;
  phone: string;
}

interface ICaseApplicantProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseApplicant = ({
  setIsEnabledSave,
  itWasFound,
}: ICaseApplicantProps) => {
  const router = useRouter();

  const { setTitleUI, title } = useUI();
  const { list: districtList, listAllDistrict } = useDistrict();
  const { setCase, caseValue, getApplicantByRut, resetNoRut, reset } =
    useCase();

  const [formValues, setFormValues] = useState();
  const [applicantType, setApplicantType] = useState<"insured" | "beneficiary">(
    "insured"
  );
  const [isValidField, setIsValidField] = useState({
    rut: true,
    phone: true,
    email: true,
  });

  const checkCompleteFields = () => {
    const applicant =
      caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
    if (
      applicant &&
      applicant.rut !== "" &&
      applicant.birthDate !== "" &&
      applicant.name !== "" &&
      applicant.paternalLastName !== "" &&
      applicant.maternalLastName !== "" &&
      applicant.address !== "" &&
      applicant.district !== "" &&
      applicant.email !== "" &&
      applicant.phone !== "" &&
      isValidField.rut &&
      isValidField.phone &&
      isValidField.email
    ) {
      return true;
    }
    return false;
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;

    switch (id) {
      case "rut":
        resetNoRut(applicantType, value);
        setIsValidField({ ...isValidField, [id]: isValidRut(value) });
        break;
      case "phone":
        setIsValidField({ ...isValidField, [id]: isValidPhone(value) });
        break;
      case "email":
        setIsValidField({ ...isValidField, [id]: isValidEmail(value) });
        break;
    }
    setCase({
      ...caseValue,
      [applicantType]: { ...caseValue[applicantType], [id]: value },
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case "rut":
        const unformattedRut = unFormatRut(value);
        setCase({
          ...caseValue,
          [applicantType]: { ...caseValue[applicantType], rut: unformattedRut },
        });
        return;
    }
  };

  const handleBlur = (e: any) => {
    const value = e.target.value;

    switch (e.target.id) {
      case "rut":
        const formattedRut = formatRut(value);
        setCase({
          ...caseValue,
          [applicantType]: { ...caseValue[applicantType], rut: formattedRut },
        });
        getApplicantByRut(formattedRut);
        return;
    }
  };

  const handleChangeType = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value as "I" | "B" | "C";
    setCase({ ...caseValue, type: value });
  };

  useEffect(() => {
    setIsEnabledSave(checkCompleteFields());
  }, [caseValue]);

  return (
    <ContentCell gap="20px">
      <ContentRow gap="5px" align="space-between">
        <InputText
          label="N° Caso"
          value={
            caseValue.case_id !== "" ? caseValue.case_number.toString() : ""
          }
          type="text"
          disabled={true}
          width="150px"
        />
        <InputText
          label="Fecha/hora de apertura"
          value={`${caseValue.date} ${caseValue.time}` || ""}
          type="text"
          disabled={true}
          width="100%"
        />
      </ContentRow>
      <ContentCell gap="5px">
        <ContentRow gap="5px" align="space-between">
          <InputText
            id="rut"
            label="Rut"
            type="text"
            value={caseValue ? caseValue[applicantType]?.rut || "" : ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            maxLength={9}
            width="150px"
            isValid={isValidField.rut}
            disabled={itWasFound}
          />
          <InputText
            id="birthDate"
            label="Fecha de nacimiento"
            type="date"
            value={caseValue ? caseValue[applicantType]?.birthDate || "" : ""}
            onChange={handleChange}
            width="150px"
          />
        </ContentRow>
        <InputText
          id="name"
          label="Nombres"
          type="text"
          value={caseValue ? caseValue[applicantType]?.name || "" : ""}
          onChange={handleChange}
          width="535px"
        />
        <InputText
          id="paternalLastName"
          label="Apellido paterno"
          type="text"
          value={
            caseValue ? caseValue[applicantType]?.paternalLastName || "" : ""
          }
          onChange={handleChange}
          width="535px"
        />
        <InputText
          id="maternalLastName"
          label="Apellido materno"
          type="text"
          value={
            caseValue ? caseValue[applicantType]?.maternalLastName || "" : ""
          }
          onChange={handleChange}
          width="535px"
        />
        <InputText
          id="address"
          label="Direccion"
          type="text"
          value={caseValue ? caseValue[applicantType]?.address || "" : ""}
          onChange={handleChange}
          width="535px"
        />
        <ComboBox
          id="district"
          label="Comuna"
          value={caseValue ? caseValue[applicantType]?.district || "" : ""}
          placeHolder=":: Seleccione una comuna ::"
          onChange={handleChange}
          data={districtList}
          dataValue={"district_name"}
          dataText={"district_name"}
          width="535px"
        />
        <ContentRow gap="5px">
          <ContentCell gap="5px">
            <InputText
              id="email"
              label="Correo electrónico"
              type="text"
              value={caseValue ? caseValue[applicantType]?.email || "" : ""}
              onChange={handleChange}
              width={"380px"}
              isValid={isValidField.email}
            />
            <InputText
              id="phone"
              label="Teléfono"
              type="tel"
              value={caseValue ? caseValue[applicantType]?.phone || "" : ""}
              onChange={handleChange}
              maxLength={9}
              width={"380px"}
              isValid={isValidField.phone}
            />
          </ContentCell>
          <RadioButtonGroup label="Tipo" width="150px">
            <RadioButtonItem
              label="Titular"
              checked={caseValue.type === "I"}
              name={caseValue.type}
              value="I"
              onChange={handleChangeType}
            />
            <RadioButtonItem
              label="Carga"
              checked={caseValue.type === "B"}
              name={caseValue.type}
              value="B"
              onChange={handleChangeType}
            />
          </RadioButtonGroup>
        </ContentRow>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseApplicant;
