import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import useUser from "../../../../hooks/useUser";

const UserDetail = ({ userForm, setUserForm, saveUser }: any) => {
  const { user } = useUser();

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(rut) && rut.length > 7 && rutValidate(rut)) || rut === ""
    );
  };

  const handleBlurRut = (event: any) => {
    const isValid = isValidRut(event.target.value);

    event.target.value = formatRut(event.target.value);

    setUserForm({
      ...userForm,
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
    setUserForm({
      ...userForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
  };

  const handleChangeName = (event: any) => {
    setUserForm({
      ...userForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setUserForm({
      ...userForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeMaternalLastName = (event: any) => {
    setUserForm({
      ...userForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setUserForm({
      ...userForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setUserForm({
        ...userForm,
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
    <ContentCell align="center" gap="20px">
      <ContentCell align="center" gap="5px">
        <ContentRow gap="5px">
          <InputText
            label="Rut"
            width={"200px"}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={userForm?.rut.value}
            onChange={handleChangeRut}
            isValid={userForm?.rut.isValid}
          />
          <InputText
            label="Correo"
            type="email"
            width="100%"
            maxLength={250}
            value={userForm?.email.value}
            onChange={handleChangeEmail}
            isValid={userForm?.email.isValid}
          />
        </ContentRow>
        <InputText
          label="Nombres"
          width="100%"
          maxLength={50}
          value={userForm?.name.value}
          onChange={handleChangeName}
        />
        <InputText
          label="Apellido Paterno"
          width="100%"
          maxLength={50}
          value={userForm?.paternalLastName.value}
          onChange={handleChangePaternalLastName}
        />
        <InputText
          label="Apellido Materno"
          width="100%"
          maxLength={50}
          value={userForm?.maternalLastName.value}
          onChange={handleChangeMaternalLastName}
        />
        <InputText
          label="Teléfono"
          type="tel"
          width="100%"
          maxLength={9}
          value={userForm?.phone.value}
          onChange={handleChangePhone}
          isValid={userForm?.phone.isValid}
        />
      </ContentCell>
      <Button
        text={user.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveUser}
      />
    </ContentCell>
  );
};

export default UserDetail;
