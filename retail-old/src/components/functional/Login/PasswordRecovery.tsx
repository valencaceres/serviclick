import { useState, useEffect, Fragment } from "react";
import { ContentCell } from "../../layout/Content";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";

import { unFormatRut, formatRut } from "../../../utils/format";
import { rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import { useUserRetail } from "../../../hooks";

const PasswordRecovery = ({
  setShowPasswordRecovery,
  recoveryForm,
  setRecoveryForm,
  recoveryTextButton,
  setRecoveryTextButton,
}: any) => {
  const { loading, sendUserRetailCredentials, response } = useUserRetail();

  const [enabledButtonRecovery, setEnabledButtonRecovery] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

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
      sendUserRetailCredentials(
        recoveryForm.rut.value,
        recoveryForm.email.value
      );
    } else {
      setShowPasswordRecovery(false);
    }
  };

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
    <ContentCell gap="30px" align="center">
      <ContentCell gap="5px" align="center">
        {recoveryTextButton === "Solicitar" ? (
          <Fragment>
            <InputText
              label="Rut empresa"
              width="300px"
              onFocus={handleFocusRecoveryRut}
              onBlur={handleBlurRecoveryRut}
              maxLength={12}
              value={recoveryForm?.rut.value}
              onChange={handleChangeRecoveryRut}
              isValid={recoveryForm?.rut.isValid}
            />
            <InputText
              label="Correo electrónico"
              width="300px"
              value={recoveryForm.email.value}
              onChange={handleChangeRecoveryEmail}
              isValid={recoveryForm?.email.isValid}
            />
          </Fragment>
        ) : (
          !loading && (
            <p style={{ fontWeight: 600 }}>Su contraseña fue enviada</p>
          )
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
  );
};

export default PasswordRecovery;
