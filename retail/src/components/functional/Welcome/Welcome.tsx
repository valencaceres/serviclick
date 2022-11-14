import { useState, useEffect, Fragment } from "react";

import { Content, ContentCell, ContentCenter } from "../../layout/Content";

import Icon from "../../ui/Icon";
import ButtonLink from "../../ui/ButtonLink";
import ModalWindow from "../../ui/ModalWindow";
import InputText from "../../ui/InputText";
import Button from "../../ui/Button";
import Menu from "../Menu";

import { useUI, useUserRetail, useLead } from "../../../hooks";

import styles from "./Welcome.module.scss";

const Welcome = () => {
  const { user, retail, setTitleUI, agentId } = useUI();
  const { updateUserRetailPassword, loading, response } = useUserRetail();
  const { resetLead } = useLead();

  const initialPasswordData = {
    password: { value: "", isValid: false },
    newPassword1: { value: "", isValid: false },
    newPassword2: { value: "", isValid: false },
  };

  const [passwordForm, setPasswordForm] = useState(initialPasswordData);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [enabledButton, setEnabledButton] = useState(false);
  const [updatePasswordTextButton, setUpdatePasswordTextButton] =
    useState("Cambiar contraseña");
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleChangePassword = (e: any) => {
    setPasswordForm({
      ...passwordForm,
      password: { value: e.target.value, isValid: e.target.value !== "" },
    });
  };

  const handleChangeNewPassword1 = (e: any) => {
    setPasswordForm({
      ...passwordForm,
      newPassword1: { value: e.target.value, isValid: e.target.value !== "" },
    });
  };

  const handleChangeNewPassword2 = (e: any) => {
    setPasswordForm({
      ...passwordForm,
      newPassword2: { value: e.target.value, isValid: e.target.value !== "" },
    });
  };

  const handleClickChangePassword = () => {
    setSuccess(null);
    setUpdatePasswordTextButton("Cambiar contraseña");
    setPasswordForm(initialPasswordData);
    setShowPasswordChange(true);
  };

  const handleClickUpdatePassword = () => {
    if (updatePasswordTextButton === "Cambiar contraseña") {
      updateUserRetailPassword(
        retail.rut,
        user.email,
        passwordForm.password.value,
        passwordForm.newPassword1.value
      );
    } else {
      setShowPasswordChange(false);
    }
  };

  const handleClickClosePasswordChange = () => {
    setShowPasswordChange(false);
  };

  useEffect(() => {
    setTitleUI("Inicio");
    resetLead();
  }, []);

  useEffect(() => {
    setEnabledButton(
      passwordForm.password.isValid &&
        passwordForm.newPassword1.isValid &&
        passwordForm.newPassword2.isValid &&
        passwordForm.newPassword1.value === passwordForm.newPassword2.value
    );
  }, [passwordForm]);

  useEffect(() => {
    if (loading === false) {
      setUpdatePasswordTextButton("Cerrar");
      if (response === "OK") {
        setSuccess(true);
      }
    }
  }, [loading]);

  return (
    <Fragment>
      <ContentCenter>
        <Content align="center">
          <ContentCell align="center" gap="30px">
            <ContentCell align="center" gap="5px">
              <div className={styles.photo}>
                <Icon iconName="face" size="120px" />
              </div>
              <div className={styles.name} style={{ textAlign: "center" }}>
                <h1>Bienvenido</h1>
                {user.name} {user.paternalLastName} {user.maternalLastName}
                <h2>{retail.name}</h2>
              </div>
            </ContentCell>
            <Menu />
            <div className={styles.link}>
              <ButtonLink onClick={handleClickChangePassword}>
                Cambiar contraseña
              </ButtonLink>
            </div>
          </ContentCell>
        </Content>
      </ContentCenter>
      <ModalWindow
        showModal={showPasswordChange}
        setClosed={handleClickClosePasswordChange}
        title="Modificación de contraseña">
        <ContentCell align="center" gap="30px">
          {success === null ? (
            <Fragment>
              <InputText
                label="Contraseña actual"
                type="password"
                width="250px"
                value={passwordForm.password.value}
                onChange={handleChangePassword}
              />
              <ContentCell gap="5px">
                <InputText
                  label="Nueva contraseña"
                  type="password"
                  width="250px"
                  value={passwordForm.newPassword1.value}
                  onChange={handleChangeNewPassword1}
                />
                <InputText
                  label="Repita nueva contraseña"
                  type="password"
                  width="250px"
                  value={passwordForm.newPassword2.value}
                  onChange={handleChangeNewPassword2}
                />
              </ContentCell>
            </Fragment>
          ) : (
            <p style={{ fontWeight: 600 }}>Contraseña modificada</p>
          )}
          <Button
            text={updatePasswordTextButton}
            width="200px"
            onClick={handleClickUpdatePassword}
            enabled={enabledButton}
            loading={loading}
          />
        </ContentCell>
      </ModalWindow>
    </Fragment>
  );
};

export default Welcome;
