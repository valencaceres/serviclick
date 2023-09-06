import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { useProduct } from "../../../../hooks";

const RetailProductsItem = ({
  retailProductForm,
  setRetailProductForm,
  saveProduct,
  setShowModal,
}: any) => {
  const { productList } = useProduct();

  const commisionTypeData = [
    { id: "P", name: "Porcentaje" },
    { id: "M", name: "Markup" },
  ];

  const currencyData = [
    { id: "P", name: "Peso" },
    { id: "U", name: "U.F." },
  ];

  const discountItems = [
    { code: "p", text: "Porcentaje" },
    { code: "t", text: "Meses gratis" },
  ];

  const [enabledButton, setEnabledButton] = useState(false);

  const handleChangeProduct = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
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

  // const handleChangeCommisionType = (event: any) => {
  //   setRetailProductForm({
  //     ...retailProductForm,
  //     commisionTypeCode: {
  //       value: event.target.value,
  //       isValid: event.target.value !== "",
  //     },
  //   });
  // };

  // const handleChangeValue = (event: any) => {
  //   setRetailProductForm({
  //     ...retailProductForm,
  //     value: {
  //       value: event.target.value,
  //       isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
  //     },
  //   });
  // };

  const handleChangeBasePrice = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      baseprice: {
        value: event.target.value,
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
      },
    });
  };

  // const handleChangeCustomerPrice = (event: any) => {
  //   setRetailProductForm({
  //     ...retailProductForm,
  //     price: {
  //       ...retailProductForm.price,
  //       customer: {
  //         value: event.target.value,
  //         isValid:
  //           event.target.value !== "" && parseInt(event.target.value) > 0,
  //       },
  //     },
  //   });
  // };

  const handleChangeCompanyPrice = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      price: {
        value: event.target.value,
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
      },
    });
  };

  const handleChangeCurrency = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      currency: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeDiscountType = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      discount: {
        ...retailProductForm.discount,
        percent: { value: 0, enabled: true },
        cicles: { value: 0, enabled: true },
        type: {
          value: event.target.value,
          isValid: true,
        },
      },
    });
  };

  const handleChangeDiscountPercent = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      discount: {
        ...retailProductForm.discount,
        percent: {
          value: parseInt(event.target.value ? event.target.value : "0"),
          isValid:
            (retailProductForm.discount.type.value === "p" &&
              parseInt(event.target.value) > 0) ||
            (retailProductForm.discount.type.value === "t" &&
              parseInt(event.target.value) === 0) ||
            (retailProductForm.discount.type.value === "" &&
              parseInt(event.target.value) === 0),
        },
      },
    });
  };

  const handleChangeDiscountCicles = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      discount: {
        ...retailProductForm.discount,
        cicles: {
          value: parseInt(event.target.value ? event.target.value : "0"),
          isValid:
            (retailProductForm.discount.type.value !== "" &&
              parseInt(event.target.value) > 0) ||
            (retailProductForm.discount.type.value === "" &&
              parseInt(event.target.value) === 0),
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
      retailProductForm.product_id.isValid &&
        retailProductForm.name.isValid &&
        retailProductForm.baseprice.isValid &&
        retailProductForm.price.isValid &&
        retailProductForm.currency.isValid
    );
  }, [retailProductForm]);

  return (
    <ContentCell gap="30px" align="center">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbProduct"
          label="Producto"
          width="405px"
          value={retailProductForm.product_id.value}
          onChange={handleChangeProduct}
          placeHolder=":: Seleccione Producto ::"
          data={productList.map((item: any) => {
            return { id: item.id, name: item.name + " (" + item.alias + ")" };
          })}
          dataValue="id"
          dataText="name"
        />
        {/* <ContentRow gap="5px">
          <ComboBox
            id="cmbCommisionType"
            label="Tipo de comisión"
            width="100%"
            value={retailProductForm.commisionTypeCode.value}
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
            value={retailProductForm.value.value}
            onChange={handleChangeValue}
            isValid={retailProductForm.value.isValid}
          />
        </ContentRow> */}
        <ContentRow gap="5px">
          <InputText
            label="Precio normal"
            width="122px"
            type="number"
            maxLength={6}
            value={retailProductForm.baseprice.value}
            onChange={handleChangeBasePrice}
            isValid={retailProductForm.baseprice.isValid}
          />
          {/* <InputText
            label="Precio público ($)"
            width="132px"
            type="number"
            maxLength={6}
            value={retailProductForm.price.customer.value}
            onChange={handleChangeCustomerPrice}
            isValid={retailProductForm.price.customer.isValid}
          /> */}
          <InputText
            label="Precio empresa"
            width="122px"
            type="number"
            maxLength={6}
            value={retailProductForm.price.value}
            onChange={handleChangeCompanyPrice}
            isValid={retailProductForm.price.isValid}
          />
          <ComboBox
            id="cmbCurrency"
            label="Moneda"
            width="152px"
            value={retailProductForm.currency.value}
            onChange={handleChangeCurrency}
            placeHolder=":: Moneda ::"
            data={currencyData}
            dataValue="id"
            dataText="name"
          />
        </ContentRow>
        <ContentRow gap="5px">
          <ComboBox
            id="cmbDiscount"
            label="Tipo de descuento"
            width="200px"
            value={retailProductForm.discount.type.value}
            onChange={handleChangeDiscountType}
            placeHolder=":: Seleccione tipo ::"
            data={discountItems}
            dataValue="code"
            dataText="text"
          />
          <InputText
            label="Porcentaje (%)"
            width="110px"
            type="number"
            maxLength={6}
            value={retailProductForm.discount.percent.value}
            onChange={handleChangeDiscountPercent}
            isValid={retailProductForm.discount.percent.isValid}
          />
          <InputText
            label="Meses"
            width="85px"
            type="number"
            maxLength={6}
            value={retailProductForm.discount.cicles.value}
            onChange={handleChangeDiscountCicles}
            isValid={retailProductForm.discount.cicles.isValid}
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

export default RetailProductsItem;
