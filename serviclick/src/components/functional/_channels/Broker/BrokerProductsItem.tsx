import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import { Button as ButtonUi } from "../../../ui/ButtonC";
import Button from "~/components/ui/Button";
import { useProduct } from "../../../../hooks";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { Modal, Window } from "~/components/ui/Modal/index";
import PDFViewer from "~/components/ui/PDFViewer/PdfViewer";
const BrokerProductsItem = ({
  brokerProductForm,
  setBrokerProductForm,
  saveProduct,
  setShowModal,
  beneficiaries,
}: any) => {
  const { productList } = useProduct();

  const commisionTypeData = [
    { id: "P", name: "Porcentaje" },
    { id: "M", name: "Markup" },
  ];

  const discountItems = [
    { code: "p", text: "Porcentaje" },
    { code: "t", text: "Meses gratis" },
  ];

  const [enabledButton, setEnabledButton] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const initialPdfData =
    typeof brokerProductForm.pdfbase64 === "string"
      ? brokerProductForm.pdfbase64
      : null;

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

  const handleChangeBasePrice = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      price: {
        ...brokerProductForm.price,
        base: {
          value: event.target.value,
          isValid:
            event.target.value !== "" && parseInt(event.target.value) > 0,
        },
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

  const handleChangeYearlyPrice = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      price: {
        ...brokerProductForm.price,
        yearly: {
          value: event.target.value,
          isValid:
            event.target.value !== "" && parseInt(event.target.value) >= 0,
        },
      },
    });
  };

  const handleChangeBeneficiaryPrice = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      beneficiary_price: {
        value: event.target.value,
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
      },
    });
  };

  const handleChangeDiscountType = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      discount: {
        ...brokerProductForm.discount,
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
    setBrokerProductForm({
      ...brokerProductForm,
      discount: {
        ...brokerProductForm.discount,
        percent: {
          value: parseInt(event.target.value ? event.target.value : "0"),
          isValid:
            (brokerProductForm.discount.type.value === "p" &&
              parseInt(event.target.value) > 0) ||
            (brokerProductForm.discount.type.value === "t" &&
              parseInt(event.target.value) === 0) ||
            (brokerProductForm.discount.type.value === "" &&
              parseInt(event.target.value) === 0),
        },
      },
    });
  };

  const handleChangeDiscountCicles = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      discount: {
        ...brokerProductForm.discount,
        cicles: {
          value: parseInt(event.target.value ? event.target.value : "0"),
          isValid:
            (brokerProductForm.discount.type.value !== "" &&
              parseInt(event.target.value) > 0) ||
            (brokerProductForm.discount.type.value === "" &&
              parseInt(event.target.value) === 0),
        },
      },
    });
  };

  const handleFileChange = (event: any) => {
    setBrokerProductForm({
      ...brokerProductForm,
      pdfbase64: event.target.files[0],
    });
  };

  const handleCloseModalPdf = () => {
    setPdfModal(false);
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
        brokerProductForm.price.yearly.isValid &&
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
          width="405px"
          value={brokerProductForm.product_id.value}
          onChange={handleChangeProduct}
          placeHolder=":: Seleccione Producto ::"
          data={productList.map((item: any) => {
            return { id: item.id, name: item.name + " (" + item.alias + ")" };
          })}
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
            label="Precio normal ($)"
            width="100%"
            type="number"
            maxLength={6}
            value={brokerProductForm.price.base.value}
            onChange={handleChangeBasePrice}
            isValid={brokerProductForm.price.base.isValid}
          />
          <InputText
            label="Precio público ($)"
            width="100%"
            type="number"
            maxLength={6}
            value={brokerProductForm.price.customer.value}
            onChange={handleChangeCustomerPrice}
            isValid={brokerProductForm.price.customer.isValid}
          />
          {/*  <InputText
            label="Precio empresa ($)"
            width="132px"
            type="number"
            maxLength={6}
            value={brokerProductForm.price.company.value}
            onChange={handleChangecompanyPrice}
            isValid={brokerProductForm.price.company.isValid}
          /> */}
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            label="Precio Anual ($)"
            width="100%"
            type="number"
            maxLength={6}
            value={brokerProductForm.price.yearly.value}
            onChange={handleChangeYearlyPrice}
            isValid={brokerProductForm.price.yearly.isValid}
          />
          <InputText
            label="Precio por carga ($)"
            width="100%"
            type="number"
            maxLength={6}
            disabled={beneficiaries === 0}
            value={brokerProductForm.beneficiary_price.value}
            onChange={handleChangeBeneficiaryPrice}
            isValid={brokerProductForm.beneficiary_price.isValid}
          />
        </ContentRow>

        <ContentRow gap="5px">
          <ComboBox
            id="cmbDiscount"
            label="Tipo de descuento"
            width="200px"
            value={brokerProductForm.discount.type.value}
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
            value={brokerProductForm.discount.percent.value}
            onChange={handleChangeDiscountPercent}
            isValid={brokerProductForm.discount.percent.isValid}
          />
          <InputText
            label="Meses"
            width="85px"
            type="number"
            maxLength={6}
            value={brokerProductForm.discount.cicles.value}
            onChange={handleChangeDiscountCicles}
            isValid={brokerProductForm.discount.cicles.isValid}
          />
        </ContentRow>
        <ContentRow gap="5px">
          {initialPdfData != "" && initialPdfData != null ? (
            <>
              <div className="flex w-full max-w-xl flex-col items-center gap-1.5 ">
                <div className="w-full">
                  <ButtonUi
                    className="w-full"
                    onClick={() => setPdfModal(true)}
                  >
                    Ver pdf
                  </ButtonUi>
                  <Modal showModal={pdfModal}>
                    <Window title="Documento" setClosed={handleCloseModalPdf}>
                      <PDFViewer base64={initialPdfData} />
                    </Window>
                  </Modal>
                </div>

                <div className="flex w-full max-w-xl flex-col gap-1.5 border border-primary-500">
                  <Label htmlFor="picture" className="text-xl ">
                    Cambiar pdf
                  </Label>
                  <Input
                    onChange={handleFileChange}
                    id="picture"
                    className="border-none p-0"
                    type="file"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid w-full max-w-xl items-center gap-1.5 border border-primary-500">
                <Label htmlFor="picture" className="text-xl">
                  Subir pdf
                </Label>
                <Input
                  onChange={handleFileChange}
                  id="picture"
                  className="border-none p-0"
                  type="file"
                />
              </div>
            </>
          )}
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
