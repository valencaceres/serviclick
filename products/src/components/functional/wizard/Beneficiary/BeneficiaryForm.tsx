import { Col, Row } from "@/components/layout/Generic";

import InputText from "@/components/ui/InputText";
import ComboBox from "@/components/ui/ComboBox";

import { unFormatRut, formatRut } from "@/utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "@/utils/regEx";
import { rutValidate } from "@/utils/validations";

import { useDistrict, useRelationship, useBeneficiary } from "@/store/hooks";

type BeneficiaryT = {
  getByRut: any;
  initialDataForm: any;
  formData: any;
  setFormData: any;
};

const BeneficiaryForm = ({
  getByRut,
  initialDataForm,
  formData,
  setFormData,
}: BeneficiaryT) => {
  const { districtList } = useDistrict();
  const { relationshipList } = useRelationship();

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
    getByRut && getByRut(event.target.value);
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
  };

  const handleChangeName = (event: any) => {
    setFormData({
      ...formData,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setFormData({
      ...formData,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setFormData({
      ...formData,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };
  const handleChangeAddress = (event: any) => {
    setFormData({
      ...formData,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setFormData({
      ...formData,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setFormData({
      ...formData,
      email: {
        value: event.target.value,
        isValid: isValidEmail(event.target.value),
      },
    });
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
    } else {
      return;
    }
  };

  const handleChangeRelationship = (event: any) => {
    setFormData({
      ...formData,
      relationship: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  return (
    <Col width="340px">
      <Row align="space-between" width="100%">
        <InputText
          label="Rut"
          width="150px"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={formData?.rut.value}
          onChange={handleChangeRut}
          isValid={formData?.rut.isValid}
        />
        <InputText
          label="Fecha de nacimiento"
          type="date"
          width="150px"
          maxLength={10}
          value={formData?.birthDate.value}
          onChange={handleChangeBirthDate}
          isValid={formData?.birthDate.isValid}
        />
      </Row>
      <InputText
        label="Nombres"
        width="100%"
        maxLength={50}
        value={formData?.name.value}
        onChange={handleChangeName}
      />
      <Row gap="5px">
        <InputText
          label="Apellido Paterno"
          width="100%"
          maxLength={50}
          value={formData?.paternalLastName.value}
          onChange={handleChangePaternalLastName}
        />
        <InputText
          label="Apellido Materno"
          width="100%"
          maxLength={50}
          value={formData?.maternalLastName.value}
          onChange={handleChangeMaternalLastName}
        />
      </Row>
      {/* <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={formData?.address.value}
        onChange={handleChangeAddress}
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
      /> */}
      <InputText
        label="Correo"
        width="100%"
        type="email"
        maxLength={250}
        value={formData?.email.value}
        onChange={handleChangeEmail}
        isValid={formData?.email.isValid}
      />
      <InputText
        label="Teléfono"
        width="100%"
        type="tel"
        maxLength={9}
        value={formData?.phone.value}
        onChange={handleChangePhone}
        isValid={formData?.phone.isValid}
      />
      <ComboBox
        width="340px"
        label="Parentesco"
        placeHolder=":: Seleccione parentesco ::"
        value={formData?.relationship.value}
        onChange={handleChangeRelationship}
        data={relationshipList}
        dataValue="name"
        dataText="name"
      />
    </Col>
  );
};

export default BeneficiaryForm;
