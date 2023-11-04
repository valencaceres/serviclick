import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import { LoadingMessage } from "../../../ui/LoadingMessage";

import { unFormatRut, formatRut } from "../../../../utils/rut";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict } from "../../../../hooks";
import { useSpecialist } from "../../../../store/hooks";

const SpecialistForm = ({ setEnableSave }: any) => {
  const { list: districtList } = useDistrict();
  const { getSpecialistByRut, setSpecialist, specialist, specialistIsLoading } =
    useSpecialist();

  const initialDataPersonForm = {
    rut: { value: specialist.rut, isValid: true },
    name: { value: specialist.name, isValid: true },
    paternalLastName: {
      value: specialist.paternalLastName,
      isValid: true,
    },
    maternalLastName: {
      value: specialist.maternalLastName,
      isValid: true,
    },
    birthDate: { value: specialist.birthDate, isValid: true },
    address: { value: specialist.address, isValid: true },
    district: { value: specialist.district, isValid: true },
    email: { value: specialist.email, isValid: true },
    phone: { value: specialist.phone, isValid: true },
  };

  const [personForm, setPersonForm] = useState(initialDataPersonForm);
  const [isSearching, setIsSearching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const handleBlurRut = (event: any) => {
    if (
      event.target.value !== "" &&
      rutValidate(unFormatRut(event.target.value))
    ) {
      event.target.value = formatRut(event.target.value);
      setIsSearching(true);
      setPersonForm({
        ...personForm,
        rut: {
          value: event.target.value,
          isValid: isValidRut(event.target.value),
        },
      });
      getSpecialistByRut(event.target.value);
    }
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setPersonForm({
      ...personForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
  };

  const handleChangeName = (event: any) => {
    setPersonForm({
      ...personForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setPersonForm({
      ...personForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setPersonForm({
      ...personForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeBirthDate = (event: any) => {
    setPersonForm({
      ...personForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setPersonForm({
      ...personForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setPersonForm({
      ...personForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setPersonForm({
      ...personForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setPersonForm({
        ...personForm,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  const refreshSpecialistState = () => {
    setSpecialist({
      ...specialist,
      rut: personForm.rut.value,
      name: personForm.name.value,
      paternalLastName: personForm.paternalLastName.value,
      maternalLastName: personForm.maternalLastName.value,
      birthDate: personForm.birthDate.value,
      address: personForm.address.value,
      district: personForm.district.value,
      email: personForm.email.value,
      phone: personForm.phone.value,
    });
  };

  const refreshSpecialistFormData = () => {
    setPersonForm({
      rut: { value: specialist.rut, isValid: true },
      name: { value: specialist.name, isValid: true },
      paternalLastName: {
        value: specialist.paternalLastName,
        isValid: true,
      },
      maternalLastName: {
        value: specialist.maternalLastName,
        isValid: true,
      },
      birthDate: { value: specialist.birthDate, isValid: true },
      address: { value: specialist.address, isValid: true },
      district: { value: specialist.district, isValid: true },
      email: { value: specialist.email, isValid: true },
      phone: { value: specialist.phone, isValid: true },
    });
  };

  useEffect(() => {
    setEnableSave(false);
    if (
      personForm.rut.isValid &&
      personForm.email.isValid &&
      personForm.phone.isValid &&
      personForm.rut.value !== "" &&
      personForm.name.value !== "" &&
      personForm.paternalLastName.value !== "" &&
      personForm.maternalLastName.value !== "" &&
      personForm.birthDate.value !== "" &&
      personForm.address.value !== "" &&
      personForm.district.value !== "" &&
      personForm.email.value !== "" &&
      personForm.phone.value !== ""
    ) {
      refreshSpecialistState();
      setEnableSave(true);
    }
  }, [
    personForm.rut.value,
    personForm.email.value,
    personForm.phone.value,
    personForm.rut.value,
    personForm.name.value,
    personForm.paternalLastName.value,
    personForm.maternalLastName.value,
    personForm.birthDate.value,
    personForm.address.value,
    personForm.district.value,
    personForm.email.value,
    personForm.phone.value,
  ]);

  useEffect(() => {
    if (specialistIsLoading === false && isProcessing === true) {
      refreshSpecialistFormData();
      setIsProcessing(false);
    }
  }, [specialistIsLoading, isProcessing]);

  useEffect(() => {
    if (isSearching === true && specialistIsLoading === false) {
      setPersonForm({
        rut: { value: specialist.rut, isValid: true },
        name: { value: specialist.name, isValid: true },
        paternalLastName: {
          value: specialist.paternalLastName,
          isValid: true,
        },
        maternalLastName: {
          value: specialist.maternalLastName,
          isValid: true,
        },
        birthDate: { value: specialist.birthDate, isValid: true },
        address: { value: specialist.address, isValid: true },
        district: { value: specialist.district, isValid: true },
        email: { value: specialist.email, isValid: true },
        phone: { value: specialist.phone, isValid: true },
      });
      setIsSearching(false);
    }
  }, [isSearching, specialistIsLoading]);

  useEffect(() => {
    if (specialist.rut !== "") {
      refreshSpecialistFormData();
    }
  }, [specialist]);

  return (
    <ContentCell gap="5px">
      <ContentRow gap="20px">
        <InputText
          label="Rut"
          width={"150px"}
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={9}
          value={personForm?.rut.value}
          onChange={handleChangeRut}
          isValid={personForm?.rut.isValid}
        />
        <InputText
          type="date"
          label="Fecha de nacimiento"
          width={"150px"}
          maxLength={10}
          value={personForm?.birthDate.value}
          onChange={handleChangeBirthDate}
          isValid={personForm?.birthDate.isValid}
        />
      </ContentRow>
      <InputText
        label="Nombres"
        width="100%"
        maxLength={50}
        value={personForm?.name.value}
        onChange={handleChangeName}
      />
      <InputText
        label="Apellido Paterno"
        width="100%"
        maxLength={50}
        value={personForm?.paternalLastName.value}
        onChange={handleChangePaternalLastName}
      />
      <InputText
        label="Apellido Materno"
        width="100%"
        maxLength={50}
        value={personForm?.maternalLastName.value}
        onChange={handleChangeMaternalLastName}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={personForm?.address.value}
        onChange={handleChangeAddress}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={personForm?.district.value}
        onChange={handleChangeDistrict}
        placeHolder=":: Seleccione comuna ::"
        data={districtList}
        dataValue="district_name"
        dataText="district_name"
      />
      <InputText
        label="Correo"
        width="100%"
        type="email"
        maxLength={250}
        value={personForm?.email.value}
        onChange={handleChangeEmail}
        isValid={personForm?.email.isValid}
      />
      <InputText
        label="Teléfono"
        width="100%"
        type="tel"
        maxLength={9}
        value={personForm?.phone.value}
        onChange={handleChangePhone}
        isValid={personForm?.phone.isValid}
      />
    </ContentCell>
  );
};

export default SpecialistForm;
