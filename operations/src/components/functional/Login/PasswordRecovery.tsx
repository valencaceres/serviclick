import { useState, useEffect, Fragment } from "react";
import { ContentCell } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import { emailRegEx } from "../../../utils/regEx";

import { useUser } from "../../../hooks";

const PasswordRecovery = ({
  setShowPasswordRecovery,
  recoveryForm,
  setRecoveryForm,
  recoveryTextButton,
  setRecoveryTextButton,
}: any) => {
  const { userLoading, userError, sendCredentials } = useUser();

  const [enabledButtonRecovery, setEnabledButtonRecovery] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleChangeRecoveryEmail = (event: any) => {
    setRecoveryForm({
      ...recoveryForm,
      email: {
        value: event.target.value,
        isValid: emailRegEx.test(event.target.value),
      },
    });
  };

  const handleSendPassword = () => {
    if (recoveryTextButton === "Solicitar") {
      sendCredentials(recoveryForm.email.value);
    } else {
      setShowPasswordRecovery(false);
    }
  };

  useEffect(() => {
    setEnabledButtonRecovery(recoveryForm.email.isValid);
  }, [recoveryForm]);

  useEffect(() => {
    if (!userLoading) {
      setRecoveryTextButton("Cerrar");
      setSuccess(true);
    }
  }, [userLoading]);

  return (
    <ContentCell gap="20px" align="center">
      <ContentCell gap="5px" align="center">
        {recoveryTextButton === "Solicitar" ? (
          <Fragment>
            <InputText
              label="Correo electrónico"
              width="300px"
              value={recoveryForm.email.value}
              onChange={handleChangeRecoveryEmail}
              isValid={recoveryForm?.email.isValid}
            />
          </Fragment>
        ) : (
          !userLoading && (
            <p style={{ fontWeight: 600 }}>Su contraseña fue enviada</p>
          )
        )}
      </ContentCell>
      <Button
        text={recoveryTextButton}
        width="200px"
        onClick={handleSendPassword}
        enabled={enabledButtonRecovery}
        loading={userLoading}
      />
    </ContentCell>
  );
};

export default PasswordRecovery;
