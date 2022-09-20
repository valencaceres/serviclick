import { useEffect } from "react";

import InputText from "../../../ui/InputText";

import { Component, Row, Cell } from "../../../layout/Component";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { resetSubscription } from "../../../../redux/slices/subscriptionSlice";
import {
  getLeadBySubscriptionId,
  resetLeadSubscription,
} from "../../../../redux/slices/leadSlice";

const CompanyForm = ({ companyForm, setCompanyForm, disabled }: any) => {
  const dispatch = useAppDispatch();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { subscription } = useAppSelector((state) => state.subscriptionSlice);
  const { lead } = useAppSelector((state) => state.leadSlice);

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setCompanyForm({
      ...companyForm,
      rut: {
        value: event.target.value,
        isValid:
          (rutRegEx.test(event.target.value) &&
            event.target.value.length > 7 &&
            rutValidate(event.target.value)) ||
          event.target.value === "",
      },
    });
  };

  const handleChangeCompanyName = (event: any) => {
    setCompanyForm({
      ...companyForm,
      companyName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLegalRepresentative = (event: any) => {
    setCompanyForm({
      ...companyForm,
      legalRepresentative: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeLine = (event: any) => {
    setCompanyForm({
      ...companyForm,
      line: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setCompanyForm({
      ...companyForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setCompanyForm({
      ...companyForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setCompanyForm({
      ...companyForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
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
    if (subscription.id > 0) {
      dispatch(getLeadBySubscriptionId(subscription.id));
    }
  }, [dispatch, subscription]);

  useEffect(() => {
    if (lead.company.id !== "") {
      setCompanyForm({
        id: { value: lead.company.id, isValid: true },
        rut: { value: lead.company.rut, isValid: true },
        companyName: { value: lead.company.companyName, isValid: true },
        legalRepresentative: {
          value: lead.company.legalRepresentative,
          isValid: true,
        },
        line: {
          value: lead.company.line,
          isValid: true,
        },
        address: { value: lead.company.address, isValid: true },
        district: { value: lead.company.district, isValid: true },
        email: { value: lead.company.email, isValid: true },
        phone: { value: lead.company.phone, isValid: true },
      });
      dispatch(resetSubscription());
      dispatch(resetLeadSubscription());
    }
  }, [dispatch, lead.company, setCompanyForm]);

  return (
    <Component width={isDesktop ? "560px" : "100%"}>
      <Row>
        <Cell align="left">
          <InputText
            label="Rut"
            width={isDesktop ? "140px" : "100%"}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={companyForm?.rut.value}
            onChange={handleChangeRut}
            isValid={companyForm?.rut.isValid}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Razón Social"
            width="100%"
            maxLength={50}
            value={companyForm?.companyName.value}
            onChange={handleChangeCompanyName}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Representante Legal"
            width="100%"
            maxLength={50}
            value={companyForm?.legalRepresentative.value}
            onChange={handleChangeLegalRepresentative}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Giro"
            width="100%"
            maxLength={50}
            value={companyForm?.line.value}
            onChange={handleChangeLine}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="100%"
            maxLength={250}
            value={companyForm?.address.value}
            onChange={handleChangeAddress}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Comuna"
            width="100%"
            maxLength={250}
            value={companyForm?.district.value}
            onChange={handleChangeDistrict}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            width="100%"
            type="email"
            maxLength={250}
            value={companyForm?.email.value}
            onChange={handleChangeEmail}
            isValid={companyForm?.email.isValid}
            disabled={disabled}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="100%"
            type="tel"
            maxLength={9}
            value={companyForm?.phone.value}
            onChange={handleChangePhone}
            isValid={companyForm?.phone.isValid}
            disabled={disabled}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default CompanyForm;
