import { useEffect } from "react";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";

import { Component, Row, Cell } from "../../../layout/Component";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import {
  useUI,
  useDistrict,
  useStage,
  useSubscription,
  useProduct,
  useLead,
  useCustomer,
} from "../../../../redux/hooks";

const CustomerForm = ({ customerForm, setCustomerForm, disabled }: any) => {
  const { isDesktop } = useUI();
  const { list } = useDistrict();
  const { stage } = useStage();
  const { product } = useProduct();
  const {
    getActiveSubscriptions,
    setSubscription,
    resetSubscription,
    subscription,
  } = useSubscription();
  const { lead, getLeadBySubscriptionId, resetLeadSubscription } = useLead();
  const { customer, getCustomerByRut } = useCustomer();

  const handleBlurRut = (event: any) => {
    // getActiveSubscriptions(
    //   stage.type,
    //   formatRut(event.target.value),
    //   product.id
    // );
    event.target.value = formatRut(event.target.value);
    setCustomerForm({
      ...customerForm,
      rut: {
        value: event.target.value,
        isValid:
          (rutRegEx.test(unFormatRut(event.target.value)) &&
            unFormatRut(event.target.value).length > 7 &&
            rutValidate(unFormatRut(event.target.value))) ||
          event.target.value === "",
      },
    });
    getCustomerByRut(event.target.value);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setCustomerForm({
      ...customerForm,
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
    setCustomerForm({
      ...customerForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setCustomerForm({
      ...customerForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setCustomerForm({
      ...customerForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeBirthDate = (event: any) => {
    setCustomerForm({
      ...customerForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setCustomerForm({
      ...customerForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setCustomerForm({
      ...customerForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setCustomerForm({
      ...customerForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setCustomerForm({
        ...customerForm,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  // CHECK: Se elimina por que al parecer no se requiere
  // useEffect(() => {
  //   if (subscription.id > 0) {
  //     getLeadBySubscriptionId(subscription.id);
  //   }
  // }, [subscription]);

  useEffect(() => {
    if (customer.rut !== "") {
      setCustomerForm({
        rut: { value: customer.rut, isValid: true },
        birthDate: { value: customer.birthDate, isValid: true },
        name: { value: customer.name, isValid: true },
        paternalLastName: {
          value: customer.paternalLastName,
          isValid: true,
        },
        maternalLastName: { value: customer.maternalLastName, isValid: true },
        address: { value: customer.address, isValid: true },
        district: { value: customer.district, isValid: true },
        email: { value: customer.email, isValid: true },
        phone: { value: customer.phone, isValid: true },
      });
    }
  }, [customer]);

  useEffect(() => {
    if (lead.customer.id !== "") {
      setCustomerForm({
        id: { value: lead.customer.id, isValid: true },
        rut: { value: lead.customer.rut, isValid: true },
        name: { value: lead.customer.name, isValid: true },
        paternalLastName: {
          value: lead.customer.paternalLastName,
          isValid: true,
        },
        maternalLastName: {
          value: lead.customer.maternalLastName,
          isValid: true,
        },
        birthDate: {
          value: lead.insured[0].birthDate,
          isValid: true,
        },
        address: { value: lead.customer.address, isValid: true },
        district: { value: lead.customer.district, isValid: true },
        email: { value: lead.customer.email, isValid: true },
        phone: { value: lead.customer.phone, isValid: true },
      });
      setSubscription({ id: lead.subscription.id });

      // CHECK: Se elimina por que al parecer no se requiere
      //resetSubscription();
      //resetLeadSubscription();
    }
  }, [lead.customer, setCustomerForm]);

  return (
    <Component width={isDesktop ? "560px" : "100%"}>
      <Row>
        <Cell align="left">
          <InputText
            label="Rut"
            width={"100%"}
            onFocus={handleFocusRut}
            onBlur={handleBlurRut}
            maxLength={9}
            value={customerForm?.rut.value}
            onChange={handleChangeRut}
            isValid={customerForm?.rut.isValid}
            disabled={disabled}
          />
        </Cell>
        <Cell align="left">
          <InputText
            type="date"
            label="Fecha de nacimiento"
            width={"100%"}
            maxLength={10}
            value={customerForm.birthDate.value}
            onChange={handleChangeBirthDate}
            isValid={customerForm?.birthDate.isValid}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Nombres"
            width="100%"
            maxLength={50}
            value={customerForm?.name.value}
            onChange={handleChangeName}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Apellido Paterno"
            width="100%"
            maxLength={50}
            value={customerForm?.paternalLastName.value}
            onChange={handleChangePaternalLastName}
            disabled={disabled}
          />
        </Cell>
        <Cell>
          <InputText
            label="Apellido Materno"
            width="100%"
            maxLength={50}
            value={customerForm?.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="100%"
            maxLength={250}
            value={customerForm?.address.value}
            onChange={handleChangeAddress}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <ComboBox
            label="Comuna"
            width="100%"
            value={customerForm?.district.value}
            onChange={handleChangeDistrict}
            placeHolder=":: Seleccione comuna ::"
            data={list}
            dataValue="district_name"
            dataText="district_name"
            enabled={!disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            width="100%"
            type="email"
            maxLength={250}
            value={customerForm?.email.value}
            onChange={handleChangeEmail}
            isValid={customerForm?.email.isValid}
            disabled={disabled}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="100%"
            type="tel"
            maxLength={9}
            value={customerForm?.phone.value}
            onChange={handleChangePhone}
            isValid={customerForm?.phone.isValid}
            disabled={disabled}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default CustomerForm;
