import React from "react";

import { ContentCell } from "../../layout/Content";

import InputText from "../../ui/InputText";

import { emailRegEx } from "../../../utils/regEx";

const LoginForm = ({ loginForm, setLoginForm }: any) => {
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
