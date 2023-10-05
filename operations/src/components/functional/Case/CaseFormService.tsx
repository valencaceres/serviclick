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
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
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

const CaseFormService = ({ thisCase }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const { list: districtList } = useDistrict();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.roles?.operaciones === "admin";

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
  const { data: contractorSubscriptions } =
    useQueryContractor().useGetProductsByContractor(thisCase?.contractor_id);
  const { data: pdfProductPlan } =
    useQueryProduct().useGetContractByProductPlanId(
      /*    productId,
      thisCase?.contractor_id */
      "1a6d08b0-f27a-4de0-8e1d-855bead4282f",
      "7ea804e5-6de1-4e60-affc-f5b31af90ba3"
    );
  console.log(pdfProductPlan);
  const { mutate: updateCase } = useQueryCase().useCreate();
  const { mutate: assignValue } = useQueryAssistances().useAssignValue();
  const { mutate: createLead } = useQueryLead().useAddFromCase();

  /*   const pdfBase64 = Buffer.from(pdfProductPlan).toString("base64");
  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;
  console.log(pdfDataUrl); */
  console.log(contractorSubscriptions);
  const selectedProductCreatedAt = useMemo(() => {
    const date = new Date(selectedProduct?.created_at || "");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [selectedProduct]);
  const selectedProductStartDate = useMemo(() => {
    const date = new Date(selectedProduct?.start_date || "");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [selectedProduct]);
  const selectedProductEndDate = useMemo(() => {
    const date = new Date(selectedProduct?.end_date || "");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [selectedProduct]);
  useEffect(() => {
    if (!data) {
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
      data?.products.map((product: any) => [product.id, product])
    );
    setRelatedProducts(Array.from(productsMap.values()));
  }, [contractorSubscriptions, data]);

  useEffect(() => {
    if (selectedProduct) {
      if (!data) {
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
  }, [data?.products, selectedProduct]);
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

  const currentStage = useMemo(() => {
    return (
      stageData?.find((s: any) => s.name === "Registro de servicio")?.id || ""
    );
  }, [stageData]);

  const currentDescription = useMemo(() => {
    return thisCase?.stages.find((s: any) => s.stage === "Registro de servicio")
      ?.description;
  }, [thisCase]);

  const currentEventDate = useMemo(() => {
    return thisCase?.event_date;
  }, [thisCase]);

  const currentDistrict = useMemo(() => {
    return thisCase?.event_location;
  }, [thisCase]);

  useEffect(() => {
    if (currentStage) setStage(currentStage);
    if (currentDescription) setDescription(currentDescription);
    if (currentEventDate) setEventDate(new Date(currentEventDate));
    if (currentDistrict) setDistrict(currentDistrict);
  }, [currentDescription, currentDistrict, currentEventDate, currentStage]);
  const handleAddService = () => {
    if (thisCase?.assistance_id !== null && !isAdmin) {
      router.push(`/case/${thisCase?.case_id}/evaluación del evento`);
      return;
    }
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
      if (!data) {
        createLead({
          subscription_id: selectedProduct?.subscription_id,
          beneficiary_id: thisCase?.beneficiary_id,
          insured_id: thisCase?.insured_id,
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
          retail_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
          customer_id:
            contractor?.type === "P" ? thisCase?.contractor_id : null,
          stage_id: stage,
          user_id: user?.id,
          description,
          isactive: true,
          lead_id: selectedProduct?.lead_id,
          event_date: eventDate,
          event_location: district,
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

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <ContentCell gap="10px">
        <ContentCell gap="5px">
          {thisCase?.contractor_id && contractor && (
            <Link href={`/entities/contractor/${contractor?.id}`} passHref>
              <InputText
                label="Cliente"
                className="capitalize"
                value={
                  isLoadingContractor
                    ? "Cargando..."
                    : contractor?.name ||
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
            enabled={
              thisCase?.is_active ||
              (!thisCase ? true : false) ||
              !(thisCase?.assistance_id !== null && !isAdmin)
            }
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
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-secondary-500">
                {selectedProduct?.name}
              </h2>
              <div className="flex gap-2">
                <p className="text-secondary-500">
                  Fecha de adquisición:{" "}
                  <span className="font-semibold">
                    {selectedProductCreatedAt}
                  </span>
                </p>
              </div>
              {selectedProduct?.start_date != null && (
                <div className="flex gap-2">
                  <p className="text-secondary-500">
                    Fecha de inicio:{" "}
                    <span className="font-semibold">
                      {selectedProductStartDate}
                    </span>
                  </p>
                  {selectedProduct?.end_date != null && (
                    <p className="text-secondary-500">
                      Fecha de termino:{" "}
                      <span className="font-semibold">
                        {selectedProductEndDate}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
            {/*      {pdfProductPlan && (
              <>
                {" "}
                <Button
                  disabled={
                    selectedProduct != null && selectedAssistance ? false : true
                  }
                  type="button"
                  onClick={() => setModalIsOpen(true)}
                >
                  Ver Contrato
                </Button>
                <Modal showModal={modalIsOpen}>
                  <Window title="Contrato" setClosed={closeModal}></Window>
                  <Document file={pdfDataUrl}>
                    <Page pageNumber={1} />
                  </Document>
                  <Button onClick={closeModal}>Cerrar</Button>
                </Modal>
              </>
            )} */}
            <CaseServiceTable
              product={selectedProduct}
              assistance={selectedAssistance}
              formValues={formValues}
              setFormValues={setFormValues}
            />
            <ContentRow gap="5px">
              <InputText
                label="Fecha del evento"
                value={
                  eventDate instanceof Date && !isNaN(eventDate.getTime())
                    ? eventDate.toISOString().substring(0, 10)
                    : ""
                }
                type="date"
                width="234px"
                onChange={(e: any) => setEventDate(new Date(e.target.value))}
                disabled={thisCase?.is_active ? false : true}
              />
              <ComboBox
                label="Comuna del evento"
                placeHolder="Seleccione comuna"
                width="286px"
                data={districtList}
                dataText="district_name"
                dataValue="district_name"
                value={district}
                onChange={(e: any) => setDistrict(e.target.value)}
                enabled={thisCase?.is_active ? true : false}
              />
            </ContentRow>
            <TextArea
              value={description}
              disabled={
                (thisCase?.is_active ? false : true) ||
                (thisCase.assistance_id !== null && !isAdmin)
              }
              onChange={(e: any) => setDescription(e.target.value)}
              label="Descripción del evento"
              width="525px"
              height="110px"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </>
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
