import React from "react";

import { ContentCell } from "../../layout/Content";
import InputText from "../../ui/InputText";

import { unFormatRut, formatRut } from "../../../utils/format";
import { rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

const LoginForm = ({ loginForm, setLoginForm }: any) => {
  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setLoginForm({
      ...loginForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          event.target.value.length > 7 &&
          rutValidate(unFormatRut(event.target.value)) &&
          event.target.value !== "",
      },
    });
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setLoginForm({
      ...loginForm,
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

  const handleChangeEmail = (event: any) => {
    setLoginForm({
      ...loginForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePassword = (e: any) => {
    setLoginForm({
      ...loginForm,
      password: { value: e.target.value, isValid: e.target.value !== "" },
    });
  };

  return (
    <ContentCell gap="5px">
      <InputText
        label="Rut empresa"
        width="300px"
        onFocus={handleFocusRut}
        onBlur={handleBlurRut}
        maxLength={12}
        value={loginForm?.rut.value}
        onChange={handleChangeRut}
        isValid={loginForm?.rut.isValid}
      />
      <InputText
        label="Correo electrónico"
        type="email"
        width="300px"
        value={loginForm.email.value}
        onChange={handleChangeEmail}
      />
      <InputText
        label="Contraseña"
        type="password"
        width="300px"
        value={loginForm.password.value}
        onChange={handleChangePassword}
      />
    </ContentCell>
  );
};

export default LoginForm;
