import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";
import InputText from "../../../ui/InputText";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useBroker, useDistrict } from "../../../../hooks";

import styles from "./Broker.module.scss";
import ButtonIcon from "~/components/ui/ButtonIcon";
import ComboBox from "~/components/ui/ComboBox";

const BrokerForm = ({
  isDisabledBrokerForm,
  brokerForm,
  setBrokerForm,
  editForm,
  setIsDisabledBrokerForm,
}: any) => {
  const router = useRouter();

  const { broker, setBroker, getBrokerByRut } = useBroker();
  const { list: districtList } = useDistrict();

  const [enableButtonSave, setEnableButtonSave] = useState(false);
  const [brokerCancel, setBrokerCancel] = useState(broker);
  const ref = useRef<HTMLInputElement>(null);

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setBrokerForm({
      ...brokerForm,
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
      getBrokerByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setBrokerForm({
      ...brokerForm,
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
    setBrokerForm({
      ...brokerForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLegalRepresentative = (event: any) => {
    setBrokerForm({
      ...brokerForm,
      legalRepresentative: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeLine = (event: any) => {
    setBrokerForm({
      ...brokerForm,
      line: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeFantasyName = (event: any) => {
    setBrokerForm({
      ...brokerForm,
      fantasyName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setBrokerForm({
      ...brokerForm,
      address: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setBrokerForm({
      ...brokerForm,
      district: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setBrokerForm({
      ...brokerForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setBrokerForm({
        ...brokerForm,
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
    setIsDisabledBrokerForm(true);
    setBrokerForm({
      rut: { value: brokerCancel.rut, isValid: true },
      name: { value: brokerCancel.name, isValid: true },
      legalRepresentative: {
        value: brokerCancel.legalRepresentative,
        isValid: true,
      },
      line: { value: brokerCancel.line, isValid: true },
      fantasyName: { value: brokerCancel.fantasyName, isValid: true },
      address: { value: brokerCancel.address, isValid: true },
      district: { value: brokerCancel.district, isValid: true },
      email: { value: brokerCancel.email, isValid: true },
      phone: { value: brokerCancel.phone, isValid: true },
      logo: { value: brokerCancel.logo, isValid: true },
    });
  };
  useEffect(() => {
    if (broker.id !== "") {
      setBrokerForm({
        rut: { value: broker.rut, isValid: true },
        name: { value: broker.name, isValid: true },
        legalRepresentative: {
          value: broker.legalRepresentative,
          isValid: true,
        },
        line: { value: broker.line, isValid: true },
        fantasyName: { value: broker.fantasyName, isValid: true },
        address: { value: broker.address, isValid: true },
        district: { value: broker.district, isValid: true },
        email: { value: broker.email, isValid: true },
        phone: { value: broker.phone, isValid: true },
        logo: { value: broker.logo, isValid: true },
      });
    }
  }, [broker.rut]);

  useEffect(() => {
    const isValid =
      brokerForm.rut.isValid &&
      brokerForm.rut.value !== "" &&
      brokerForm.name.isValid &&
      brokerForm.name.value !== "" &&
      brokerForm.legalRepresentative.isValid &&
      brokerForm.line.isValid &&
      brokerForm.fantasyName.isValid &&
      brokerForm.fantasyName.value !== "" &&
      brokerForm.address.isValid &&
      brokerForm.address.value !== "" &&
      brokerForm.district.isValid &&
      brokerForm.district.value !== "" &&
      brokerForm.email.isValid &&
      brokerForm.email.value !== "" &&
      brokerForm.phone.isValid &&
      brokerForm.phone.value;

    if (isValid) {
      setBroker({
        ...broker,
        rut: brokerForm.rut.value,
        name: brokerForm.name.value,
        legalRepresentative: brokerForm.legalRepresentative.value,
        line: brokerForm.line.value,
        fantasyName: brokerForm.fantasyName.value,
        address: brokerForm.address.value,
        district: brokerForm.district.value,
        email: brokerForm.email.value,
        phone: brokerForm.phone.value,
        products: [...broker.products],
        users: [...broker.users],
      });
    }
    setEnableButtonSave(isValid);
  }, [brokerForm]);

  useEffect(() => {
    if (!isDisabledBrokerForm) {
      setBrokerCancel(broker);
    }
  }, [!isDisabledBrokerForm]);

  return (
    <ContentRow gap="5px">
      <ContentCell className={styles.contentCellForm} gap="5px">
        <InputText
          label="Rut"
          width="100%"
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          maxLength={12}
          value={brokerForm?.rut.value}
          onChange={handleChangeRut}
          isValid={brokerForm?.rut.isValid}
          disabled={broker.id !== ""}
        />
        <InputText
          label="Razón Social"
          width="100%"
          maxLength={50}
          value={brokerForm?.name.value}
          onChange={handleChangeName}
          isValid={brokerForm?.name.isValid}
          disabled={isDisabledBrokerForm}
        />
        <InputText
          label="Giro"
          width="100%"
          maxLength={50}
          value={brokerForm?.line.value}
          onChange={handleChangeLine}
          isValid={brokerForm?.line.isValid}
          disabled={isDisabledBrokerForm}
        />
        <InputText
          label="Nombre de fantasía"
          width="100%"
          maxLength={50}
          value={brokerForm?.fantasyName.value}
          onChange={handleChangeFantasyName}
          isValid={brokerForm?.fantasyName.isValid}
          disabled={isDisabledBrokerForm}
        />
        <InputText
          label="Representante Legal"
          width="100%"
          maxLength={50}
          value={brokerForm?.legalRepresentative.value}
          onChange={handleChangeLegalRepresentative}
          isValid={brokerForm?.legalRepresentative.isValid}
          disabled={isDisabledBrokerForm}
        />
        <InputText
          label="Dirección"
          width="100%"
          maxLength={250}
          value={brokerForm?.address.value}
          onChange={handleChangeAddress}
          isValid={brokerForm?.address.isValid}
          disabled={isDisabledBrokerForm}
        />
        {/* <InputText
          label="Comuna"
          width="100%"
          maxLength={250}
          value={brokerForm?.district.value}
          onChange={handleChangeDistrict}
          isValid={brokerForm?.district.isValid}
          disabled={isDisabledBrokerForm}
        /> */}
        <ComboBox
          label="Comuna"
          width="100%"
          value={brokerForm?.district.value}
          onChange={handleChangeDistrict}
          placeHolder="Seleccione comuna"
          data={districtList}
          dataValue="district_name"
          dataText="district_name"
          enabled={!isDisabledBrokerForm}
        />
        <ContentRow gap="5px">
          <InputText
            label="Correo"
            width="100%"
            type="email"
            maxLength={250}
            value={brokerForm?.email.value}
            onChange={handleChangeEmail}
            isValid={brokerForm?.email.isValid}
            disabled={isDisabledBrokerForm}
          />
        </ContentRow>
        <ContentRow gap="5px" align="space-between">
          <InputText
            label="Teléfono"
            width="50%"
            type="tel"
            maxLength={9}
            value={brokerForm?.phone.value}
            onChange={handleChangePhone}
            isValid={brokerForm?.phone.isValid}
            disabled={isDisabledBrokerForm}
          />
          {!isDisabledBrokerForm && (
            <ButtonIcon
              iconName="close"
              color="gray"
              onClick={handleClickRevertForm}
            />
          )}
          <ButtonIcon
            iconName={isDisabledBrokerForm ? "edit" : "save"}
            color="gray"
            onClick={editForm}
            disabled={isDisabledBrokerForm ? false : !enableButtonSave}
          />
        </ContentRow>
      </ContentCell>
    </ContentRow>
  );
};

export default BrokerForm;
