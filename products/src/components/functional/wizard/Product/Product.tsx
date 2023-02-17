import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Body, Content, Footer, Col } from "../../../layout/Generic";

import Button from "@/components/ui/Button/Button";
import Loading from "@/components/ui/Loading";
import InputText from "@/components/ui/InputText";
import Tooltip from "@/components/ui/Tooltip";

import { useUI, useProduct, useLead } from "../../../../store/hooks";

interface IValue {
  id: string;
  value: string;
}

const Product = () => {
  const router = useRouter();

  const { ui } = useUI();
  const { lead, getLeadById, createLead, leadIsLoading } = useLead();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [values, setValues] = useState<IValue[]>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChangeValue = (event: any, num: number) => {
    values &&
      values.length > 0 &&
      setValues(
        values.map((item, idx: number) => {
          return {
            id: item.id,
            value: idx === num ? event.target.value : item.value,
          };
        })
      );
  };

  const handleClickSave = () => {
    if (lead && lead.insured && lead.insured.length > 0) {
      setIsProcessing(true);
      createLead({
        ...lead,
        insured:
          lead.insured && lead.insured.length > 0
            ? [
                {
                  ...lead.insured[0],
                  values: values?.map((item) => {
                    return {
                      value_id: item.id,
                      valuetype_code: "",
                      family_id: "",
                      family_name: "",
                      value_name: "",
                      value: item.value,
                    };
                  }),
                },
              ]
            : [],
        subscription: false,
        send: false,
      });
    }
  };

  useEffect(() => {
    getLeadById(lead.id);
  }, []);

  useEffect(() => {
    if (
      lead &&
      lead.insured &&
      lead.insured.length > 0 &&
      lead.insured[0].values
    ) {
      const arrayValues: IValue[] = [];
      lead.insured[0].values.map((item, idx: number) =>
        arrayValues.push({ id: item.value_id, value: item.value })
      );
      setValues(arrayValues);
    }
  }, [lead]);

  useEffect(() => {
    if (values && values.length > 0) {
      setIsButtonEnabled(!values.some((item) => item.value === ""));
    }
  }, [values]);

  useEffect(() => {
    if (lead.id !== "" && leadIsLoading === false && isProcessing === true) {
      router.push(
        `/payment?productPlanId=${ui.product.productPlan_id}&leadId=${lead.id}`
      );
      setIsProcessing(false);
    }
  }, [lead.id, leadIsLoading, isProcessing]);

  return (
    <Body>
      <Content>
        <Col width="340px">
          {lead &&
            lead.insured &&
            lead.insured.length > 0 &&
            lead.insured[0].values &&
            lead.insured[0].values.map((item, idx: number) => (
              <InputText
                key={idx}
                maxLength={250}
                width="340px"
                label={item.value_name}
                value={values ? values[idx].value : ""}
                onChange={(e: any) => handleChangeValue(e, idx)}
              />
            ))}
        </Col>
      </Content>
      <Footer>
        <Button
          text="Registrar"
          width="200px"
          onClick={handleClickSave}
          enabled={isButtonEnabled}
        />
      </Footer>
      {leadIsLoading && <Loading />}
      <Tooltip>
        <h1>Datos del producto</h1>
        <br />
        Ingresa la información que te solicitamos para asociarla al producto que
        estás contratanto y así mejorar nuestra atención.
        <br />
        <br />
        En el caso del tipo de previsión, debes especificar si estás afiliado a
        isapre o Fonasa (A o B)
      </Tooltip>
    </Body>
  );
};

export default Product;
