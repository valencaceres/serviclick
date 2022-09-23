import { useState, useEffect } from "react";

import { Content, ContentCell } from "../../layout/Content";

import InputText from "../../ui/InputText";
import Button from "../../ui/Button";

import useUser from "../../../hooks/useUser";

const Login = () => {
  const initialLoginData = {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  };

  const { validate } = useUser();

  const [enabledButton, setEnabledButton] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginData);

  const handleChangeEmail = (e: any) => {
    setLoginForm({
      ...loginForm,
      email: { value: e.target.value, isValid: e.target.value !== "" },
    });
  };

  const handleChangePassword = (e: any) => {
    setLoginForm({
      ...loginForm,
      password: { value: e.target.value, isValid: e.target.value !== "" },
    });
  };

  const handleClickEnter = () => {
    validate(loginForm.email.value, loginForm.password.value);
  };

  useEffect(() => {
    setEnabledButton(loginForm.email.isValid && loginForm.password.isValid);
  }, [loginForm]);

  return (
    <Content align="center">
      <ContentCell gap="30px" align="center">
        <ContentCell gap="5px">
          <InputText
            label="Correo electrónico"
            type="email"
            width="250px"
            value={loginForm.email.value}
            onChange={handleChangeEmail}
          />
          <InputText
            label="Contraseña"
            type="password"
            width="250px"
            value={loginForm.password.value}
            onChange={handleChangePassword}
          />
        </ContentCell>
        <Button
          text="Ingresar"
          width="200px"
          onClick={handleClickEnter}
          enabled={enabledButton}
        />
      </ContentCell>
    </Content>
  );
};

export default Login;
