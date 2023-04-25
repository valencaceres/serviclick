import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import { Button } from "~/components/ui/ButtonC";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict, useContractor } from "../../../../hooks";

import styles from "./Contractor.module.scss";
import ContractorProduct from "./ContractorProduct";

const ContractorPersonForm = () => {
  const { pathname } = useRouter();

  const { list: districtList } = useDistrict();
  const {
    getContractorByRut,
    setContractor,
    setContractorProcessing,
    contractor,
    contractorLoading,
    contractorProcessing,
  } = useContractor();

  const initialDataPersonForm = {
    rut: { value: contractor.rut, isValid: true },
    name: { value: contractor.name, isValid: true },
    paternalLastName: {
      value: contractor.paternalLastName,
      isValid: true,
    },
    maternalLastName: {
      value: contractor.maternalLastName,
      isValid: true,
    },
    birthDate: { value: contractor.birthDate, isValid: true },
    address: { value: contractor.address, isValid: true },
    district: { value: contractor.district, isValid: true },
    email: { value: contractor.email, isValid: true },
    phone: { value: contractor.phone, isValid: true },
  };

  const [personForm, setPersonForm] = useState(initialDataPersonForm);
  const [isSearching, setIsSearching] = useState(false);

  const handleBlurRut = (event: any) => {
    if (
      event.target.value !== "" &&
      rutValidate(unFormatRut(event.target.value))
    ) {
      event.target.value = formatRut(event.target.value);
      setIsSearching(true);
      getContractorByRut(event.target.value, contractor.type);
      setPersonForm({
        ...personForm,
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
    setPersonForm({
      name: { value: "", isValid: true },
      paternalLastName: { value: "", isValid: true },
      maternalLastName: { value: "", isValid: true },
      birthDate: { value: "", isValid: true },
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

  const refreshContractorState = () => {
    setContractor({
      ...contractor,
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

  const refreshContractorFormData = () => {
    setPersonForm({
      rut: { value: contractor.rut, isValid: true },
      name: { value: contractor.name, isValid: true },
      paternalLastName: {
        value: contractor.paternalLastName,
        isValid: true,
      },
      maternalLastName: {
        value: contractor.maternalLastName,
        isValid: true,
      },
      birthDate: { value: contractor.birthDate, isValid: true },
      address: { value: contractor.address, isValid: true },
      district: { value: contractor.district, isValid: true },
      email: { value: contractor.email, isValid: true },
      phone: { value: contractor.phone, isValid: true },
    });
  };

  useEffect(() => {
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
      refreshContractorState();
    }
  }, [personForm]);

  useEffect(() => {
    if (contractorLoading === false && contractorProcessing === true) {
      refreshContractorFormData();
      setContractorProcessing(false);
    }
  }, [contractorLoading, contractorProcessing]);

  useEffect(() => {
    if (isSearching === true && contractorLoading === false) {
      setPersonForm({
        rut: { value: contractor.rut, isValid: true },
        name: { value: contractor.name, isValid: true },
        paternalLastName: {
          value: contractor.paternalLastName,
          isValid: true,
        },
        maternalLastName: {
          value: contractor.maternalLastName,
          isValid: true,
        },
        birthDate: { value: contractor.birthDate, isValid: true },
        address: { value: contractor.address, isValid: true },
        district: { value: contractor.district, isValid: true },
        email: { value: contractor.email, isValid: true },
        phone: { value: contractor.phone, isValid: true },
      });
      setIsSearching(false);
    }
  }, [isSearching, contractorLoading]);

  return (
    <form>
      <ContentCell gap="5px" className={styles.contentCell}>
        <ContentRow gap="5px">
          <InputText
            label="Rut"
            width={"50%"}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={personForm?.rut.value}
            onChange={handleChangeRut}
            isValid={personForm?.rut.isValid}
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
          disabled={true}
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
        {pathname === "/entities/contractor/new/person" && (
          <Button>Crear</Button>
        )}
      </ContentCell>
    </form>
  );
};

export default ContractorPersonForm;
