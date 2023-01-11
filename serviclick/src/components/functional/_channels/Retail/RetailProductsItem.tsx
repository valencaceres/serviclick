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

  const handleChangeCampaing = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      campaign: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeNormalPrice = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      price: {
        ...retailProductForm.price,
        normal: {
          value: event.target.value,
          isValid:
            event.target.value !== "" && parseInt(event.target.value) > 0,
        },
      },
    });
  };

  const handleChangeCompanyPrice = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      price: {
        ...retailProductForm.price,
        company: {
          value: event.target.value,
          isValid:
            event.target.value !== "" && parseInt(event.target.value) > 0,
        },
      },
    });
  };

  const handleChangeTrialMonths = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      trialMonths: {
        value: parseInt(event.target.value ? event.target.value : "0"),
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
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
        retailProductForm.price.company.isValid
    );
  }, [retailProductForm]);

  return (
    <ContentCell gap="30px" align="center">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbProduct"
          label="Producto"
          width="470px"
          value={retailProductForm.product_id.value}
          onChange={handleChangeProduct}
          placeHolder=":: Seleccione Producto ::"
          data={productList.map((item: any) => {
            return { id: item.id, name: item.name + " (" + item.alias + ")" };
          })}
          dataValue="id"
          dataText="name"
        />
        {/* <InputText
          label="Campaña"
          width="450px"
          value={retailProductForm.campaign.value}
          onChange={handleChangeCampaing}
          isValid={retailProductForm.campaign.isValid}
        /> */}
        <ContentRow gap="5px">
          <InputText
            label="Precio Normal ($)"
            width="170px"
            type="number"
            maxLength={6}
            value={retailProductForm.price.normal.value}
            onChange={handleChangeNormalPrice}
            isValid={retailProductForm.price.normal.isValid}
          />
          <InputText
            label="Precio Oferta ($)"
            width="170px"
            type="number"
            maxLength={6}
            value={retailProductForm.price.company.value}
            onChange={handleChangeCompanyPrice}
            isValid={retailProductForm.price.company.isValid}
          />
          <InputText
            label="Meses gratis"
            width="120px"
            type="number"
            maxLength={6}
            value={retailProductForm.trialMonths.value}
            onChange={handleChangeTrialMonths}
            isValid={retailProductForm.trialMonths.isValid}
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
