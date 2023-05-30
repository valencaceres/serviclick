import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";

import {
  useQueryAssistances,
  useQueryCase,
  useQueryContractor,
  useQueryStage,
  useQueryUF,
} from "../../../hooks/query";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/ButtonC";
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
  lead_id: string;
  insured_id: string;
  name: string;
  assistance: IAssistance;
  created_at: string;
}

const CaseFormService = ({ thisCase }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [uniqueAssistances, setUniqueAssistances] = useState<any>([]);
  const [selectedAssistance, setSelectedAssistance] =
    useState<IAssistance | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  const { user } = useUser();

  const { data: ufValue } = useQueryUF().useGetUFValue();
  const { data: stageData } = useQueryStage().useGetAll();

  const { data: assistanceData } = useQueryCase().useGetAssistanceData(
    thisCase?.insured_id,
    selectedAssistance?.id as string,
    selectedProduct?.id as string
  );

  const { data } = useQueryCase().useGetBeneficiaryByRut(thisCase?.rut);
  const { data: contractor, isLoading: isLoadingContractor } =
    useQueryContractor().useGetById(thisCase?.contractor_id);

  const { mutate: updateCase } = useQueryCase().useCreate();
  const { mutate: assignValue } = useQueryAssistances().useAssignValue();

  const selectedProductCreatedAt = useMemo(() => {
    const date = new Date(selectedProduct?.created_at || "");
    return date.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [selectedProduct]);

  useEffect(() => {
    const productsMap = new Map(
      data?.products.map((product: any) => [product.id, product])
    );
    setRelatedProducts(Array.from(productsMap.values()));
  }, [data]);

  useEffect(() => {
    if (selectedProduct) {
      const assistancesMap = new Map(
        data?.products
          .filter((product: any) => product.id === selectedProduct?.id)
          .map((product: any) => [
            product.assistance.id,
            { ...product.assistance },
          ])
      );
      setUniqueAssistances(Array.from(assistancesMap.values()));
    } else {
      if (selectedProduct === null) {
        setSelectedAssistance(null);
      }
      setUniqueAssistances([]);
    }
  }, [selectedProduct]);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    const product =
      relatedProducts.find((p: any) => p.id === productId) || null;
    setSelectedProduct(product);
    setSelectedAssistance(null);
  };

  const handleAssistanceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const assistanceId = event.target.value;
    const assistance =
      uniqueAssistances.find((a: any) => a.id === assistanceId) || null;
    setSelectedAssistance(assistance);
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
      setError(null);
      for (const key in formValues) {
        assignValue({
          lead_id: selectedProduct?.lead_id,
          product_id: selectedProduct?.id,
          insured_id: thisCase?.insured_id,
          value_id: key,
          value: formValues[key],
        });
      }
      return updateCase(
        {
          applicant: {
            id: thisCase?.insured_id
              ? thisCase?.insured_id
              : thisCase?.beneficiary_id,
          },
          number: thisCase?.case_number,
          product_id: selectedProduct?.id,
          assistance_id: selectedAssistance?.id,
          beneficiary_id: thisCase?.beneficiary_id,
          company_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
          customer_id:
            contractor?.type === "P" ? thisCase?.contractor_id : null,
          stage_id: stage,
          user_id: user?.id,
          description,
          isactive: true,
        },
        {
          onSuccess: () => {
            router.push(`/case/${thisCase?.case_id}/evaluación del evento`);
            queryClient.invalidateQueries(["assistanceValueById"]);
            queryClient.invalidateQueries(["case", thisCase?.case_id]);
          },
        }
      );
    }
    setError("Debe completar todos los campos");
  };

  useEffect(() => {
    if (thisCase?.product_id) {
      const product = relatedProducts.find(
        (p: any) => p.id === thisCase.product_id
      );
      setSelectedProduct(product || null);

      if (thisCase?.assistance_id) {
        const assistance = uniqueAssistances.find(
          (a: any) => a.id === thisCase.assistance_id
        );
        setSelectedAssistance(assistance || null);
      }
    }
  }, [thisCase, relatedProducts, uniqueAssistances]);

  return (
    <div>
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          {thisCase?.contractor_id && (
            <Link href={`/entities/contractor/${contractor?.id}`}>
              <InputText
                label="Cliente"
                className="capitalize"
                value={
                  isLoadingContractor
                    ? "Cargando..."
                    : contractor?.companyName ||
                      `${contractor?.name} ${contractor?.paternalLastName}`
                }
                disabled
              />
            </Link>
          )}
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
          {selectedProduct && (
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
          )}

          {selectedAssistance ? (
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
                  width={`${
                    Number(selectedAssistance?.events) !== 0 ? "152px" : "286px"
                  }`}
                  disabled
                />
                {Number(selectedAssistance?.events) !== 0 && (
                  <InputText
                    label="Eventos restantes"
                    value={
                      assistanceData
                        ? assistanceData?.remaining_events
                        : selectedAssistance?.events
                    }
                    type="number"
                    width="129px"
                    disabled
                  />
                )}
                <InputText
                  label="Límite"
                  value={selectedAssistance?.maximum || "No hay información"}
                  type="text"
                  width="234px"
                  disabled
                />
              </ContentRow>
            </>
          ) : null}
        </ContentCell>
        {selectedAssistance ? (
          <Fragment>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-secondary-500">
                {selectedProduct?.name}
              </h2>
              <p className="text-secondary-500">
                Fecha de adquisición: <span className="font-semibold">{selectedProductCreatedAt}</span>
              </p>
            </div>
            <CaseServiceTable
              product={selectedProduct}
              assistance={selectedAssistance}
              formValues={formValues}
              setFormValues={setFormValues}
            />
            <TextArea
              value={description}
              disabled={thisCase?.is_active ? false : true}
              onChange={(e: any) => setDescription(e.target.value)}
              label="Descripción del evento"
              width="525px"
              height="110px"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </Fragment>
        ) : null}
        <Button
          disabled={thisCase?.is_active && selectedAssistance ? false : true}
          onClick={handleAddService}
        >
          Continuar
        </Button>
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormService;
