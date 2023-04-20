import { useState, useEffect } from "react";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict, useContractor } from "../../../../hooks";

import styles from "./Contractor.module.scss";

const ContractorCompanyForm = ({ enabled, setEnableSave }: any) => {
  const { list: districtList } = useDistrict();
  const {
    getContractorByRut,
    setContractor,
    setContractorProcessing,
    contractor,
    contractorLoading,
    contractorProcessing,
  } = useContractor();

  const initialDataCompanyForm = {
    rut: { value: contractor.rut, isValid: true },
    companyName: { value: contractor.companyName, isValid: true },
    legalRepresentative: {
      value: contractor.legalRepresentative,
      isValid: true,
    },
    line: { value: contractor.line, isValid: true },
    address: { value: contractor.address, isValid: true },
    district: { value: contractor.district, isValid: true },
    email: { value: contractor.email, isValid: true },
    phone: { value: contractor.phone, isValid: true },
  };

  const [companyForm, setCompanyForm] = useState(initialDataCompanyForm);
  const [isSearching, setIsSearching] = useState(false);

  const handleBlurRut = (event: any) => {
    if (
      event.target.value !== "" &&
      rutValidate(unFormatRut(event.target.value))
    ) {
      event.target.value = formatRut(event.target.value);
      setIsSearching(true);
      getContractorByRut(event.target.value, contractor.type);
      setCompanyForm({
        ...companyForm,
        rut: {
          value: event.target.value,
          isValid:
            (rutRegEx.test(unFormatRut(event.target.value)) &&
              unFormatRut(event.target.value).length > 7 &&
              rutValidate(unFormatRut(event.target.value))) ||
            event.target.value === "",
        },
      });
    }
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setCompanyForm({
      companyName: { value: "", isValid: true },
      legalRepresentative: { value: "", isValid: true },
      line: { value: "", isValid: true },
      address: { value: "", isValid: true },
      district: { value: "", isValid: true },
      email: { value: "", isValid: true },
      phone: { value: "", isValid: true },
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

  const refreshContractorState = () => {
    setContractor({
      ...contractor,
      rut: companyForm.rut.value,
      companyName: companyForm.companyName.value,
      legalRepresentative: companyForm.legalRepresentative.value,
      line: companyForm.line.value,
      address: companyForm.address.value,
      district: companyForm.district.value,
      email: companyForm.email.value,
      phone: companyForm.phone.value,
    });
  };

  const refreshContractorFormData = () => {
    setCompanyForm({
      rut: { value: contractor.rut, isValid: true },
      companyName: { value: contractor.companyName, isValid: true },
      legalRepresentative: {
        value: contractor.legalRepresentative,
        isValid: true,
      },
      line: { value: contractor.line, isValid: true },
      address: { value: contractor.address, isValid: true },
      district: { value: contractor.district, isValid: true },
      email: { value: contractor.email, isValid: true },
      phone: { value: contractor.phone, isValid: true },
    });
  };

  useEffect(() => {
    setEnableSave(false);
    if (
      companyForm.rut.isValid &&
      companyForm.email.isValid &&
      companyForm.phone.isValid &&
      companyForm.rut.value !== "" &&
      companyForm.companyName.value !== "" &&
      companyForm.legalRepresentative.value !== "" &&
      companyForm.line.value !== "" &&
      companyForm.address.value !== "" &&
      companyForm.district.value !== "" &&
      companyForm.email.value !== "" &&
      companyForm.phone.value !== ""
    ) {
      refreshContractorState();
      setEnableSave(true);
    }
  }, [companyForm]);

  useEffect(() => {
    if (contractorLoading === false && contractorProcessing === true) {
      refreshContractorFormData();
      setContractorProcessing(false);
    }
  }, [contractorLoading, contractorProcessing]);

  useEffect(() => {
    if (isSearching === true && contractorLoading === false) {
      setCompanyForm({
        rut: {
          value: contractor.rut ? contractor.rut : companyForm?.rut.value,
          isValid: true,
        },
        companyName: { value: contractor.companyName, isValid: true },
        legalRepresentative: {
          value: contractor.legalRepresentative,
          isValid: true,
        },
        line: { value: contractor.line, isValid: true },
        address: { value: contractor.address, isValid: true },
        district: { value: contractor.district, isValid: true },
        email: { value: contractor.email, isValid: true },
        phone: { value: contractor.phone, isValid: true },
      });
      setIsSearching(false);
    }
  }, [isSearching, contractorLoading]);

  return (
    <ContentCell gap="5px" className={styles.contentCell}>
      <ContentRow gap="5px">
        <InputText
          label="Rut"
          width={"100%"}
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={9}
          value={companyForm?.rut.value}
          onChange={handleChangeRut}
          isValid={companyForm?.rut.isValid}
        />
        <div style={{ width: "100%" }}></div>
      </ContentRow>
      <InputText
        label="Razón Social"
        width="100%"
        maxLength={50}
        value={companyForm?.companyName.value}
        onChange={handleChangeCompanyName}
      />
      <InputText
        label="Repsesentante Legal"
        width="100%"
        maxLength={50}
        value={companyForm?.legalRepresentative.value}
        onChange={handleChangeLegalRepresentative}
      />
      <InputText
        label="Giro"
        width="100%"
        maxLength={50}
        value={companyForm?.line.value}
        onChange={handleChangeLine}
      />
      <InputText
        label="Dirección"
        width="100%"
        maxLength={250}
        value={companyForm?.address.value}
        onChange={handleChangeAddress}
      />
      <ComboBox
        label="Comuna"
        width="100%"
        value={companyForm?.district.value}
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
        value={companyForm?.email.value}
        onChange={handleChangeEmail}
        isValid={companyForm?.email.isValid}
      />
      <InputText
        label="Teléfono"
        width="100%"
        type="tel"
        maxLength={9}
        value={companyForm?.phone.value}
        onChange={handleChangePhone}
        isValid={companyForm?.phone.isValid}
      />
    </ContentCell>
  );
};

export default ContractorCompanyForm;
