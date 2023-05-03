import { useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import styles from "./Customer.module.scss";

import { useDistrict, useCustomer } from "../../../../hooks";

const CustomerForm = ({ customerForm, setCustomerForm, disabled }: any) => {
  const { list } = useDistrict();
  const { customer, getCustomerByRut } = useCustomer();

  const initialDataCustomer = {
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
    setCustomerForm({
      ...customerForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          unFormatRut(event.target.value).length > 7 &&
          rutValidate(unFormatRut(event.target.value)),
      },
    });
    getCustomerByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setCustomerForm({
      ...initialDataCustomer,
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
    setCustomerForm({
      ...customerForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeName = (event: any) => {
    setCustomerForm({
      ...customerForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setCustomerForm({
      ...customerForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setCustomerForm({
      ...customerForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setCustomerForm({
      ...customerForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setCustomerForm({
      ...customerForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setCustomerForm({
      ...customerForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setCustomerForm({
        ...customerForm,
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
    if (customer.rut !== "") {
      setCustomerForm({
        rut: { value: customer.rut, isValid: true },
        birthDate: { value: customer.birthDate, isValid: true },
        name: { value: customer.name, isValid: true },
        paternalLastName: {
          value: customer.paternalLastName,
          isValid: true,
        },
        maternalLastName: { value: customer.maternalLastName, isValid: true },
        address: { value: customer.address, isValid: true },
        district: { value: customer.district, isValid: true },
        email: { value: customer.email, isValid: true },
        phone: { value: customer.phone, isValid: true },
      });
    }
  }, [customer]);

  return (
    <ContentCell className={styles.contentCellForm} gap="5px">
      <ContentRow gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={customerForm?.rut.value}
          onChange={handleChangeRut}
          isValid={customerForm?.rut.isValid}
          disabled={disabled}
        />
        <InputText
          label="Fecha de nacimiento"
          type="date"
          width="100%"
          maxLength={10}
          value={customerForm?.birthDate.value}
          onChange={handleChangeBirthDate}
          isValid={customerForm?.birthDate.isValid}
          disabled={disabled}
        />
      </ContentRow>
      <InputText
        label="Nombres"
        width="100%"
        maxLength={50}
        value={customerForm?.name.value}
        onChange={handleChangeName}
        disabled={disabled}
      />
      <InputText
        label="Apellido paterno"
        width="100%"
        maxLength={50}
        value={customerForm?.paternalLastName.value}
        onChange={handleChangePaternalLastName}
        disabled={disabled}
      />
      <InputText
        label="Apellido materno"
        width="100%"
        maxLength={50}
        value={customerForm?.maternalLastName.value}
        onChange={handleChangeLine}
        disabled={disabled}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={customerForm?.address.value}
        onChange={handleChangeAddress}
        disabled={disabled}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={customerForm?.district.value}
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
          value={customerForm?.email.value}
          onChange={handleChangeEmail}
          isValid={customerForm?.email.isValid}
          disabled={disabled}
        />
        <InputText
          label="Teléfono"
          width="100%"
          type="tel"
          maxLength={9}
          value={customerForm?.phone.value}
          onChange={handleChangePhone}
          isValid={customerForm?.phone.isValid}
          disabled={disabled}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default CustomerForm;
