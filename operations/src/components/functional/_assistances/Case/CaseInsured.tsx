import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { InputText, ComboBox } from "~/components/ui";

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

interface ICaseInsuredProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseInsured = ({ setIsEnabledSave, itWasFound }: ICaseInsuredProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { setTitleUI, title } = useUI();

  const { list: districtList, listAllDistrict } = useDistrict();
  const { setCase, caseValue, getApplicantByRut, resetNoRut, reset } =
    useCase();

  const [formValues, setFormValues] = useState();
  const [isValidField, setIsValidField] = useState({
    rut: true,
    phone: true,
    email: true,
  });

  const checkCompleteFields = () => {
    if (
      caseValue.insured &&
      caseValue.insured.rut !== "" &&
      caseValue.insured.birthDate !== "" &&
      caseValue.insured.name !== "" &&
      caseValue.insured.paternalLastName !== "" &&
      caseValue.insured.maternalLastName !== "" &&
      caseValue.insured.address !== "" &&
      caseValue.insured.district !== "" &&
      caseValue.insured.email !== "" &&
      caseValue.insured.phone !== "" &&
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
        resetNoRut("insured", value, true);
        setIsValidField({ ...isValidField, [id]: isValidRut(value) });
        return;
      case "phone":
        setCase({
          ...caseValue,
          insured: { ...caseValue.insured, [id]: value },
        });
        setIsValidField({ ...isValidField, [id]: isValidPhone(value) });
        return;
      case "email":
        setCase({
          ...caseValue,
          insured: { ...caseValue.insured, [id]: value },
        });
        setIsValidField({ ...isValidField, [id]: isValidEmail(value) });
        return;
      default:
        setCase({
          ...caseValue,
          user_id: user?.id || "",
          insured: { ...caseValue.insured, [id]: value },
        });
        return;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case "rut":
        const unformattedRut = unFormatRut(value);
        setCase({
          ...caseValue,
          insured: { ...caseValue.insured, rut: unformattedRut },
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
          insured: { ...caseValue.insured, rut: formattedRut },
        });

        getApplicantByRut(formattedRut, caseValue.type, caseValue);

        return;
    }
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
          width="100px"
        />
        <InputText
          label="Fecha/hora de apertura"
          value={`${caseValue.date} ${caseValue.time}` || ""}
          type="text"
          disabled={true}
          width="200px"
        />
      </ContentRow>
      <ContentCell gap="5px">
        <ContentRow gap="5px">
          <InputText
            id="rut"
            label="Rut"
            type="text"
            value={caseValue ? caseValue.insured?.rut || "" : ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            maxLength={9}
            width="260px"
            isValid={isValidField.rut}
            disabled={itWasFound}
          />
          <InputText
            id="birthDate"
            label="Fecha de nacimiento"
            type="date"
            value={caseValue ? caseValue.insured?.birthDate || "" : ""}
            onChange={handleChange}
          />
        </ContentRow>
        <InputText
          id="name"
          label="Nombres"
          type="text"
          value={caseValue ? caseValue.insured?.name || "" : ""}
          onChange={handleChange}
        />
        <InputText
          id="paternalLastName"
          label="Apellido paterno"
          type="text"
          value={caseValue ? caseValue.insured?.paternalLastName || "" : ""}
          onChange={handleChange}
        />
        <InputText
          id="maternalLastName"
          label="Apellido materno"
          type="text"
          value={caseValue ? caseValue.insured?.maternalLastName || "" : ""}
          onChange={handleChange}
        />
        <InputText
          id="address"
          label="Direccion"
          type="text"
          value={caseValue ? caseValue.insured?.address || "" : ""}
          onChange={handleChange}
        />
        <ComboBox
          id="district"
          label="Comuna"
          value={caseValue ? caseValue.insured?.district || "" : ""}
          placeHolder=":: Seleccione una comuna ::"
          onChange={handleChange}
          width={"100%"}
          data={districtList}
          dataValue={"district_name"}
          dataText={"district_name"}
        />
        <ContentRow gap="5px">
          <ContentCell gap="5px">
            <InputText
              id="email"
              label="Correo electrónico"
              type="text"
              value={caseValue ? caseValue.insured?.email || "" : ""}
              onChange={handleChange}
              width={"100%"}
              isValid={isValidField.email}
            />
            <InputText
              id="phone"
              label="Teléfono"
              type="tel"
              value={caseValue ? caseValue.insured?.phone || "" : ""}
              onChange={handleChange}
              maxLength={9}
              width={"265px"}
              isValid={isValidField.phone}
            />
          </ContentCell>
        </ContentRow>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseInsured;
