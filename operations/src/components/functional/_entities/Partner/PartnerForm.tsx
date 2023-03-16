import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import { LoadingMessage } from "../../../ui/LoadingMessage";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict } from "../../../../hooks";
import { usePartner } from "../../../../store/hooks";

const PartnerForm = ({ setEnableSave }: any) => {
  const { list: districtList } = useDistrict();
  const { getPartnerByRut, setPartner, partner, partnerIsLoading } =
    usePartner();

  const initialDataPersonForm = {
    rut: { value: partner.rut, isValid: true },
    name: { value: partner.name, isValid: true },
    legalrepresentative: {
      value: partner.legalrepresentative,
      isValid: true,
    },
    line: { value: partner.line, isValid: true },
    address: { value: partner.address, isValid: true },
    district: { value: partner.district, isValid: true },
    email: { value: partner.email, isValid: true },
    phone: { value: partner.phone, isValid: true },
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
      getPartnerByRut(event.target.value);
    }
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setPersonForm({
      name: { value: "", isValid: true },
      legalrepresentative: { value: "", isValid: true },
      line: { value: "", isValid: true },
      address: { value: "", isValid: true },
      district: { value: "", isValid: true },
      email: { value: "", isValid: true },
      phone: { value: "", isValid: true },
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

  const handleChangeLegalrelegalrepresentative = (event: any) => {
    setPersonForm({
      ...personForm,
      legalrepresentative: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setPersonForm({
      ...personForm,
      line: {
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

  const refreshPartnerState = () => {
    setPartner({
      ...partner,
      rut: personForm.rut.value,
      name: personForm.name.value,
      legalrepresentative: personForm.legalrepresentative.value,
      line: personForm.line.value,
      address: personForm.address.value,
      district: personForm.district.value,
      email: personForm.email.value,
      phone: personForm.phone.value,
    });
  };

  const refreshPartnerFormData = () => {
    setPersonForm({
      rut: { value: partner.rut, isValid: true },
      name: { value: partner.name, isValid: true },
      legalrepresentative: {
        value: partner.legalrepresentative,
        isValid: true,
      },
      line: {
        value: partner.line,
        isValid: true,
      },
      address: { value: partner.address, isValid: true },
      district: { value: partner.district, isValid: true },
      email: { value: partner.email, isValid: true },
      phone: { value: partner.phone, isValid: true },
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
      personForm.legalrepresentative.value !== "" &&
      personForm.line.value !== "" &&
      personForm.address.value !== "" &&
      personForm.district.value !== "" &&
      personForm.email.value !== "" &&
      personForm.phone.value !== ""
    ) {
      refreshPartnerState();
      setEnableSave(true);
    }
  }, [
    personForm.rut.value,
    personForm.email.value,
    personForm.phone.value,
    personForm.rut.value,
    personForm.name.value,
    personForm.legalrepresentative.value,
    personForm.line.value,
    personForm.address.value,
    personForm.district.value,
    personForm.email.value,
    personForm.phone.value,
  ]);

  useEffect(() => {
    if (partnerIsLoading === false && isProcessing === true) {
      refreshPartnerFormData();
      setIsProcessing(false);
    }
  }, [partnerIsLoading, isProcessing]);

  useEffect(() => {
    if (isSearching === true && partnerIsLoading === false) {
      setPersonForm({
        rut: { value: partner.rut, isValid: true },
        name: { value: partner.name, isValid: true },
        legalrepresentative: {
          value: partner.legalrepresentative,
          isValid: true,
        },
        line: {
          value: partner.line,
          isValid: true,
        },
        address: { value: partner.address, isValid: true },
        district: { value: partner.district, isValid: true },
        email: { value: partner.email, isValid: true },
        phone: { value: partner.phone, isValid: true },
      });
      setIsSearching(false);
    }
  }, [isSearching, partnerIsLoading]);

  useEffect(() => {
    if (partner.rut !== "") {
      refreshPartnerFormData();
    }
  }, [partner]);

  return (
    <ContentCell gap="5px">
      <ContentRow gap="20px">
        <InputText
          label="Rut"
          width={"100%"}
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={9}
          value={personForm?.rut.value}
          onChange={handleChangeRut}
          isValid={personForm?.rut.isValid}
        />
      </ContentRow>
      <InputText
        label="Razón Social"
        width="100%"
        maxLength={50}
        value={personForm?.name.value}
        onChange={handleChangeName}
      />
      <InputText
        label="Representante Legal"
        width="100%"
        maxLength={50}
        value={personForm?.legalrepresentative.value}
        onChange={handleChangeLegalrelegalrepresentative}
      />
      <InputText
        label="Giro"
        width="100%"
        maxLength={50}
        value={personForm?.line.value}
        onChange={handleChangeLine}
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

export default PartnerForm;
