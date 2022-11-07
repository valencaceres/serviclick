import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { useProduct } from "../../../../hooks";

const BrokerProductsItem = ({
  brokerProductForm,
  setBrokerProductForm,
  saveProduct,
  setShowModal,
}: any) => {
  const { list: productList } = useProduct();

  const commisionTypeData = [
    { id: "P", name: "Porcentaje" },
    { id: "M", name: "Markup" },
  ];

  const [enabledButton, setEnabledButton] = useState(false);

  const handleChangeProduct = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      product_id: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
      name: {
        value: event.target.options[event.target.selectedIndex].text,
        isValid: event.target.options[event.target.selectedIndex].text !== "",
      },
    });
  };

  const handleChangeCommisionType = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      commisionTypeCode: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeValue = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      value: {
        value: event.target.value,
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
      },
    });
  };

  const handleChangeCustomerPrice = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      price: {
        ...brokerProductForm.price,
        customer: {
          value: event.target.value,
          isValid:
            event.target.value !== "" && parseInt(event.target.value) > 0,
        },
      },
    });
  };

  const handleChangecompanyPrice = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      price: {
        ...brokerProductForm.price,
        company: {
          value: event.target.value,
          isValid:
            event.target.value !== "" && parseInt(event.target.value) > 0,
        },
      },
    });
  };

  const handleSaveProduct = () => {
    setShowModal(false);
    saveProduct();
  };

  useEffect(() => {
    setEnabledButton(
      brokerProductForm.product_id.isValid &&
        brokerProductForm.name.isValid &&
        brokerProductForm.price.customer.isValid &&
        brokerProductForm.price.company.isValid &&
        brokerProductForm.commisionTypeCode.isValid &&
        brokerProductForm.value.isValid
    );
  }, [brokerProductForm]);

  return (
    <ContentCell gap="30px" align="center">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbProduct"
          label="Producto"
          width="400px"
          value={brokerProductForm.product_id.value}
          onChange={handleChangeProduct}
          placeHolder=":: Seleccione Producto ::"
          data={productList}
          dataValue="id"
          dataText="name"
        />
        <ContentRow gap="5px">
          <ComboBox
            id="cmbCommisionType"
            label="Tipo de comisión"
            width="100%"
            value={brokerProductForm.commisionTypeCode.value}
            onChange={handleChangeCommisionType}
            placeHolder=":: Seleccione Tipo ::"
            data={commisionTypeData}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Valor"
            width="100%"
            type="number"
            maxLength={6}
            value={brokerProductForm.value.value}
            onChange={handleChangeValue}
            isValid={brokerProductForm.value.isValid}
          />
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            label="Precio público ($)"
            width="100%"
            type="number"
            maxLength={6}
            value={brokerProductForm.price.customer.value}
            onChange={handleChangeCustomerPrice}
            isValid={brokerProductForm.price.customer.isValid}
          />
          <InputText
            label="Precio empresa ($)"
            width="100%"
            type="number"
            maxLength={6}
            value={brokerProductForm.price.company.value}
            onChange={handleChangecompanyPrice}
            isValid={brokerProductForm.price.company.isValid}
          />
        </ContentRow>
      </ContentCell>
      <Button
        text="Registrar"
        width="200px"
        onClick={handleSaveProduct}
        enabled={enabledButton}
      />
    </ContentCell>
  );
};

export default BrokerProductsItem;
