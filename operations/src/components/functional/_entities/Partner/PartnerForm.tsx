import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { list: districtList } = useDistrict();
  const { getPartnerByRut, setPartner, partner, partnerIsLoading } =
    usePartner();

  const initialDataPartnerForm = {
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

  const [partnerForm, setPartnerForm] = useState(initialDataPartnerForm);
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
      setPartnerForm({
        ...partnerForm,
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
    setPartnerForm({
      ...partnerForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
  };

  const handleChangeName = (event: any) => {
    setPartnerForm({
      ...partnerForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLegalrelegalrepresentative = (event: any) => {
    setPartnerForm({
      ...partnerForm,
      legalrepresentative: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setPartnerForm({
      ...partnerForm,
      line: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setPartnerForm({
      ...partnerForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setPartnerForm({
      ...partnerForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setPartnerForm({
      ...partnerForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setPartnerForm({
        ...partnerForm,
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
      rut: partnerForm.rut.value,
      name: partnerForm.name.value,
      legalrepresentative: partnerForm.legalrepresentative.value,
      line: partnerForm.line.value,
      address: partnerForm.address.value,
      district: partnerForm.district.value,
      email: partnerForm.email.value,
      phone: partnerForm.phone.value,
    });
  };

  const refreshPartnerFormData = () => {
    setPartnerForm({
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
      partnerForm.rut.isValid &&
      partnerForm.email.isValid &&
      partnerForm.phone.isValid &&
      partnerForm.rut.value !== "" &&
      partnerForm.name.value !== "" &&
      partnerForm.legalrepresentative.value !== "" &&
      partnerForm.line.value !== "" &&
      partnerForm.address.value !== "" &&
      partnerForm.district.value !== "" &&
      partnerForm.email.value !== "" &&
      partnerForm.phone.value !== ""
    ) {
      refreshPartnerState();
      setEnableSave(true);
    }
  }, [
    partnerForm.rut.value,
    partnerForm.email.value,
    partnerForm.phone.value,
    partnerForm.rut.value,
    partnerForm.name.value,
    partnerForm.legalrepresentative.value,
    partnerForm.line.value,
    partnerForm.address.value,
    partnerForm.district.value,
    partnerForm.email.value,
    partnerForm.phone.value,
  ]);

  useEffect(() => {
    if (partnerIsLoading === false && isProcessing === true) {
      refreshPartnerFormData();
      setIsProcessing(false);
    }
  }, [partnerIsLoading, isProcessing]);

  useEffect(() => {
    if (isSearching === true && partnerIsLoading === false) {
      setPartnerForm({
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
    <ContentCell gap="5px" className="w-[525px]">
      <InputText
        label="Rut"
        width={"50%"}
        onFocus={handleFocusRut}
        onBlur={handleBlurRut}
        maxLength={9}
        value={partnerForm?.rut.value}
        onChange={handleChangeRut}
        isValid={partnerForm?.rut.isValid}
      />
      <InputText
        label="Razón Social"
        width="100%"
        maxLength={50}
        value={partnerForm?.name.value}
        onChange={handleChangeName}
      />
      <InputText
        label="Representante Legal"
        width="100%"
        maxLength={50}
        value={partnerForm?.legalrepresentative.value}
        onChange={handleChangeLegalrelegalrepresentative}
      />
      <InputText
        label="Giro"
        width="100%"
        maxLength={50}
        value={partnerForm?.line.value}
        onChange={handleChangeLine}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={partnerForm?.address.value}
        onChange={handleChangeAddress}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={partnerForm?.district.value}
        onChange={handleChangeDistrict}
        placeHolder=":: Seleccione comuna ::"
        data={districtList}
        dataValue="district_name"
        dataText="district_name"
      />
      <ContentRow gap="5px">
        <InputText
          label="Correo"
          width="100%"
          type="email"
          maxLength={250}
          value={partnerForm?.email.value}
          onChange={handleChangeEmail}
          isValid={partnerForm?.email.isValid}
        />
        <InputText
          label="Teléfono"
          width="100%"
          type="tel"
          maxLength={9}
          value={partnerForm?.phone.value}
          onChange={handleChangePhone}
          isValid={partnerForm?.phone.isValid}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default PartnerForm;
