import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import { Content, ContentCell } from "../../layout/Content";

import InputText from "../../ui/InputText";
import Button from "../../ui/Button";
import ButtonLink from "../../ui/ButtonLink";

import { unFormatRut, formatRut } from "../../../utils/format";
import { rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import { useUI, useUserBroker } from "../../../hooks";
import ModalWindow from "../../ui/ModalWindow";

const Login = () => {
  const { loading, sendUserBrokerCredentials, response } = useUserBroker();

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
  const { validate } = useUserBroker();

  const [enabledButton, setEnabledButton] = useState(false);
  const [enabledButtonRecovery, setEnabledButtonRecovery] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginData);
  const [recoveryForm, setRecoveryForm] = useState(initialRecoveryData);
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [recoveryTextButton, setRecoveryTextButton] = useState("Solicitar");
  const [success, setSuccess] = useState<boolean | null>(null);

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

  const handleBlurRecoveryRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setRecoveryForm({
      ...recoveryForm,
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

  const handleFocusRecoveryRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRecoveryRut = (event: any) => {
    setRecoveryForm({
      ...recoveryForm,
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

  const handleChangeRecoveryEmail = (event: any) => {
    setRecoveryForm({
      ...recoveryForm,
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

  const handleClickEnter = () => {
    validate(
      loginForm.rut.value,
      loginForm.email.value,
      loginForm.password.value
    );
  };

  const handlePasswordRecovery = () => {
    setSuccess(null);
    setRecoveryTextButton("Solicitar");
    setRecoveryForm(initialRecoveryData);
    setShowPasswordRecovery(true);
  };

  const handleSendPassword = () => {
    if (recoveryTextButton === "Solicitar") {
      sendUserBrokerCredentials(
        recoveryForm.rut.value,
        recoveryForm.email.value
      );
    } else {
      setShowPasswordRecovery(false);
    }
  };

  const handleClickCloseRecoveryModal = () => {
    setRecoveryForm(initialRecoveryData);
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

  useEffect(() => {
    setEnabledButtonRecovery(
      recoveryForm.rut.isValid && recoveryForm.email.isValid
    );
  }, [recoveryForm]);

  useEffect(() => {
    if (loading === false) {
      setRecoveryTextButton("Cerrar");
      if (response === "OK") {
        setSuccess(true);
      }
    }
  }, [loading]);

  return (
    <Fragment>
      <Content align="center">
        <ContentCell gap="30px" align="center">
          <ContentCell gap="5px">
            <InputText
              label="Rut empresa"
              width="250px"
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
          <ButtonLink onClick={handlePasswordRecovery}>
            Olvidé mi contraseña
          </ButtonLink>
        </ContentCell>
      </Content>
      <ModalWindow
        showModal={showPasswordRecovery}
        setClosed={handleClickCloseRecoveryModal}
        title="Recuperación de contraseña">
        <ContentCell gap="30px" align="center">
          <ContentCell gap="5px" align="center">
            {success === null ? (
              <Fragment>
                <InputText
                  label="Rut empresa"
                  width="250px"
                  onFocus={handleFocusRecoveryRut}
                  onBlur={handleBlurRecoveryRut}
                  maxLength={12}
                  value={recoveryForm?.rut.value}
                  onChange={handleChangeRecoveryRut}
                  isValid={recoveryForm?.rut.isValid}
                />
                <InputText
                  label="Correo electrónico"
                  width="250px"
                  value={recoveryForm.email.value}
                  onChange={handleChangeRecoveryEmail}
                />
              </Fragment>
            ) : (
              <p style={{ fontWeight: 600 }}>Su contraseña fue enviada</p>
            )}
          </ContentCell>
          <Button
            text={recoveryTextButton}
            width="200px"
            onClick={handleSendPassword}
            enabled={enabledButtonRecovery}
            loading={loading}
          />
        </ContentCell>
      </ModalWindow>
    </Fragment>
  );
};

export default Login;
