import { useEffect } from "react";

import { ContentCell, ContentRow } from "../../layout/Content";

import InputText from "../../ui/InputText";
import ComboBox from "../../ui/ComboBox";

import { unFormatRut, formatRut } from "../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import styles from "./Insured.module.scss";

import { useDistrict, useInsured } from "../../../hooks";

type ValueT = {
  value: string;
  isValid: boolean;
};

type InsuredFormT = {
  rut: ValueT;
  birthDate: ValueT;
  name: ValueT;
  paternalLastName: ValueT;
  maternalLastName: ValueT;
  address: ValueT;
  district: ValueT;
  email: ValueT;
  phone: ValueT;
};

type InsuredT = {
  insuredForm: InsuredFormT;
  setInsuredForm: any;
  disabled: boolean;
};

const InsuredForm = ({ insuredForm, setInsuredForm, disabled }: InsuredT) => {
  const { list } = useDistrict();
  const { getInsuredByRut, insured } = useInsured();

  const initialDataInsured = {
    birthDate: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
  };

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setInsuredForm({
      ...insuredForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          unFormatRut(event.target.value).length > 7 &&
          rutValidate(unFormatRut(event.target.value)),
      },
    });
    getInsuredByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setInsuredForm({
      ...initialDataInsured,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(event.target.value) &&
          event.target.value.length > 7 &&
          rutValidate(event.target.value),
      },
    });
  };

  const handleChangeBirthDate = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeName = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setInsuredForm({
        ...insuredForm,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (insured.rut !== "") {
      setInsuredForm({
        rut: { value: insured.rut, isValid: true },
        birthDate: { value: insured.birthDate.split("T")[0], isValid: true },
        name: { value: insured.name, isValid: true },
        paternalLastName: {
          value: insured.paternalLastName,
          isValid: true,
        },
        maternalLastName: { value: insured.maternalLastName, isValid: true },
        address: { value: insured.address, isValid: true },
        district: { value: insured.district, isValid: true },
        email: { value: insured.email, isValid: true },
        phone: { value: insured.phone, isValid: true },
      });
    }
  }, [insured]);

  return (
    <ContentCell className={styles.contentCellForm} gap="5px">
      <ContentRow gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={insuredForm?.rut.value}
          onChange={handleChangeRut}
          isValid={insuredForm?.rut.isValid}
          disabled={disabled}
        />
        <InputText
          label="Fecha de nacimiento"
          type="date"
          width="100%"
          maxLength={10}
          value={insuredForm?.birthDate.value}
          onChange={handleChangeBirthDate}
          isValid={insuredForm?.birthDate.isValid}
          disabled={disabled}
        />
      </ContentRow>
      <InputText
        label="Razón Social"
        width="100%"
        maxLength={50}
        value={insuredForm?.name.value}
        onChange={handleChangeName}
        disabled={disabled}
      />
      <InputText
        label="Representante Legal"
        width="100%"
        maxLength={50}
        value={insuredForm?.paternalLastName.value}
        onChange={handleChangePaternalLastName}
        disabled={disabled}
      />
      <InputText
        label="Giro"
        width="100%"
        maxLength={50}
        value={insuredForm?.maternalLastName.value}
        onChange={handleChangeLine}
        disabled={disabled}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={insuredForm?.address.value}
        onChange={handleChangeAddress}
        disabled={disabled}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={insuredForm?.district.value}
        onChange={handleChangeDistrict}
        placeHolder=":: Seleccione comuna ::"
        data={list}
        dataValue="district_name"
        dataText="district_name"
      />
      <ContentRow gap="5px">
        <InputText
          label="Correo"
          width="100%"
          type="email"
          maxLength={250}
          value={insuredForm?.email.value}
          onChange={handleChangeEmail}
          isValid={insuredForm?.email.isValid}
          disabled={disabled}
        />
        <InputText
          label="Teléfono"
          width="100%"
          type="tel"
          maxLength={9}
          value={insuredForm?.phone.value}
          onChange={handleChangePhone}
          isValid={insuredForm?.phone.isValid}
          disabled={disabled}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default InsuredForm;
