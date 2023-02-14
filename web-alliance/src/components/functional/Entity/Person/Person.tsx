import { useState, useEffect } from "react";

import { Col, Row } from "../../../layout/Form";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import CustomerType from "../../../ui/CustomerType";
import Loading from "../../../ui/Loading";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import * as DistrictHook from "../../../../hooks/query/useDistrict";

interface IPersonComponent {
  getByRut: any;
  initialDataForm: any;
  formData: any;
  setFormData: any;
}

const Person = ({
  getByRut,
  initialDataForm,
  formData,
  setFormData,
}: IPersonComponent) => {
  const initialData = {
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  };

  const { districts, isLoading } = DistrictHook.GetAll();

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const isValidEmail = (email: string) => {
    return emailRegEx.test(email) || email === "";
  };

  const isValidPhone = (phone: string) => {
    return phone.length === 9;
  };

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setFormData({
      ...formData,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
    getByRut && getByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setFormData({
      customerType: { value: "p", isValid: true },
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
      ...initialDataForm,
    });
  };

  const handleChangeName = (event: any) => {
    setFormData({
      ...formData,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setFormData({
      ...formData,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setFormData({
      ...formData,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setFormData({
      ...formData,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setFormData({
      ...formData,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setFormData({
      ...formData,
      email: {
        value: event.target.value,
        isValid: isValidEmail(event.target.value),
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setFormData({
        ...formData,
        phone: {
          value: event.target.value,
          isValid: isValidPhone(event.target.value),
        },
      });
    } else {
      return;
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Col width="340px">
      <Row align="space-between">
        <InputText
          label="Rut"
          width="150px"
          value={formData.rut.value}
          onChange={handleChangeRut}
          onBlur={handleBlurRut}
          onFocus={handleFocusRut}
          isValid={formData.rut.isValid}
        />
        <CustomerType value={formData.customerType.value} />
      </Row>
      <InputText
        label="Nombres"
        value={formData.name.value}
        onChange={handleChangeName}
        isValid={formData.name.isValid}
      />
      <InputText
        label="Apellido paterno"
        value={formData.paternalLastName.value}
        onChange={handleChangePaternalLastName}
        isValid={formData.paternalLastName.isValid}
      />
      <InputText
        label="Apellido materno"
        value={formData.maternalLastName.value}
        onChange={handleChangeMaternalLastName}
        isValid={formData.maternalLastName.isValid}
      />
      <InputText
        label="Dirección"
        value={formData.address.value}
        onChange={handleChangeAddress}
        isValid={formData.address.isValid}
      />
      <ComboBox
        width="340px"
        label="Comuna"
        placeHolder=":: Seleccione comuna ::"
        value={formData.district.value}
        onChange={handleChangeDistrict}
        data={districts}
        dataValue="district_name"
        dataText="district_name"
      />
      <InputText
        type="email"
        maxLength={250}
        width="340px"
        label="Correo electrónico"
        value={formData.email.value}
        onChange={handleChangeEmail}
        isValid={formData.email.isValid}
      />
      <InputText
        type="tel"
        maxLength={9}
        width="150px"
        label="Teléfono"
        value={formData.phone.value}
        onChange={handleChangePhone}
        isValid={formData.phone.isValid}
      />
    </Col>
  );
};

export default Person;
