import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { emailRegEx } from "../../../../utils/regEx";
import { isValidRut } from "../../../../utils/validations";

import styles from "./Broker.module.scss";
import ButtonIcon from "../../../ui/ButtonIcon";

import { useBroker } from "../../../../hooks";

const BrokerUsersItem = ({
  brokerUserForm,
  setBrokerUserForm,
  saveUser,
  setShowModal,
  sendCredentials,
}: any) => {
  const { broker } = useBroker();

  const profileData = [
    { id: "S", name: "Vendedor" },
    { id: "A", name: "Administrador" },
  ];

  const [enabledButton, setEnabledButton] = useState(false);

  const handleBlurRut = (event: any) => {
    const isValid = isValidRut(event.target.value);

    event.target.value = formatRut(event.target.value);

    setBrokerUserForm({
      ...brokerUserForm,
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
    setBrokerUserForm({
      ...brokerUserForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
  };

  const handleChangeName = (event: any) => {
    setBrokerUserForm({
      ...brokerUserForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setBrokerUserForm({
      ...brokerUserForm,
      paternalLastName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setBrokerUserForm({
      ...brokerUserForm,
      maternalLastName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setBrokerUserForm({
      ...brokerUserForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangeProfile = (event: any) => {
    setBrokerUserForm({
      ...brokerUserForm,
      profileCode: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
      profileName: {
        value: event.target.options[event.target.selectedIndex].text,
        isValid: event.target.options[event.target.selectedIndex].text !== "",
      },
    });
  };

  const handleSaveUser = () => {
    setShowModal(false);
    saveUser();
  };

  useEffect(() => {
    setEnabledButton(
      brokerUserForm?.rut.isValid &&
        brokerUserForm?.name.isValid &&
        brokerUserForm?.paternalLastName.isValid &&
        brokerUserForm?.maternalLastName.isValid &&
        brokerUserForm?.email.isValid &&
        brokerUserForm?.profileCode.isValid &&
        brokerUserForm?.profileName.isValid
    );
  }, [brokerUserForm]);

  return (
    <ContentCell gap="30px" align="center" className={styles.userForm}>
      <ContentCell gap="5px">
        <ContentRow gap="5px" className={styles.userForm}>
          <InputText
            label="Rut"
            width="100%"
            maxLength={10}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            value={""}
            onChange={handleChangeRut}
            isValid={brokerUserForm?.rut.isValid}
          />
          <ComboBox
            id="cmbProfile"
            label="Perfil"
            width="100%"
            value={""}
            onChange={handleChangeProfile}
            placeHolder=":: Seleccione Perfil ::"
            data={profileData}
            dataValue="id"
            dataText="name"
          />
        </ContentRow>
        <InputText
          label="Nombres"
          width="100%"
          value={""}
          onChange={handleChangeName}
          isValid={brokerUserForm?.name.isValid}
        />
        <ContentRow gap="5px" className={styles.userForm}>
          <InputText
            label="Apellido paterno"
            width="100%"
            value={""}
            onChange={handleChangePaternalLastName}
            isValid={brokerUserForm?.paternalLastName.isValid}
          />
          <InputText
            label="Apellido materno"
            width="100%"
            value={""}
            onChange={handleChangeMaternalLastName}
            isValid={brokerUserForm?.maternalLastName.isValid}
          />
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            label="Correo electrónico"
            width="100%"
            value={""}
            onChange={handleChangeEmail}
            isValid={brokerUserForm?.email.isValid}
          />
        </ContentRow>
      </ContentCell>
      <Button
        text="Registrar"
        width="200px"
        onClick={handleSaveUser}
        enabled={enabledButton}
      />
    </ContentCell>
  );
};

export default BrokerUsersItem;
