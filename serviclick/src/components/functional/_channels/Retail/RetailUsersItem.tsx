import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { emailRegEx } from "../../../../utils/regEx";
import { isValidRut } from "../../../../utils/validations";

import styles from "./Retail.module.scss";
import ButtonIcon from "../../../ui/ButtonIcon";

import { useRetail } from "../../../../hooks";

const RetailUsersItem = ({
  retailUserForm,
  setRetailUserForm,
  saveUser,
  setShowModal,
  sendCredentials,
}: any) => {
  const { retail } = useRetail();

  const profileData = [
    { id: "S", name: "Vendedor" },
    { id: "A", name: "Administrador" },
  ];

  const [enabledButton, setEnabledButton] = useState(false);

  const handleBlurRut = (event: any) => {
    const isValid = isValidRut(event.target.value);

    event.target.value = formatRut(event.target.value);

    setRetailUserForm({
      ...retailUserForm,
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
    setRetailUserForm({
      ...retailUserForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
  };

  const handleChangeName = (event: any) => {
    setRetailUserForm({
      ...retailUserForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setRetailUserForm({
      ...retailUserForm,
      paternalLastName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setRetailUserForm({
      ...retailUserForm,
      maternalLastName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setRetailUserForm({
      ...retailUserForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangeProfile = (event: any) => {
    setRetailUserForm({
      ...retailUserForm,
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
      retailUserForm.rut.isValid &&
        retailUserForm.name.isValid &&
        retailUserForm.paternalLastName.isValid &&
        retailUserForm.maternalLastName.isValid &&
        retailUserForm.email.isValid &&
        retailUserForm.profileCode.isValid &&
        retailUserForm.profileName.isValid
    );
  }, [retailUserForm]);

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
            value={retailUserForm.rut.value}
            onChange={handleChangeRut}
            isValid={retailUserForm.rut.isValid}
          />
          <ComboBox
            id="cmbProfile"
            label="Perfil"
            width="100%"
            value={retailUserForm.profileCode.value}
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
          value={retailUserForm.name.value}
          onChange={handleChangeName}
          isValid={retailUserForm.name.isValid}
        />
        <ContentRow gap="5px" className={styles.userForm}>
          <InputText
            label="Apellido paterno"
            width="100%"
            value={retailUserForm.paternalLastName.value}
            onChange={handleChangePaternalLastName}
            isValid={retailUserForm.paternalLastName.isValid}
          />
          <InputText
            label="Apellido materno"
            width="100%"
            value={retailUserForm.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
            isValid={retailUserForm.maternalLastName.isValid}
          />
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            label="Correo electrónico"
            width="100%"
            value={retailUserForm.email.value}
            onChange={handleChangeEmail}
            isValid={retailUserForm.email.isValid}
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

export default RetailUsersItem;
