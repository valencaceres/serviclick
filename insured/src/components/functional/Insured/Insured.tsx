import { useState, useEffect } from "react";

import { Component, Row, Cell } from "../../layout/Component";

import InputText from "../../ui/InputText";

import { setInsured } from "../../../redux/slices/insuredSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { numberRegEx } from "../../../utils/regEx";

const Insured = ({ setIsEnabled }: any) => {
  const dispatch = useAppDispatch();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { userInsured } = useAppSelector((state) => state.userInsuredSlice);

  const initialDataInsuredForm = {
    rut: { value: userInsured.rut, isValid: userInsured.rut !== "" },
    name: { value: userInsured.name, isValid: userInsured.name !== "" },
    paternalLastName: {
      value: userInsured.paternalLastName,
      isValid: userInsured.paternalLastName !== "",
    },
    maternalLastName: {
      value: userInsured.maternalLastName,
      isValid: userInsured.maternalLastName !== "",
    },
    birthDate: {
      value: userInsured.birthDate,
      isValid: userInsured.birthDate !== "",
    },
    address: {
      value: userInsured.address,
      isValid: userInsured.address !== "",
    },
    district: {
      value: userInsured.district,
      isValid: userInsured.district !== "",
    },
    email: { value: userInsured.email, isValid: userInsured.email !== "" },
    phone: { value: userInsured.phone, isValid: userInsured.phone !== "" },
  };

  const [insuredForm, setInsuredForm] = useState(initialDataInsuredForm);

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

  useEffect(() => {
    setIsEnabled(false);
    if (
      insuredForm.rut.isValid &&
      insuredForm.name.isValid &&
      insuredForm.paternalLastName.isValid &&
      insuredForm.maternalLastName.isValid &&
      insuredForm.birthDate.isValid &&
      insuredForm.address.isValid &&
      insuredForm.district.isValid &&
      insuredForm.email.isValid &&
      insuredForm.phone.isValid
    ) {
      dispatch(
        setInsured({
          ...userInsured,
          rut: insuredForm.rut.value,
          name: insuredForm.name.value,
          paternalLastName: insuredForm.paternalLastName.value,
          maternalLastName: insuredForm.maternalLastName.value,
          birthDate: insuredForm.birthDate.value,
          address: insuredForm.address.value,
          district: insuredForm.district.value,
          email: insuredForm.email.value,
          phone: insuredForm.phone.value,
        })
      );
      setIsEnabled(true);
    }
  }, [insuredForm, dispatch]);

  return (
    <Component width={isDesktop ? "560px" : "100%"}>
      <Row>
        <Cell>
          <InputText
            label="Rut"
            width={"100%"}
            maxLength={9}
            value={insuredForm.rut.value}
            onChange={() => {}}
            disabled={true}
          />
        </Cell>
        <Cell>
          <InputText
            label="Fecha de nacimiento"
            type="date"
            width={"100%"}
            maxLength={10}
            value={insuredForm.birthDate.value}
            onChange={handleChangeBirthDate}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Nombres"
            width="100%"
            maxLength={50}
            value={insuredForm.name.value}
            onChange={handleChangeName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Apellido Paterno"
            width="100%"
            maxLength={50}
            value={insuredForm.paternalLastName.value}
            onChange={handleChangePaternalLastName}
          />
        </Cell>
        <Cell>
          <InputText
            label="Apellido Materno"
            width="100%"
            maxLength={50}
            value={insuredForm.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="100%"
            maxLength={250}
            value={insuredForm.address.value}
            onChange={handleChangeAddress}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Comuna"
            width="100%"
            maxLength={250}
            value={insuredForm.district.value}
            onChange={handleChangeDistrict}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            width="100%"
            maxLength={250}
            value={insuredForm.email.value}
            onChange={() => {}}
            disabled={true}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="100%"
            maxLength={9}
            value={insuredForm.phone.value}
            onChange={handleChangePhone}
            isValid={insuredForm.phone.isValid}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default Insured;
