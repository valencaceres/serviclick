import React, { useState } from "react";

import { Component, Row, Cell } from "../../layout/Component";

import InputText from "../../ui/InputText";

import { unFormatRut, formatRut } from "../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

const Customer = ({ customer, setCustomer }: any) => {
  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setCustomer({
      ...customer,
      rut: {
        value: event.target.value,
        isValid:
          (rutRegEx.test(event.target.value) &&
            event.target.value.length > 7 &&
            rutValidate(event.target.value)) ||
          event.target.value === "",
      },
    });
  };

  const handleChangeName = (event: any) => {
    setCustomer({
      ...customer,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setCustomer({
      ...customer,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeMaternalLastName = (event: any) => {
    setCustomer({
      ...customer,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setCustomer({
      ...customer,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeDistrict = (event: any) => {
    setCustomer({
      ...customer,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setCustomer({
      ...customer,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setCustomer({
        ...customer,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  return (
    <Component>
      <Row>
        <Cell>
          <InputText
            label="Rut"
            width="150px"
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={customer.rut.value}
            onChange={handleChangeRut}
            isValid={customer.rut.isValid}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Nombres"
            width="450px"
            maxLength={50}
            value={customer.name.value}
            onChange={handleChangeName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Apellido Paterno"
            width="222px"
            maxLength={50}
            value={customer.paternalLastName.value}
            onChange={handleChangePaternalLastName}
          />
        </Cell>
        <Cell>
          <InputText
            label="Apellido Materno"
            width="222px"
            maxLength={50}
            value={customer.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="450px"
            maxLength={250}
            value={customer.address.value}
            onChange={handleChangeAddress}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Comuna"
            width="450px"
            maxLength={250}
            value={customer.district.value}
            onChange={handleChangeDistrict}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            width="222px"
            maxLength={250}
            value={customer.email.value}
            onChange={handleChangeEmail}
            isValid={customer.email.isValid}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="222px"
            maxLength={9}
            value={customer.phone.value}
            onChange={handleChangePhone}
            isValid={customer.phone.isValid}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default Customer;
