import { useState, useEffect } from "react";

import { Row, Col } from "../../layout/Generic";

import Button from "../../ui/Button";
import Tooltip from "../../ui/Tooltip";
import InputText from "../../ui/InputText";

import { useUser } from "../../../zustand/hooks";

import { numberRegEx } from "../../../utils/regEx";

const Insured = () => {
  const { user } = useUser()

  const initialDataInsuredForm = {
    rut: { value: user.rut || '', isValid: user.rut !== "" },
    name: { value: user.name || '', isValid: user.name !== "" },
    paternalLastName: {
      value: user.paternallastname || '',
      isValid: user.paternallastname !== "",
    },
    maternalLastName: {
      value: user.maternallastname || '',
      isValid: user.maternallastname !== "",
    },
    birthDate: {
      value: user.birthdate || '',
      isValid: user.birthdate !== "",
    },
    address: {
      value: user.address || '',
      isValid: user.address !== "",
    },
    district: {
      value: user.district || '',
      isValid: user.district !== "",
    },
    email: { value: user.email || '', isValid: user.email !== "" },
    phone: { value: user.phone || '', isValid: user.phone !== "" },
  };
  
  const [insuredForm, setInsuredForm] = useState(initialDataInsuredForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleChangeName = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      paternalLastName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      maternalLastName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeBirthDate = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      address: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setInsuredForm({
      ...insuredForm,
      district: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setInsuredForm({
        ...insuredForm,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickRegister = () => {};

  useEffect(() => {
    setIsEnabled(
      insuredForm.rut.isValid &&
        insuredForm.rut.value !== "" &&
        insuredForm.name.isValid &&
        insuredForm.name.value !== "" &&
        insuredForm.paternalLastName.isValid &&
        insuredForm.paternalLastName.value !== "" &&
        insuredForm.maternalLastName.isValid &&
        insuredForm.maternalLastName.value !== "" &&
        insuredForm.address.isValid &&
        insuredForm.address.value !== "" &&
        insuredForm.district.isValid &&
        insuredForm.district.value !== "" &&
        insuredForm.email.isValid &&
        insuredForm.email.value !== "" &&
        insuredForm.phone.isValid &&
        insuredForm.phone.value !== "" &&
        insuredForm.birthDate.isValid &&
        insuredForm.birthDate.value !== ""
    );
  }, [insuredForm]);

  return (
    <Col width="320px" gap="20px">
      <Col gap="5px">
        <Row gap="5px">
          <InputText
            label="Rut"
            width={"100%"}
            maxLength={9}
            value={insuredForm.rut.value}
            onChange={() => {}}
            disabled={true}
          />
          <InputText
            label="Fecha de nacimiento"
            type="date"
            width={"100%"}
            maxLength={10}
            value={insuredForm.birthDate.value}
            onChange={handleChangeBirthDate}
          />
        </Row>
        <InputText
          label="Nombres"
          width="100%"
          maxLength={50}
          value={insuredForm.name.value}
          onChange={handleChangeName}
        />
        <InputText
          label="Apellido Paterno"
          width="100%"
          maxLength={50}
          value={insuredForm.paternalLastName.value}
          onChange={handleChangePaternalLastName}
        />
        <InputText
          label="Apellido Materno"
          width="100%"
          maxLength={50}
          value={insuredForm.maternalLastName.value}
          onChange={handleChangeMaternalLastName}
        />
        <InputText
          label="Dirección"
          width="100%"
          maxLength={250}
          value={insuredForm.address.value}
          onChange={handleChangeAddress}
        />
        <InputText
          label="Comuna"
          width="100%"
          maxLength={250}
          value={insuredForm.district.value}
          onChange={handleChangeDistrict}
        />
        <InputText
          label="Correo"
          width="100%"
          maxLength={250}
          value={insuredForm.email.value}
          onChange={() => {}}
          disabled={true}
        />
        <InputText
          label="Teléfono"
          width="100%"
          maxLength={9}
          value={insuredForm.phone.value}
          onChange={handleChangePhone}
          isValid={insuredForm.phone.isValid}
        />
      </Col>
      <Button
        onClick={handleClickRegister}
        text="Registrar"
        width="150px"
        loading={isLoading}
        enabled={isEnabled}
      />
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Mediante esta opción podrás modificar tus datos en caso que lo
          requieras.
          <br />
          <br />
          <b>Nota:</b>&nbsp;No podrás modificar tu rut ni tu correo ya que con
          ellos podemos identificarte.
        </div>
      </Tooltip>
    </Col>
  );
};

export default Insured;
