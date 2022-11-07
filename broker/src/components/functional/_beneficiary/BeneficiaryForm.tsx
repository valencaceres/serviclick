import { useEffect } from "react";

import { ContentCell, ContentRow } from "../../layout/Content";

import InputText from "../../ui/InputText";
import ComboBox from "../../ui/ComboBox";

import { unFormatRut, formatRut } from "../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import styles from "./Beneficiary.module.scss";

import { useDistrict, useBeneficiary } from "../../../hooks";

type ValueT = {
  value: string;
  isValid: boolean;
};

type BeneficiaryFormT = {
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

type BeneficiaryT = {
  beneficiaryForm: BeneficiaryFormT;
  setBeneficiaryForm: any;
  disabled: boolean;
};

const BeneficiaryForm = ({
  beneficiaryForm,
  setBeneficiaryForm,
  disabled,
}: BeneficiaryT) => {
  const { list } = useDistrict();
  const { getBeneficiaryByRut, beneficiary } = useBeneficiary();

  const initialDataBeneficiary = {
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
    setBeneficiaryForm({
      ...beneficiaryForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          unFormatRut(event.target.value).length > 7 &&
          rutValidate(unFormatRut(event.target.value)),
      },
    });
    getBeneficiaryByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setBeneficiaryForm({
      ...initialDataBeneficiary,
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
    setBeneficiaryForm({
      ...beneficiaryForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeName = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setBeneficiaryForm({
        ...beneficiaryForm,
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
    if (beneficiary.rut !== "") {
      setBeneficiaryForm({
        rut: { value: beneficiary.rut, isValid: true },
        birthDate: {
          value: beneficiary.birthDate.split("T")[0],
          isValid: true,
        },
        name: { value: beneficiary.name, isValid: true },
        paternalLastName: {
          value: beneficiary.paternalLastName,
          isValid: true,
        },
        maternalLastName: {
          value: beneficiary.maternalLastName,
          isValid: true,
        },
        address: { value: beneficiary.address, isValid: true },
        district: { value: beneficiary.district, isValid: true },
        email: { value: beneficiary.email, isValid: true },
        phone: { value: beneficiary.phone, isValid: true },
      });
    }
  }, [beneficiary]);

  return (
    <ContentCell className={styles.contentCellForm} gap="5px">
      <ContentRow gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={beneficiaryForm?.rut.value}
          onChange={handleChangeRut}
          isValid={beneficiaryForm?.rut.isValid}
          disabled={disabled}
        />
        <InputText
          label="Fecha de nacimiento"
          type="date"
          width="100%"
          maxLength={10}
          value={beneficiaryForm?.birthDate.value}
          onChange={handleChangeBirthDate}
          isValid={beneficiaryForm?.birthDate.isValid}
          disabled={disabled}
        />
      </ContentRow>
      <InputText
        label="Razón Social"
        width="100%"
        maxLength={50}
        value={beneficiaryForm?.name.value}
        onChange={handleChangeName}
        disabled={disabled}
      />
      <InputText
        label="Representante Legal"
        width="100%"
        maxLength={50}
        value={beneficiaryForm?.paternalLastName.value}
        onChange={handleChangePaternalLastName}
        disabled={disabled}
      />
      <InputText
        label="Giro"
        width="100%"
        maxLength={50}
        value={beneficiaryForm?.maternalLastName.value}
        onChange={handleChangeLine}
        disabled={disabled}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={beneficiaryForm?.address.value}
        onChange={handleChangeAddress}
        disabled={disabled}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={beneficiaryForm?.district.value}
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
          value={beneficiaryForm?.email.value}
          onChange={handleChangeEmail}
          isValid={beneficiaryForm?.email.isValid}
          disabled={disabled}
        />
        <InputText
          label="Teléfono"
          width="100%"
          type="tel"
          maxLength={9}
          value={beneficiaryForm?.phone.value}
          onChange={handleChangePhone}
          isValid={beneficiaryForm?.phone.isValid}
          disabled={disabled}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default BeneficiaryForm;
