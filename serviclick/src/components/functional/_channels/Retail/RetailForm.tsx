import { useEffect, useRef } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";
import InputText from "../../../ui/InputText";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useRetail, useDistrict } from "../../../../hooks";

import styles from "./Retail.module.scss";
import ComboBox from "../../../ui/ComboBox";

const RetailForm = ({
  retailForm,
  setRetailForm,
  setEnableButtonSave,
}: any) => {
  const { list } = useDistrict();
  const { retail, setRetail, getRetailByRut } = useRetail();

  const ref = useRef<HTMLInputElement>(null);

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setRetailForm({
      ...retailForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          event.target.value.length > 7 &&
          rutValidate(unFormatRut(event.target.value)) &&
          event.target.value !== "",
      },
    });
    event.target.value !== "" &&
      event.target.value.length > 7 &&
      getRetailByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setRetailForm({
      ...retailForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(event.target.value) &&
          event.target.value.length > 7 &&
          rutValidate(event.target.value) &&
          event.target.value !== "",
      },
    });
  };

  const handleChangeName = (event: any) => {
    setRetailForm({
      ...retailForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLegalRepresentative = (event: any) => {
    setRetailForm({
      ...retailForm,
      legalRepresentative: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setRetailForm({
      ...retailForm,
      line: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setRetailForm({
      ...retailForm,
      address: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setRetailForm({
      ...retailForm,
      district: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setRetailForm({
      ...retailForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setRetailForm({
        ...retailForm,
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
    if (retail.rut !== "") {
      setRetailForm({
        rut: { value: retail.rut, isValid: true },
        name: { value: retail.name, isValid: true },
        legalRepresentative: {
          value: retail.legalRepresentative,
          isValid: true,
        },
        line: { value: retail.line, isValid: true },
        address: { value: retail.address, isValid: true },
        district: { value: retail.district, isValid: true },
        email: { value: retail.email, isValid: true },
        phone: { value: retail.phone, isValid: true },
        logo: { value: retail.logo, isValid: true },
      });
    }
  }, [retail.rut]);

  useEffect(() => {
    const isValid =
      retailForm.rut.isValid &&
      retailForm.name.isValid &&
      retailForm.legalRepresentative.isValid &&
      retailForm.line.isValid &&
      retailForm.address.isValid &&
      retailForm.district.isValid &&
      retailForm.email.isValid &&
      retailForm.phone.isValid;

    if (isValid) {
      setRetail({
        ...retail,
        rut: retailForm.rut.value,
        name: retailForm.name.value,
        legalRepresentative: retailForm.legalRepresentative.value,
        line: retailForm.line.value,
        address: retailForm.address.value,
        district: retailForm.district.value,
        email: retailForm.email.value,
        phone: retailForm.phone.value,
        products: [...retail.products],
        users: [...retail.users],
      });
    }
    setEnableButtonSave(isValid);
  }, [retailForm]);

  return (
    <ContentRow gap="5px">
      <ContentCell className={styles.contentCellForm} gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={retailForm?.rut.value}
          onChange={handleChangeRut}
          isValid={retailForm?.rut.isValid}
        />
        <InputText
          label="Razón Social"
          width="100%"
          maxLength={50}
          value={retailForm?.name.value}
          onChange={handleChangeName}
          isValid={retailForm?.name.isValid}
        />
        <InputText
          label="Giro"
          width="100%"
          maxLength={50}
          value={retailForm?.line.value}
          onChange={handleChangeLine}
          isValid={retailForm?.line.isValid}
        />
        <InputText
          label="Representante Legal"
          width="100%"
          maxLength={50}
          value={retailForm?.legalRepresentative.value}
          onChange={handleChangeLegalRepresentative}
          isValid={retailForm?.legalRepresentative.isValid}
        />
        <InputText
          label="Dirección"
          width="100%"
          maxLength={250}
          value={retailForm?.address.value}
          onChange={handleChangeAddress}
          isValid={retailForm?.address.isValid}
        />
        <ComboBox
          label="Comuna"
          width="100%"
          value={retailForm?.district.value}
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
            value={retailForm?.email.value}
            onChange={handleChangeEmail}
            isValid={retailForm?.email.isValid}
          />
          <InputText
            label="Teléfono"
            width="100%"
            type="tel"
            maxLength={9}
            value={retailForm?.phone.value}
            onChange={handleChangePhone}
            isValid={retailForm?.phone.isValid}
          />
        </ContentRow>
      </ContentCell>
    </ContentRow>
  );
};

export default RetailForm;
