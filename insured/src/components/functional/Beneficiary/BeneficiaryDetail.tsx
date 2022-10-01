import { useState, useEffect } from "react";

import { Component, Row, Cell, CellSeparator } from "../../layout/Component";

import InputText from "../../ui/InputText";
import Button from "../../ui/Button";

import { unFormatRut, formatRut } from "../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import { useAppSelector } from "../../../redux/hooks";

import styles from "./Beneficiary.module.scss";

const BeneficiaryDetail = ({
  beneficiaryForm,
  setBeneficiaryForm,
  register,
}: any) => {
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

    setBeneficiaryForm({
      ...beneficiaryForm,
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
    setBeneficiaryForm({
      ...beneficiaryForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
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
  const handleChangeMaternalLastName = (event: any) => {
    setBeneficiaryForm({
      ...beneficiaryForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
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
    let enableButton = true;
    if (
      !beneficiaryForm.rut.isValid ||
      beneficiaryForm.rut.value === "" ||
      !beneficiaryForm.name.isValid ||
      beneficiaryForm.name.value === "" ||
      !beneficiaryForm.paternalLastName.isValid ||
      beneficiaryForm.paternalLastName.value === "" ||
      !beneficiaryForm.maternalLastName.isValid ||
      beneficiaryForm.maternalLastName.value === "" ||
      !beneficiaryForm.birthDate.isValid ||
      beneficiaryForm.birthDate.value === "" ||
      !beneficiaryForm.address.isValid ||
      beneficiaryForm.address.value === "" ||
      !beneficiaryForm.district.isValid ||
      beneficiaryForm.district.value === "" ||
      !beneficiaryForm.email.isValid ||
      beneficiaryForm.email.value === "" ||
      !beneficiaryForm.phone.isValid ||
      beneficiaryForm.phone.value === ""
    )
      enableButton = false;
    setIsEnabled(enableButton);
  }, [beneficiaryForm]);

  return (
    <Component>
      <Row>
        <Cell>
          <InputText
            label="Rut"
            width={"100%"}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={beneficiaryForm?.rut.value}
            onChange={handleChangeRut}
            isValid={beneficiaryForm?.rut.isValid}
          />
        </Cell>
        <Cell>
          <InputText
            type="date"
            label="Fecha de nacimiento"
            width={"100%"}
            maxLength={10}
            value={beneficiaryForm?.birthDate.value}
            onChange={handleChangeBirthDate}
            isValid={beneficiaryForm?.birthDate.isValid}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Nombres"
            width="100%"
            maxLength={50}
            value={beneficiaryForm?.name.value}
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
            value={beneficiaryForm?.paternalLastName.value}
            onChange={handleChangePaternalLastName}
          />
        </Cell>
        <Cell>
          <InputText
            label="Apellido Materno"
            width="100%"
            maxLength={50}
            value={beneficiaryForm?.maternalLastName.value}
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
            value={beneficiaryForm?.address.value}
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
            value={beneficiaryForm?.district.value}
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
            value={beneficiaryForm?.email.value}
            onChange={handleChangeEmail}
            isValid={beneficiaryForm?.email.isValid}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            type="tel"
            width="100%"
            maxLength={9}
            value={beneficiaryForm?.phone.value}
            onChange={handleChangePhone}
            isValid={beneficiaryForm?.phone.isValid}
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

export default BeneficiaryDetail;
