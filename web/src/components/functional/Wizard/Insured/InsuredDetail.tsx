import { useState, useEffect } from "react";

import { Component, Row, Cell, CellSeparator } from "../../../layout/Component";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useAppSelector } from "../../../../redux/hooks";

import styles from "./Insured.module.scss";

const InsuredDetail = ({ insuredForm, setInsuredForm, register }: any) => {
  const { isDesktop } = useAppSelector((state) => state.uiSlice);

  const [isEnabled, setIsEnabled] = useState(false);

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(rut) && rut.length > 7 && rutValidate(rut)) || rut === ""
    );
  };

  const handleBlurRut = (event: any) => {
    const isValid = isValidRut(event.target.value);

    event.target.value = formatRut(event.target.value);

    setInsuredForm({
      ...insuredForm,
      rut: {
        value: event.target.value,
        isValid,
      },
    });
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
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
  const handleChangeMaternalLastName = (event: any) => {
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
    let enableButton = true;
    if (
      !insuredForm.rut.isValid ||
      insuredForm.rut.value === "" ||
      !insuredForm.name.isValid ||
      insuredForm.name.value === "" ||
      !insuredForm.paternalLastName.isValid ||
      insuredForm.paternalLastName.value === "" ||
      !insuredForm.maternalLastName.isValid ||
      insuredForm.maternalLastName.value === "" ||
      !insuredForm.address.isValid ||
      insuredForm.address.value === "" ||
      !insuredForm.district.isValid ||
      insuredForm.district.value === "" ||
      !insuredForm.email.isValid ||
      insuredForm.email.value === "" ||
      !insuredForm.phone.isValid ||
      insuredForm.phone.value === ""
    )
      enableButton = false;
    setIsEnabled(enableButton);
  }, [insuredForm]);

  return (
    <Component>
      <Row>
        <Cell>
          <InputText
            label="Rut"
            width={isDesktop ? "140px" : "100%"}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={insuredForm?.rut.value}
            onChange={handleChangeRut}
            isValid={insuredForm?.rut.isValid}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Nombres"
            width="100%"
            maxLength={50}
            value={insuredForm?.name.value}
            onChange={handleChangeName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Apellido Paterno"
            width="100%"
            maxLength={50}
            value={insuredForm?.paternalLastName.value}
            onChange={handleChangePaternalLastName}
          />
        </Cell>
        <Cell>
          <InputText
            label="Apellido Materno"
            width="100%"
            maxLength={50}
            value={insuredForm?.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="100%"
            maxLength={250}
            value={insuredForm?.address.value}
            onChange={handleChangeAddress}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Comuna"
            width="100%"
            maxLength={250}
            value={insuredForm?.district.value}
            onChange={handleChangeDistrict}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            type="email"
            width="100%"
            maxLength={250}
            value={insuredForm?.email.value}
            onChange={handleChangeEmail}
            isValid={insuredForm?.email.isValid}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            type="tel"
            width="100%"
            maxLength={9}
            value={insuredForm?.phone.value}
            onChange={handleChangePhone}
            isValid={insuredForm?.phone.isValid}
          />
        </Cell>
      </Row>
      <Row>
        <CellSeparator></CellSeparator>
      </Row>
      <Row className={styles.detailButton}>
        <Button
          text="Registrar"
          width="100%"
          enabled={isEnabled}
          onClick={register}
        />
      </Row>
    </Component>
  );
};

export default InsuredDetail;
