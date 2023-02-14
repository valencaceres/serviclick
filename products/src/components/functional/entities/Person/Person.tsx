import { useState, useEffect } from "react";

import { Content, Col, Row, Footer } from "../../../layout/Generic";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import CustomerType from "../../../ui/CustomerType";
import Loading from "../../../ui/Loading";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict } from "../../../../store/hooks";

import {
  IFieldFormCustomerType,
  IFieldFormString,
} from "../../../../interfaces/form";

interface ICustomerForm {
  customerType: IFieldFormCustomerType;
  rut: IFieldFormString;
  name: IFieldFormString;
  paternalLastName: IFieldFormString;
  maternalLastName: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
}

const Person = ({ data, setData, setCompletedForm, getByRut }: any) => {
  const initialDataForm = {
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const { getAllDistricts, districtList, districtIsLoading } = useDistrict();

  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<ICustomerForm>({
    customerType: { value: "p", isValid: true },
    rut: { value: data.rut || "", isValid: true },
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

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setFormData({
      ...formData,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
    getByRut(event.target.value);
    setSearch(false);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setFormData({
      customerType: { value: "p", isValid: true },
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
      ...initialDataForm,
    });
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

  useEffect(() => {
    getAllDistricts();
  }, []);

  useEffect(() => {
    const isValid =
      formData.customerType.value === "p" &&
      formData.customerType.isValid &&
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
      setData({
        customerType: formData.customerType.value,
        rut: formData.rut.value,
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
    setFormData({
      customerType: { value: "p", isValid: true },
      rut: { value: data.rut, isValid: true },
      name: { value: data.name, isValid: true },
      paternalLastName: { value: data.paternalLastName, isValid: true },
      maternalLastName: { value: data.maternalLastName, isValid: true },
      address: { value: data.address, isValid: true },
      district: { value: data.district, isValid: true },
      email: { value: data.email, isValid: true },
      phone: { value: data.phone, isValid: true },
    });
  }, [data]);

  return districtIsLoading ? (
    <Loading />
  ) : (
    <Col width="340px">
      <Row align="space-between">
        <InputText
          label="Rut"
          width="150px"
          value={formData?.rut.value}
          onChange={handleChangeRut}
          onBlur={handleBlurRut}
          onFocus={handleFocusRut}
          isValid={formData?.rut.isValid}
        />
        <CustomerType value="p" />
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
  );
};

export default Person;
