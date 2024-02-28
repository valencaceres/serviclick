import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";
import { Button as ButtonUi } from "../../../ui/ButtonC";
import { useProduct } from "../../../../hooks";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { Modal, Window } from "~/components/ui/Modal/index";
import PDFViewer from "~/components/ui/PDFViewer/PdfViewer";

const RetailProductsItem = ({
  retailProductForm,
  setRetailProductForm,
  saveProduct,
  setShowModal,
  beneficiaries,
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
  const [pdfModal, setPdfModal] = useState(false);
  const initialPdfData =
    typeof retailProductForm.pdfbase64 === "string"
      ? retailProductForm.pdfbase64
      : null;

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

  const handleChangeYearlyPrice = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      yearly_price: {
        value: event.target.value,
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
      },
    });
  };

  const handleChangeBeneficiaryPrice = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
      beneficiary_price: {
        value: event.target.value,
        isValid: event.target.value !== "" && parseInt(event.target.value) > 0,
      },
    });
  };
  const handleFileChange = (event: any) => {
    setRetailProductForm({
      ...retailProductForm,
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
          <InputText
            label="Precio anual"
            width="100%"
            type="number"
            maxLength={6}
            value={retailProductForm.yearly_price.value}
            onChange={handleChangeYearlyPrice}
            isValid={retailProductForm.yearly_price.isValid}
          />
          <InputText
            label="Precio por carga"
            width="100%"
            type="number"
            disabled={beneficiaries === 0}
            maxLength={6}
            value={retailProductForm.beneficiary_price.value}
            onChange={handleChangeBeneficiaryPrice}
            isValid={retailProductForm.beneficiary_price.isValid}
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

export default RetailProductsItem;
