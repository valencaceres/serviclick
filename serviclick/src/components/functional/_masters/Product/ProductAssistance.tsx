import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";
import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText";

import { useAssistance, useProduct } from "../../../../hooks";
import Button from "../../../ui/Button";

const dataCurrency = [
  { code: "P", name: "Pesos" },
  { code: "U", name: "U.F." },
];

const ProductAssistance = ({
  assistanceData,
  setAssistanceData,
  setShowModalAssistance,
}: any) => {
  const { assistanceList } = useAssistance();
  const { setProduct, product } = useProduct();

  const [enableButton, setEnableButton] = useState(false);

  const handleChangeAssistance = (e: any) => {
    setAssistanceData({
      ...assistanceData,
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleChangeAmount = (e: any) => {
    setAssistanceData({
      ...assistanceData,
      amount: e.target.value,
    });
  };

  const handleChangeMaximum = (e: any) => {
    setAssistanceData({
      ...assistanceData,
      maximum: e.target.value,
    });
  };

  const handleChangeEvents = (e: any) => {
    setAssistanceData({
      ...assistanceData,
      events: e.target.value,
    });
  };

  const handleChangeLack = (e: any) => {
    setAssistanceData({
      ...assistanceData,
      lack: e.target.value,
    });
  };

  const handleChangeCurrency = (e: any) => {
    setAssistanceData({
      ...assistanceData,
      currency: e.target.value,
    });
  };

  const handleClickAddAssistance = () => {
    if (assistanceData.line_order > 0) {
      const newArray = [...product.assistances];
      newArray[assistanceData.line_order - 1] = {
        id: assistanceData.id,
        name: assistanceData.name,
        amount: assistanceData.amount,
        maximum: assistanceData.maximum,
        events: assistanceData.events,
        lack: assistanceData.lack,
        currency: assistanceData.currency,
      };
      setProduct({
        ...product,
        assistances: [...newArray],
      });
    } else {
      setProduct({
        ...product,
        assistances: [...product.assistances, assistanceData],
      });
    }
    setShowModalAssistance(false);
  };

  useEffect(() => {
    setEnableButton(
      assistanceData.id !== "" &&
        ((assistanceData.amount > 0 && assistanceData.currency.id !== "") ||
          assistanceData.maximum !== "") &&
        assistanceData.lack > 0
    );
  }, [assistanceData]);

  return (
    <ContentCell gap="20px" align="center">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbAssistance"
          label="Servicio"
          width="500px"
          value={assistanceData.id}
          onChange={handleChangeAssistance}
          placeHolder=":: Seleccione servicio ::"
          data={assistanceList.filter((item: any) => {
            return !product.assistances
              .filter((itd: any) => itd.id !== assistanceData.id)
              ?.map((itemAssistance) => itemAssistance.name)
              .includes(item.name);
          })}
          dataValue="id"
          dataText="name"
        />
        <ContentRow gap="5px">
          <InputText
            id="txtAmount"
            type="number"
            label="Monto"
            width="200px"
            value={assistanceData.amount.toString()}
            onChange={handleChangeAmount}
          />
          <ComboBox
            id="cmbCurrency"
            label="Moneda"
            width="295px"
            value={assistanceData.currency}
            onChange={handleChangeCurrency}
            placeHolder=":: Seleccione moneda ::"
            data={dataCurrency}
            dataValue="code"
            dataText="name"
          />
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            id="txtMaximum"
            label="Límite"
            width="250px"
            value={assistanceData.maximum.toString()}
            onChange={handleChangeMaximum}
          />
          <InputText
            id="txtEvents"
            type="number"
            label="Eventos anuales"
            width="120px"
            value={assistanceData.events.toString()}
            onChange={handleChangeEvents}
          />
          <InputText
            id="txtLack"
            type="number"
            label="Carencia"
            width="120px"
            value={assistanceData.lack.toString()}
            onChange={handleChangeLack}
          />
        </ContentRow>
      </ContentCell>
      <Button
        text="Registrar"
        width="150px"
        onClick={handleClickAddAssistance}
        enabled={enableButton}
      />
    </ContentCell>
  );
};

export default ProductAssistance;
