import { useState, useEffect } from "react";

import { Component, Row, Cell } from "../../layout/Component";

import InputText from "../../ui/InputText";

import { setCompany } from "../../../redux/slices/companySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { numberRegEx } from "../../../utils/regEx";

const Company = ({ setIsEnabled }: any) => {
  const dispatch = useAppDispatch();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { userCompany } = useAppSelector((state) => state.userCompanySlice);

  const initialDataCompanyForm = {
    rut: { value: userCompany.rut, isValid: userCompany.rut !== "" },
    companyName: {
      value: userCompany.companyName,
      isValid: userCompany.companyName !== "",
    },
    legalRepresentative: {
      value: userCompany.legalRepresentative,
      isValid: userCompany.legalRepresentative !== "",
    },
    line: {
      value: userCompany.line,
      isValid: userCompany.line !== "",
    },
    address: {
      value: userCompany.address,
      isValid: userCompany.address !== "",
    },
    district: {
      value: userCompany.district,
      isValid: userCompany.district !== "",
    },
    email: { value: userCompany.email, isValid: userCompany.email !== "" },
    phone: { value: userCompany.phone, isValid: userCompany.phone !== "" },
  };

  const [companyForm, setCompanyForm] = useState(initialDataCompanyForm);

  const handleChangeCompanyName = (event: any) => {
    setCompanyForm({
      ...companyForm,
      companyName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLegalRepresentative = (event: any) => {
    setCompanyForm({
      ...companyForm,
      legalRepresentative: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };
  const handleChangeLine = (event: any) => {
    setCompanyForm({
      ...companyForm,
      line: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setCompanyForm({
      ...companyForm,
      address: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };
  const handleChangeDistrict = (event: any) => {
    setCompanyForm({
      ...companyForm,
      district: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setCompanyForm({
        ...companyForm,
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
      companyForm.rut.isValid &&
      companyForm.companyName.isValid &&
      companyForm.legalRepresentative.isValid &&
      companyForm.line.isValid &&
      companyForm.address.isValid &&
      companyForm.district.isValid &&
      companyForm.email.isValid &&
      companyForm.phone.isValid
    ) {
      dispatch(
        setCompany({
          ...userCompany,
          rut: companyForm.rut.value,
          companyName: companyForm.companyName.value,
          legalRepresentative: companyForm.legalRepresentative.value,
          line: companyForm.line.value,
          address: companyForm.address.value,
          district: companyForm.district.value,
          email: companyForm.email.value,
          phone: companyForm.phone.value,
        })
      );
      setIsEnabled(true);
    }
  }, [companyForm, dispatch, setIsEnabled, userCompany]);

  return (
    <Component width={isDesktop ? "560px" : "100%"}>
      <Row>
        <Cell>
          <InputText
            label="Rut"
            width={isDesktop ? "140px" : "100%"}
            maxLength={9}
            value={companyForm.rut.value}
            onChange={() => {}}
            disabled={true}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Razón Social"
            width="100%"
            maxLength={50}
            value={companyForm.companyName.value}
            onChange={handleChangeCompanyName}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Representante Legal"
            width="100%"
            maxLength={50}
            value={companyForm.legalRepresentative.value}
            onChange={handleChangeLegalRepresentative}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Giro"
            width="100%"
            maxLength={50}
            value={companyForm.line.value}
            onChange={handleChangeLine}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="100%"
            maxLength={250}
            value={companyForm.address.value}
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
            value={companyForm.district.value}
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
            value={companyForm.email.value}
            onChange={() => {}}
            disabled={true}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="100%"
            maxLength={9}
            value={companyForm.phone.value}
            onChange={handleChangePhone}
            isValid={companyForm.phone.isValid}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default Company;
