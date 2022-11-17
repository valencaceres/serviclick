import { useState, useEffect, Fragment, useSyncExternalStore } from "react";

import { Content, ContentCell } from "../../layout/Content";

import Button from "../../ui/Button";
import { ErrorMessage } from "../../ui/LoadingMessage";

import { useUI, useUser } from "../../../hooks";
import LoginForm from "./LoginForm";
import ButtonLink from "../../ui/ButtonLink";
import ModalWindow from "../../ui/ModalWindow";
import PasswordRecovery from "./PasswordRecovery";

const Login = () => {
  const initialLoginData = {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  };

  const initialRecoveryData = {
    email: { value: "", isValid: false },
  };

  const { setTitleUI } = useUI();
  const { validateUser, userLoading, userError } = useUser();

  const [enabledButton, setEnabledButton] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginData);
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [recoveryForm, setRecoveryForm] = useState(initialRecoveryData);
  const [recoveryTextButton, setRecoveryTextButton] = useState("Solicitar");

  const handleClickEnter = () => {
    validateUser(loginForm.email.value, loginForm.password.value);
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
    setEnabledButton(loginForm.email.isValid && loginForm.password.isValid);
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
            loading={userLoading}
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
      {!userLoading && (
        <ErrorMessage showModal={userError} callback={() => {}}>
          Usuario inválido
        </ErrorMessage>
      )}
    </Fragment>
  );
};

export default Login;
