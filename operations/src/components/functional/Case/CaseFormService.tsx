import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Document, Page } from "react-pdf";
import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";
import { Modal, Window } from "~/components/ui/Modal";
import {
  useQueryAssistances,
  useQueryCase,
  useQueryContractor,
  useQueryLead,
  useQueryStage,
  useQueryUF,
  useQueryProduct,
} from "../../../hooks/query";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/ButtonC";
import { useDistrict } from "~/hooks";
import { useUI } from "~/hooks";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useCase } from "~/store/hooks/useCase";
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
  subscription_id?: string;
  insured_id: string;
  name: string;
  assistance: IAssistance;
  created_at: string;
  start_date: string;
  end_date: string;
}

const CaseFormService = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    caseData,
    getRetails,
    getServicesAndValues,
    retailList,
    upsert,
    isLoading,
    getApplicantByRut,
  } = useCase();
  console.log(caseData);
  useEffect(() => {
    getRetails();
    getApplicantByRut(caseData?.insured?.rut);
  }, []);

  const [uniqueAssistances, setUniqueAssistances] = useState<any>([]);
  const [selectedAssistance, setSelectedAssistance] =
    useState<IAssistance | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [district, setDistrict] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const productId = selectedProduct?.id ?? "";
  const { data: newCaseNumber } = useQueryCase().useGetNewCaseNumber();
  console.log(productId);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.roles?.operaciones === "admin";

  const { data: ufValue } = useQueryUF().useGetUFValue();
  const { data: stageData } = useQueryStage().useGetAll();
  const isSingleProduct = caseData?.products?.length === 1;

  const { data: assistanceData } = useQueryCase().useGetAssistanceData(
    caseData?.insured?.id,
    selectedAssistance?.id as string,
    selectedProduct?.id as string
  );
  const { setTitleUI, filters } = useUI();

  useEffect(() => {
    setTitleUI(
      `Caso N°${
        router.pathname === "/assistance/case/product" ? newCaseNumber : 1
      }`
    );
  }, [router, newCaseNumber]);
  const contractorId = caseData?.retail?.id || caseData?.customer?.id;

  const { data: contractorSubscriptions } =
    useQueryContractor().useGetProductsByContractor(contractorId);
  console.log(contractorSubscriptions);
  /*   const { data: pdfProductPlan } =
   useQueryProduct().useGetContractByProductPlanId(
    productId,
      thisCase?.contractor_id 
      "1a6d08b0-f27a-4de0-8e1d-855bead4282f",
      "7ea804e5-6de1-4e60-affc-f5b31af90ba3"
    );  */
  const { mutate: updateCase } = useQueryCase().useCreate();
  const { mutate: assignValue } = useQueryAssistances().useAssignValue();
  const { mutate: createLead } = useQueryLead().useAddFromCase();

  /*   const pdfBase64 = Buffer.from(pdfProductPlan).toString("base64");
  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;
  console.log(pdfDataUrl); */

  useEffect(() => {
    if (!caseData) {
      const productsMap = new Map(
        contractorSubscriptions?.map((subscription: any) => [
          subscription.id,
          subscription,
        ])
      );
      setRelatedProducts(Array.from(productsMap.values()));
      return;
    }
    const productsMap = new Map(
      caseData?.products?.map((product: any) => [product.id, product])
    );
    setRelatedProducts(Array.from(productsMap.values()));
  }, [contractorSubscriptions, caseData]);

  useEffect(() => {
    if (selectedProduct) {
      if (!caseData) {
        const assistancesMap = new Map();
        contractorSubscriptions
          ?.filter(
            (subscription: any) => subscription.id === selectedProduct?.id
          )
          .forEach((subscription: any) => {
            subscription.assistances?.forEach((assistance: any) => {
              assistancesMap.set(assistance.id, { ...assistance });
            });
          });
        setUniqueAssistances(Array.from(assistancesMap.values()));
        return;
      }
      const assistancesMap = new Map(
        caseData?.products
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
  }, [caseData?.products, selectedProduct]);
  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    const product = relatedProducts.find((p: any) => p.id === productId);
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
  useEffect(() => {
    if (caseData?.product?.id) {
      const product = relatedProducts.find(
        (p: any) => p.id === caseData?.product?.id
      );
      setSelectedProduct(product || null);

      if (caseData?.assistance_id) {
        const assistance = uniqueAssistances.find(
          (a: any) => a.id === caseData.assistance_id
        );
        setSelectedAssistance(assistance || null);
      }
    }
  }, [caseData, relatedProducts, uniqueAssistances]);

  const handleAddService = () => {
    console.log("ola");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <ContentCell gap="5px">
        <ContentCell gap="5px">
          <ContentCell gap="20px">
            <div className="flex flex-col gap-[5px]">
              {caseData?.customer && caseData?.customer ? (
                <InputText
                  label="Cliente"
                  className="capitalize"
                  value={
                    isLoading
                      ? "Cargando..."
                      : caseData?.customer?.name ||
                        `${caseData?.customer?.name} ${caseData?.customer?.paternalLastName}`
                  }
                  disabled
                />
              ) : (
                <InputText
                  label="Titular"
                  className="capitalize"
                  value={
                    isLoading
                      ? "Cargando..."
                      : caseData?.insured?.name ||
                        `${caseData?.insured?.name} ${caseData?.insured?.paternalLastName}`
                  }
                  disabled
                />
              )}
              {caseData?.retail && caseData?.retail && (
                <InputText
                  label="Empresa"
                  className="capitalize"
                  value={
                    isLoading
                      ? "Cargando..."
                      : caseData?.retail?.name || `${caseData?.retail?.name} `
                  }
                  disabled
                />
              )}

              {caseData?.beneficiary?.name && (
                <InputText
                  label="Beneficiario"
                  className="capitalize"
                  value={
                    isLoading
                      ? "Cargando..."
                      : caseData?.beneficiary?.name ||
                        `${caseData?.beneficiary?.name} ${caseData?.beneficiary?.paternalLastName}`
                  }
                  disabled
                />
              )}
            </div>
            <div>
              {isSingleProduct ? (
                <InputText
                  label="Producto"
                  type="text"
                  value={caseData.products[0].name}
                  disabled={true}
                />
              ) : (
                <ComboBox
                  label="Producto"
                  placeHolder="Seleccione producto"
                  width="525px"
                  value={selectedProduct?.id || ""}
                  enabled={
                    caseData?.is_active ||
                    (!caseData ? true : false) ||
                    !(caseData?.assistance_id !== null && !isAdmin)
                  }
                  onChange={handleProductChange}
                  data={relatedProducts}
                  dataText="name"
                  dataValue="id"
                />
              )}
            </div>
          </ContentCell>
          <ComboBox
            label="Servicio"
            placeHolder="Seleccione servicio"
            width="525px"
            value={selectedAssistance?.id || ""}
            enabled={caseData?.is_active || !caseData ? true : false}
            onChange={handleAssistanceChange}
            data={uniqueAssistances}
            dataText="name"
            dataValue="id"
          />
          <>
            <ContentRow gap="5px">
              <InputText
                label={
                  selectedAssistance?.currency === "U"
                    ? "Monto Autorizado (UF)"
                    : "Monto Autorizado ($)"
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
                          ufValue?.serie[0].valor
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
                        ufValue?.serie[0].valor
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
                  label="Eventos"
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
              />{" "}
            </ContentRow>
            <ContentRow gap="5px">
              <InputText
                label={
                  selectedAssistance?.currency === "U"
                    ? "Monto Utilizado (UF)"
                    : "Monto Utilizado ($)"
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
                          ufValue?.serie[0].valor
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
                        ufValue?.serie[0].valor
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
                  label="Eventos utilizados"
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
            </ContentRow>
          </>
        </ContentCell>

        <CaseServiceTable
          product={selectedProduct}
          assistance={selectedAssistance}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormService;
