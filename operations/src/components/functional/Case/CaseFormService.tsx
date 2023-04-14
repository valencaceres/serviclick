import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../../ui/Button";
import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";

import { useCase } from "../../../store/hooks/useCase";
import { useQueryCase, useQueryStage, useQueryUF } from "../../../hooks/query";
import { useUser } from "../../../hooks";
import axios from "axios";

interface IAssistance {
  id: string;
  name: string;
  amount: string;
  currency: string;
  maximum: string;
  lack: string;
  events: string;
}

interface IProduct {
  id: string;
  name: string;
  assistance: IAssistance;
}

const CaseFormService = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { case_id } = router.query;

  const [uniqueAssistances, setUniqueAssistances] = useState<any>([]);
  const [selectedAssistance, setSelectedAssistance] =
    useState<IAssistance | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState<string>("");

  const { data } = useCase();
  const { id: user_id } = useUser().user;

  const { data: ufValue } = useQueryUF().useGetUFValue();
  const { data: thisCase } = useQueryCase().useGetById(case_id as string);
  const { data: stageData } = useQueryStage().useGetAll();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const { data: assistanceData } = useQueryCase().useGetAssistanceData(
    thisCase?.applicant_id,
    selectedAssistance?.id as string,
    selectedProduct?.id as string
  );

  useEffect(() => {
    const assistancesMap = new Map(
      data?.products.map((product) => [
        product.assistance.id,
        { ...product.assistance },
      ])
    );
    setUniqueAssistances(Array.from(assistancesMap.values()));
  }, []);

  useEffect(() => {
    if (selectedAssistance) {
      const productsMap = new Map(
        data?.products
          .filter((product) => product.assistance.id === selectedAssistance?.id)
          .map((product) => [product.id, product])
      );
      setRelatedProducts(Array.from(productsMap.values()));
    } else {
      if (selectedAssistance === null) {
        setSelectedProduct(null);
      }
      setRelatedProducts([]);
    }
  }, [selectedAssistance]);

  useEffect(() => {
    setSelectedProduct(relatedProducts[0]);
  }, [relatedProducts]);

  const handleAssistanceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const assistanceId = event.target.value;
    const assistance =
      uniqueAssistances.find((a: any) => a.id === assistanceId) || null;
    setSelectedAssistance(assistance);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    const product =
      relatedProducts.find((p: any) => p.id === productId) || null;
    setSelectedProduct(product);
  };

  const currentStage = useMemo(() => {
    return (
      stageData?.find((s: any) => s.name === "Registro de servicio")?.id || ""
    );
  }, [stageData]);

  const currentDescription = useMemo(() => {
    return thisCase?.stages.find((s: any) => s.stage === "Registro de servicio")
      ?.description;
  }, [thisCase]);

  useEffect(() => {
    if (currentStage) {
      setStage(currentStage);
    }
  }, [currentStage]);

  useEffect(() => {
    if (currentDescription) {
      setDescription(currentDescription);
    }
  }, [currentDescription]);

  const handleAddService = () => {
    if (selectedAssistance && selectedProduct && description) {
      return updateCase(
        {
          applicant: {
            id: thisCase?.applicant_id,
          },
          number: thisCase?.case_number,
          product_id: selectedProduct?.id,
          assistance_id: selectedAssistance?.id,
          stage_id: stage,
          user_id: user_id,
          description,
          isactive: true,
        },
        {
          onSuccess: () => {
            router.push(`/case/${thisCase?.case_id}/evaluación del evento`);
            queryClient.invalidateQueries(["case", thisCase?.case_id]);
          },
        }
      );
    }
    alert("Debe completar todos los campos");
  };

  useEffect(() => {
    if (thisCase?.assistance_id && thisCase?.product_id) {
      const assistance = uniqueAssistances.find(
        (a: any) => a.id === thisCase.assistance_id
      );
      setSelectedAssistance(assistance || null);

      const product = relatedProducts.find(
        (p: any) => p.id === thisCase.product_id
      );
      setSelectedProduct(product || null);
    }
  }, [thisCase, uniqueAssistances, relatedProducts]);

  return (
    <div>
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          <ComboBox
            label="Servicio"
            placeHolder="Seleccione servicio"
            width="525px"
            value={selectedAssistance?.id || ""}
            enabled={thisCase?.is_active || !thisCase ? true : false}
            onChange={handleAssistanceChange}
            data={uniqueAssistances}
            dataText="name"
            dataValue="id"
          />
          {selectedAssistance && (
            <ComboBox
              label="Producto"
              placeHolder="Seleccione producto"
              width="525px"
              value={selectedProduct?.id || ""}
              enabled={thisCase?.is_active || !thisCase ? true : false}
              onChange={handleProductChange}
              data={relatedProducts}
              dataText="name"
              dataValue="id"
            />
          )}
          {selectedProduct ? (
            <>
              <ContentRow gap="5px">
                <InputText
                  label={
                    selectedAssistance?.currency === "U"
                      ? "Monto Disponible (UF)"
                      : "Monto Disponible ($)"
                  }
                  value={
                    assistanceData
                      ? selectedAssistance?.currency === "P"
                        ? assistanceData?.remaining_amount.toLocaleString(
                            "es-CL",
                            {
                              style: "currency",
                              currency: "CLP",
                            }
                          )
                        : (
                            assistanceData?.remaining_amount *
                            ufValue.serie[0].valor
                          ).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })
                      : selectedAssistance?.currency === "P"
                      ? parseInt(selectedAssistance?.amount).toLocaleString(
                          "es-CL",
                          {
                            style: "currency",
                            currency: "CLP",
                          }
                        )
                      : (
                          parseInt(selectedAssistance?.amount!) *
                          ufValue.serie[0].valor
                        ).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                  }
                  type="text"
                  width="152px"
                  disabled
                />
                <InputText
                  label="Eventos restantes"
                  value={assistanceData?.remaining_events || ""}
                  type="number"
                  width="129px"
                  disabled
                />
                <InputText
                  label="Límite"
                  value={selectedAssistance?.maximum || ""}
                  type="text"
                  width="234px"
                  disabled
                />
              </ContentRow>
            </>
          ) : null}
        </ContentCell>
        {selectedProduct ? (
          <Fragment>
            <h2 className="text-md font-semibold text-secondary-500">
              {selectedProduct?.name}
            </h2>
            <CaseServiceTable product={selectedProduct} />
            <TextArea
              value={description}
              disabled={thisCase?.is_active ? false : true}
              onChange={(e: any) => setDescription(e.target.value)}
              label="Descripción del evento"
              width="525px"
              height="110px"
            />
          </Fragment>
        ) : null}
        <Button
          text="Continuar"
          enabled={thisCase?.is_active ? true : false}
          onClick={handleAddService}
        />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormService;
