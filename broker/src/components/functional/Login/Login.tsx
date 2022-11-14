import { useState, useEffect, Fragment } from "react";

import PasswordRecovery from "./PasswordRecovery";
import LoginForm from "./LoginForm";

import { Content, ContentCell } from "../../layout/Content";

import Button from "../../ui/Button";
import ButtonLink from "../../ui/ButtonLink";
import ModalWindow from "../../ui/ModalWindow";

import { useUI, useUserBroker } from "../../../hooks";

const Login = () => {
  const initialLoginData = {
    rut: { value: "", isValid: true },
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  };

  const initialRecoveryData = {
    rut: { value: "", isValid: false },
    email: { value: "", isValid: false },
  };

  const { setTitleUI } = useUI();
  const { validate, loading } = useUserBroker();

  const [enabledButton, setEnabledButton] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginData);
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [recoveryForm, setRecoveryForm] = useState(initialRecoveryData);
  const [recoveryTextButton, setRecoveryTextButton] = useState("Solicitar");

  const handleClickEnter = () => {
    validate(
      loginForm.rut.value,
      loginForm.email.value,
      loginForm.password.value
    );
  };

  const handlePasswordRecovery = () => {
    setRecoveryForm(initialRecoveryData);
    setRecoveryTextButton("Solicitar");
    setShowPasswordRecovery(true);
  };

  const handleClickCloseRecoveryModal = () => {
    setShowPasswordRecovery(false);
  };

  useEffect(() => {
    setTitleUI("Login");
  }, []);

  useEffect(() => {
    setEnabledButton(
      loginForm.rut.isValid &&
        loginForm.email.isValid &&
        loginForm.password.isValid
    );
  }, [loginForm]);

  return (
    <Fragment>
      <Content align="center">
        <ContentCell gap="30px" align="center">
          <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} />
          <Button
            text="Ingresar"
            width="200px"
            onClick={handleClickEnter}
            enabled={enabledButton}
            loading={loading}
          />
          <ButtonLink onClick={handlePasswordRecovery}>
            Olvidé mi contraseña
          </ButtonLink>
        </ContentCell>
      </Content>
      <ModalWindow
        showModal={showPasswordRecovery}
        setClosed={handleClickCloseRecoveryModal}
        title="Recuperación de contraseña">
        <PasswordRecovery
          setShowPasswordRecovery={setShowPasswordRecovery}
          recoveryForm={recoveryForm}
          setRecoveryForm={setRecoveryForm}
          recoveryTextButton={recoveryTextButton}
          setRecoveryTextButton={setRecoveryTextButton}
        />
      </ModalWindow>
    </Fragment>
  );
};

export default Login;
