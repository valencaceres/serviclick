import { eventNames } from "process";
import React from "react";

import { Component, Row, Cell } from "../../layout/Component";

import InputText from "../../ui/InputText";

const Company = ({ comnay, setCompany }: any) => {
  const handleChangeEmail = (event: any) => {
    const evaluation = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(event.target.value);
  };

  const handleBlurRut = (event: any) => {
    event.target.value = event.target.value.replace(
      /^(\d{1,2})(\d{3})(\d{3})(\w{1})$/,
      "$1.$2.$3-$4"
    );
  };

  const handleFocusRut = (event: any) => {
    event.target.value = event.target.value
      .split(".")
      .join("")
      .split("-")
      .join("");
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
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Razón Social"
            width="450px"
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Representante Legal"
            width="450px"
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Giro"
            width="450px"
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="450px"
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Comuna"
            width="450px"
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            width="222px"
            value={""}
            onChange={handleChangeEmail}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="222px"
            value={""}
            onChange={() => {}}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default Company;
