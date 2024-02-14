import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Body, Content, Footer, Col } from "@/components/layout/Generic";
import { Card, CardContent, CardFooter } from "@/components/ui/card-ui";
import InputText from "@/components/ui/Input-ui-box";
import { Button } from "@/components/ui/button-ui";
import Loading from "@/components/ui/Loading";
import Tooltip from "@/components/ui/Tooltip";

import { useUI, useProduct, useLead } from "@/store/hooks";

interface IValue {
  id: string;
  value: string;
}

const Product = () => {
  const router = useRouter();

  const { ui } = useUI();
  const { lead, getLeadById, createLead, leadIsLoading } = useLead();
  const { product } = useProduct();

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
        user_id: ui.userId,
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
        `/${
          product.beneficiaries > 0 ? "beneficiaries" : "payment"
        }?productPlanId=${ui.product.productPlan_id}&leadId=${lead.id}&userId=${
          ui.userId
        }`
      );
      setIsProcessing(false);
    }
  }, [lead.id, leadIsLoading, isProcessing]);

  return (
    <Body>
      <Card className="mt-4 mb-4">
        <CardContent className="py-4">
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
        </CardContent>
        <CardFooter className="w-full ">
          <Button
            className={`text-white w-full ${
              isButtonEnabled ? "bg-[#03495C]" : "bg-gray-400"
            } ${
              !isButtonEnabled && "cursor-not-allowed"
            }  active:bg-opacity-80`}
            onClick={handleClickSave}
            disabled={!isButtonEnabled}
          >
            Registrar
          </Button>
        </CardFooter>
      </Card>
      {leadIsLoading && <Loading />}
      <Tooltip>
        <h1>Datos del Producto</h1>
        <h2>(Paso 3 de 4)</h2>
        <br />
        Ingresa la información que te solicitamos para asociarla al producto que
        estás contratanto y así mejorar nuestra atención.
        <br />
        <br />
        En el caso del&nbsp;<b>Tipo de previsión</b>, debes especificarnos si
        estás afiliado a isapre y brindarnos su nombre (Isapre Consalud, Isapre
        Banmédica, etc.) o si estás afiliado a Fonasa indicanos si eres Fonasa A
        o Fonasa B.
      </Tooltip>
    </Body>
  );
};

export default Product;
