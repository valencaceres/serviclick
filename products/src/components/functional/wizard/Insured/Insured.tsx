import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Body, Content, Footer, Col, Row } from "@/components/layout/Generic";

import Button from "@/components/ui/Button/Button";
import ComboBox from "@/components/ui/ComboBox";
import InputText from "@/components/ui/InputText";
import Loading from "@/components/ui/Loading";
import Tooltip from "@/components/ui/Tooltip";

import { unFormatRut, formatRut } from "@/utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "@/utils/regEx";
import { rutValidate } from "@/utils/validations";

import {
  useUI,
  useDistrict,
  useInsured,
  useLead,
  useProduct,
  useContractor,
} from "@/store/hooks";

import { IFieldFormString } from "@/interfaces/form";

interface ICustomerForm {
  rut: IFieldFormString;
  birthDate: IFieldFormString;
  name: IFieldFormString;
  paternalLastName: IFieldFormString;
  maternalLastName: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
}

const Insured = () => {
  const router = useRouter();

  const initialDataForm = {
    birthDate: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const { ui } = useUI();
  const { getAllDistricts, districtList, districtIsLoading } = useDistrict();
  const { insured, getInsuredByRut } = useInsured();
  const {  contractor } = useContractor();
  const { createLead, setLead, lead, leadIsLoading } = useLead();
  const { product } = useProduct();

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedForm, setCompletedForm] = useState(false);
  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<ICustomerForm>({
    rut: {
      value:
        lead && lead.insured && lead.insured.length > 0
          ? lead.insured[0].rut
          : "",
      isValid: true,
    },
    ...initialDataForm,
  });

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const isValidEmail = (email: string) => {
    return emailRegEx.test(email) || email === "";
  };

  const isValidPhone = (phone: string) => {
    return phone.length === 9;
  };

  const setLeadInsured = (data: any) => {
    setLead({
      ...lead,
      user_id: ui.userId,
      insured: [
        {
          id: data.id || "",
          rut: data.rut,
          name: data.name,
          paternalLastName: data.paternalLastName,
          maternalLastName: data.maternalLastName,
          birthDate: data.birthDate,
          address: data.address,
          district: data.district,
          email: data.email,
          phone: data.phone,
          beneficiaries:
            lead && lead.insured && lead.insured.length > 0
              ? lead.insured[0].beneficiaries
              : [],
          values:
            lead && lead.insured && lead.insured.length > 0
              ? lead.insured[0].values
              : [],
        },
      ],
      subscription: false,
      send: false,
    });
  };

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setFormData({
      ...formData,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
    event.target.value !== "" && getInsuredByRut(event.target.value);
    setSearch(false);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setFormData({
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
      ...initialDataForm,
    });
  };

  const handleChangeBirthDate = (event: any) => {
    setFormData({
      ...formData,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    
    });
    setSearch(true);
  };

  const handleChangeName = (event: any) => {
    setFormData({
      ...formData,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
    setSearch(true);
  };

  const handleChangePaternalLastName = (event: any) => {
    setFormData({
      ...formData,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
    setSearch(true);
  };

  const handleChangeMaternalLastName = (event: any) => {
    setFormData({
      ...formData,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
    setSearch(true);
  };

  const handleChangeAddress = (event: any) => {
    setFormData({
      ...formData,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
    setSearch(true);
  };

  const handleChangeDistrict = (event: any) => {
    setFormData({
      ...formData,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
    setSearch(true);
  };

  const handleChangeEmail = (event: any) => {
    setFormData({
      ...formData,
      email: {
        value: event.target.value,
        isValid: isValidEmail(event.target.value),
      },
    });
    setSearch(true);
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setFormData({
        ...formData,
        phone: {
          value: event.target.value,
          isValid: isValidPhone(event.target.value),
        },
      });
      setSearch(true);
    } else {
      return;
    }
  };

  const handleClickRegister = () => {
    setIsProcessing(true);
    createLead({
      ...lead,
    });
  };

  useEffect(() => {
    getAllDistricts();
  }, []);
  
  useEffect(() => {
    const isValid =
      formData.birthDate.value !== "" &&
      formData.birthDate.isValid &&
      formData.rut.value !== "" &&
      formData.rut.isValid &&
      formData.name.value !== "" &&
      formData.name.isValid &&
      formData.paternalLastName.value !== "" &&
      formData.paternalLastName.isValid &&
      formData.maternalLastName.value !== "" &&
      formData.maternalLastName.isValid &&
      formData.address.value !== "" &&
      formData.address.isValid &&
      formData.district.value !== "" &&
      formData.district.isValid &&
      formData.email.value !== "" &&
      formData.email.isValid &&
      formData.phone.value !== "" &&
      formData.phone.isValid;

    setCompletedForm(isValid);

    if (isValid && search) {
      setLeadInsured({
        customerType: formData.birthDate.value,
        rut: formData.rut.value,
        birthDate: formData.birthDate.value,
        name: formData.name.value,
        paternalLastName: formData.paternalLastName.value,
        maternalLastName: formData.maternalLastName.value,
        address: formData.address.value,
        district: formData.district.value,
        email: formData.email.value,
        phone: formData.phone.value,
      });
      setSearch(false);
    }
  }, [formData]);

  useEffect(() => {
    if (lead && lead.insured && lead.insured.length > 0) {
      const {
        rut,
        birthDate,
        name,
        paternalLastName,
        maternalLastName,
        address,
        district,
        email,
        phone,
      } = lead.insured[0];

      setFormData({
        rut: { value: rut, isValid: true },
        birthDate: { value: birthDate, isValid: true },
        name: { value: name, isValid: true },
        paternalLastName: { value: paternalLastName, isValid: true },
        maternalLastName: { value: maternalLastName, isValid: true },
        address: { value: address, isValid: true },
        district: { value: district, isValid: true },
        email: { value: email, isValid: true },
        phone: { value: phone, isValid: true },
      });
    } else {
      const {
        rut,
        name,
        paternalLastName,
        maternalLastName,
        address,
        district,
        email,
        phone,
      } = lead.customer;
      const {
        birthDate
      } = contractor;
      setFormData({
        rut: { value: rut, isValid: true },
        birthDate: { value: birthDate ?? "", isValid: false },
        name: { value: name, isValid: true },
        paternalLastName: { value: paternalLastName, isValid: true },
        maternalLastName: { value: maternalLastName, isValid: true },
        address: { value: address, isValid: true },
        district: { value: district, isValid: true },
        email: { value: email, isValid: true },
        phone: { value: phone, isValid: true },
      });
    }
  }, [lead.insured]);

  useEffect(() => {
    if (lead.id !== "" && leadIsLoading === false && isProcessing === true) {
      router.push(
        `/${
          product.values.length > 0
            ? "product"
            : product.beneficiaries > 0
            ? "beneficiaries"
            : "payment"
        }?productPlanId=${ui.product.productPlan_id}&leadId=${lead.id}&userId=${ui.userId}`
      );
      setIsProcessing(false);
    }
  }, [lead.id, leadIsLoading, isProcessing]);

  useEffect(() => {
    if (insured.rut) {
      setLeadInsured(insured);
    }
  }, [insured.rut]);

  return (
    <Body>
      <Content>
        <Col width="340px">
          <Row align="space-between" width="100%">
            <InputText
              label="Rut"
              width="150px"
              value={formData?.rut.value}
              onChange={handleChangeRut}
              onBlur={handleBlurRut}
              onFocus={handleFocusRut}
              isValid={formData?.rut.isValid}
            />
            <InputText
              type="date"
              label="Fecha de nacimiento"
              width="150px"
              maxLength={10}
              value={formData?.birthDate.value}
              onChange={handleChangeBirthDate}
              isValid={formData?.birthDate.isValid}
            />
          </Row>
          <InputText
            label="Nombres"
            value={formData?.name.value}
            onChange={handleChangeName}
            isValid={formData?.name.isValid}
          />
          <InputText
            label="Apellido paterno"
            value={formData?.paternalLastName.value}
            onChange={handleChangePaternalLastName}
            isValid={formData?.paternalLastName.isValid}
          />
          <InputText
            label="Apellido materno"
            value={formData?.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
            isValid={formData?.maternalLastName.isValid}
          />
          <InputText
            label="Dirección"
            value={formData?.address.value}
            onChange={handleChangeAddress}
            isValid={formData?.address.isValid}
          />
          <ComboBox
            width="340px"
            label="Comuna"
            placeHolder=":: Seleccione comuna ::"
            value={formData?.district.value}
            onChange={handleChangeDistrict}
            data={districtList}
            dataValue="district_name"
            dataText="district_name"
          />
          <InputText
            type="email"
            maxLength={250}
            width="340px"
            label="Correo electrónico"
            value={formData?.email.value}
            onChange={handleChangeEmail}
            isValid={formData?.email.isValid}
          />
          <InputText
            type="tel"
            maxLength={9}
            width="150px"
            label="Teléfono"
            value={formData?.phone.value}
            onChange={handleChangePhone}
            isValid={formData?.phone.isValid}
          />
        </Col>
      </Content>
      <Footer>
        <Button
          text="Registrar"
          onClick={handleClickRegister}
          width="200px"
          enabled={completedForm}></Button>
      </Footer>
      {(districtIsLoading || leadIsLoading) && <Loading />}
      <Tooltip>
        <h1>Datos del Beneficiario</h1>
        <h2>(Paso 2 de 4)</h2>
        <br />
        ¿Es para tí este producto o lo estás adquiriendo para otra persona?, si
        es para ti, indicanos tu fecha de nacimienrto y presiona&nbsp;
        <b>&quot;Registrar&quot;</b>&nbsp;para continuar.
        <br />
        <br />
        Si es para otra persona, llena este formulario con sus datos y
        finalmente presiona&nbsp;<b>&quot;Registrar&quot;</b>&nbsp;para
        continuar.
      </Tooltip>
    </Body>
  );
};

export default Insured;
