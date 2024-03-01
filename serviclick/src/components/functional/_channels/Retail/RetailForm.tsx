import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";
import InputText from "../../../ui/InputText";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useRetail, useDistrict } from "../../../../hooks";

import styles from "./Retail.module.scss";
import ButtonIcon from "~/components/ui/ButtonIcon";
import ComboBox from "~/components/ui/ComboBox";

const RetailForm = ({
  isDisabledRetailForm,
  retailForm,
  setRetailForm,
  editForm,
  setIsDisabledRetailForm,
}: any) => {
  const router = useRouter();

  const { retail, setRetail, getRetailByRut } = useRetail();
  const { list: districtList } = useDistrict();

  const [enableButtonSave, setEnableButtonSave] = useState(false);
  const [retailCancel, setRetailCancel] = useState(retail);

  const ref = useRef<HTMLInputElement>(null);

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setRetailForm({
      ...retailForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(unFormatRut(event.target.value)) &&
          event.target.value.length > 7 &&
          rutValidate(unFormatRut(event.target.value)) &&
          event.target.value !== "",
      },
    });
    event.target.value !== "" &&
      event.target.value.length > 7 &&
      getRetailByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setRetailForm({
      ...retailForm,
      rut: {
        value: event.target.value,
        isValid:
          rutRegEx.test(event.target.value) &&
          event.target.value.length > 7 &&
          rutValidate(event.target.value) &&
          event.target.value !== "",
      },
    });
  };

  const handleChangeName = (event: any) => {
    setRetailForm({
      ...retailForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLegalRepresentative = (event: any) => {
    setRetailForm({
      ...retailForm,
      legalRepresentative: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setRetailForm({
      ...retailForm,
      line: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeFantasyName = (event: any) => {
    setRetailForm({
      ...retailForm,
      fantasyName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setRetailForm({
      ...retailForm,
      address: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setRetailForm({
      ...retailForm,
      district: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setRetailForm({
      ...retailForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setRetailForm({
        ...retailForm,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  const handleClickRevertForm = () => {
    setIsDisabledRetailForm(true);
    setRetailForm({
      rut: { value: retailCancel.rut, isValid: true },
      name: { value: retailCancel.name, isValid: true },
      legalRepresentative: {
        value: retailCancel.legalRepresentative,
        isValid: true,
      },
      line: { value: retailCancel.line, isValid: true },
      fantasyName: { value: retailCancel.fantasyName, isValid: true },
      address: { value: retailCancel.address, isValid: true },
      district: { value: retailCancel.district, isValid: true },
      email: { value: retailCancel.email, isValid: true },
      phone: { value: retailCancel.phone, isValid: true },
      logo: { value: retailCancel.logo, isValid: true },
    });
  };

  useEffect(() => {
    if (retail.id !== "") {
      setRetailForm({
        rut: { value: retail.rut, isValid: true },
        name: { value: retail.name, isValid: true },
        legalRepresentative: {
          value: retail.legalRepresentative,
          isValid: true,
        },
        line: { value: retail.line, isValid: true },
        fantasyName: { value: retail.fantasyName, isValid: true },
        address: { value: retail.address, isValid: true },
        district: { value: retail.district, isValid: true },
        email: { value: retail.email, isValid: true },
        phone: { value: retail.phone, isValid: true },
        logo: { value: retail.logo, isValid: true },
      });
    }
  }, [retail.rut]);

  useEffect(() => {
    const isValid =
      retailForm.rut.isValid &&
      retailForm.rut.value !== "" &&
      retailForm.name.isValid &&
      retailForm.name.value !== "" &&
      retailForm.legalRepresentative.isValid &&
      retailForm.line.isValid &&
      retailForm.fantasyName.isValid &&
      retailForm.fantasyName.value !== "" &&
      retailForm.address.isValid &&
      retailForm.address.value !== "" &&
      retailForm.district.isValid &&
      retailForm.district.value !== "" &&
      retailForm.email.isValid &&
      retailForm.email.value !== "" &&
      retailForm.phone.isValid &&
      retailForm.phone.value;

    if (isValid) {
      setRetail({
        ...retail,
        rut: retailForm.rut.value,
        name: retailForm.name.value,
        legalRepresentative: retailForm.legalRepresentative.value,
        line: retailForm.line.value,
        fantasyName: retailForm.fantasyName.value,
        address: retailForm.address.value,
        district: retailForm.district.value,
        email: retailForm.email.value,
        phone: retailForm.phone.value,
        products: [...retail.products],
        users: [...retail.users],
      });
    }
    setEnableButtonSave(isValid);
  }, [retailForm]);

  useEffect(() => {
    if (!isDisabledRetailForm) {
      setRetailCancel(retail);
    }
  }, [!isDisabledRetailForm]);

  return (
    <ContentRow gap="5px">
      <ContentCell className={styles.contentCellForm} gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={retailForm?.rut.value}
          onChange={handleChangeRut}
          isValid={retailForm?.rut.isValid}
          disabled={retail.id !== ""}
        />
        <InputText
          label="Razón Social"
          width="100%"
          maxLength={50}
          value={retailForm?.name.value}
          onChange={handleChangeName}
          isValid={retailForm?.name.isValid}
          disabled={isDisabledRetailForm}
        />
        <InputText
          label="Giro"
          width="100%"
          maxLength={50}
          value={retailForm?.line.value}
          onChange={handleChangeLine}
          isValid={retailForm?.line.isValid}
          disabled={isDisabledRetailForm}
        />
        <InputText
          label="Nombre de fantasía"
          width="100%"
          maxLength={50}
          value={retailForm?.fantasyName.value}
          onChange={handleChangeFantasyName}
          isValid={retailForm?.fantasyName.isValid}
          disabled={isDisabledRetailForm}
        />
        <InputText
          label="Representante Legal"
          width="100%"
          maxLength={50}
          value={retailForm?.legalRepresentative.value}
          onChange={handleChangeLegalRepresentative}
          isValid={retailForm?.legalRepresentative.isValid}
          disabled={isDisabledRetailForm}
        />
        <InputText
          label="Dirección"
          width="100%"
          maxLength={250}
          value={retailForm?.address.value}
          onChange={handleChangeAddress}
          isValid={retailForm?.address.isValid}
          disabled={isDisabledRetailForm}
        />
        {/* <InputText
          label="Comuna"
          width="100%"
          maxLength={250}
          value={retailForm?.district.value}
          onChange={handleChangeDistrict}
          isValid={retailForm?.district.isValid}
          disabled={isDisabledRetailForm}
        /> */}
        <ComboBox
          label="Comuna"
          width="100%"
          value={retailForm?.district.value}
          onChange={handleChangeDistrict}
          placeHolder="Seleccione comuna"
          data={districtList}
          dataValue="district_name"
          dataText="district_name"
          enabled={!isDisabledRetailForm}
        />
        <ContentRow gap="5px">
          <InputText
            label="Correo"
            width="100%"
            type="email"
            maxLength={250}
            value={retailForm?.email.value}
            onChange={handleChangeEmail}
            isValid={retailForm?.email.isValid}
            disabled={isDisabledRetailForm}
          />
        </ContentRow>
        <ContentRow gap="5px" align="space-between">
          <InputText
            label="Teléfono"
            width="50%"
            type="tel"
            maxLength={9}
            value={retailForm?.phone.value}
            onChange={handleChangePhone}
            isValid={retailForm?.phone.isValid}
            disabled={isDisabledRetailForm}
          />
          {!isDisabledRetailForm && (
            <ButtonIcon
              iconName="close"
              color="gray"
              onClick={handleClickRevertForm}
            />
          )}
          <ButtonIcon
            iconName={isDisabledRetailForm ? "edit" : "save"}
            color="gray"
            onClick={editForm}
            disabled={isDisabledRetailForm ? false : !enableButtonSave}
          />
        </ContentRow>
      </ContentCell>
    </ContentRow>
  );
};

export default RetailForm;
