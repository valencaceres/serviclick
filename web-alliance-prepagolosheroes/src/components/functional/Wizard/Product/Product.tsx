import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Screen, Content, Footer, Col } from "../../../layout/Form";

import Button from "../../../ui/Button/Button";
import Loading from "../../../ui/Loading";
import InputText from "../../../ui/InputText";

import { useProduct, useLead } from "../../../../hooks/store";

interface IValue {
  id: string;
  value: string;
}

const Product = () => {
  const router = useRouter();

  const { product } = useProduct();
  const { lead, getById, create, isSuccess, isLoading } = useLead();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [values, setValues] = useState<IValue[]>();

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
    create({
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
  };

  useEffect(() => {
    getById(lead.id);
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
    if (isSuccess) {
      const { slug, plan } = router.query;
      router.push(
        `/${slug}/${
          product.beneficiaries > 0 ? "beneficiaries" : "payment"
        }/${plan}?leadId=${lead.id}`
      );
    }
  }, [isSuccess]);

  return (
    <Screen>
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
      {isLoading && <Loading />}
    </Screen>
  );
};

export default Product;
