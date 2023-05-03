import { useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import styles from "./Company.module.scss";

import { useDistrict, useCompany } from "../../../../hooks";

const CompanyForm = ({ companyForm, setCompanyForm, disabled }: any) => {
  const { list } = useDistrict();
  const { company, getCompanyByRut } = useCompany();

  const initialDataCompany = {
    companyName: { value: "", isValid: false },
    legalRepresentative: { value: "", isValid: false },
    line: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
  };

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setCompanyForm({
      ...companyForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          unFormatRut(event.target.value).length > 7 &&
          rutValidate(unFormatRut(event.target.value)),
      },
    });
    getCompanyByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setCompanyForm({
      ...initialDataCompany,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(event.target.value) &&
          event.target.value.length > 7 &&
          rutValidate(event.target.value),
      },
    });
  };

  const handleChangeCompanyName = (event: any) => {
    setCompanyForm({
      ...companyForm,
      companyName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLegalRepresentative = (event: any) => {
    setCompanyForm({
      ...companyForm,
      legalRepresentative: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeLine = (event: any) => {
    setCompanyForm({
      ...companyForm,
      line: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setCompanyForm({
      ...companyForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setCompanyForm({
      ...companyForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setCompanyForm({
      ...companyForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setCompanyForm({
        ...companyForm,
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
    if (company.rut !== "") {
      setCompanyForm({
        rut: { value: company.rut, isValid: true },
        companyName: { value: company.companyName, isValid: true },
        legalRepresentative: {
          value: company.legalRepresentative,
          isValid: true,
        },
        line: { value: company.line, isValid: true },
        address: { value: company.address, isValid: true },
        district: { value: company.district, isValid: true },
        email: { value: company.email, isValid: true },
        phone: { value: company.phone, isValid: true },
      });
    }
  }, [company]);

  return (
    <ContentCell className={styles.contentCellForm} gap="5px">
      <ContentRow gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={companyForm?.rut.value}
          onChange={handleChangeRut}
          isValid={companyForm?.rut.isValid}
          disabled={disabled}
        />
        <div style={{ width: "100%" }}></div>
      </ContentRow>
      <InputText
        label="Razón Social"
        width="100%"
        maxLength={50}
        value={companyForm?.companyName.value}
        onChange={handleChangeCompanyName}
        disabled={disabled}
      />
      <InputText
        label="Representante Legal"
        width="100%"
        maxLength={50}
        value={companyForm?.legalRepresentative.value}
        onChange={handleChangeLegalRepresentative}
        disabled={disabled}
      />
      <InputText
        label="Giro"
        width="100%"
        maxLength={50}
        value={companyForm?.line.value}
        onChange={handleChangeLine}
        disabled={disabled}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={companyForm?.address.value}
        onChange={handleChangeAddress}
        disabled={disabled}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={companyForm?.district.value}
        onChange={handleChangeDistrict}
        placeHolder=":: Seleccione comuna ::"
        data={list}
        dataValue="district_name"
        dataText="district_name"
        enabled={!disabled}
      />
      <ContentRow gap="5px">
        <InputText
          label="Correo"
          width="100%"
          type="email"
          maxLength={250}
          value={companyForm?.email.value}
          onChange={handleChangeEmail}
          isValid={companyForm?.email.isValid}
          disabled={disabled}
        />
        <InputText
          label="Teléfono"
          width="100%"
          type="tel"
          maxLength={9}
          value={companyForm?.phone.value}
          onChange={handleChangePhone}
          isValid={companyForm?.phone.isValid}
          disabled={disabled}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default CompanyForm;
