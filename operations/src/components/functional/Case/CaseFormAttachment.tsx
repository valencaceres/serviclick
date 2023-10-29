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
import ButtonIcon from "~/components/ui/ButtonIcon";
import FloatMenu from "~/components/ui/FloatMenu";
import { useToast } from "~/components/ui/use-toast";
import CaseDocumentsTable from "./CaseDocumentsTable";

const CaseFormService = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { caseData, caseValue, getById, upsert } = useCase();
  const idCase = router?.query?.id;
  useEffect(() => {
    getById(idCase as string);
  }, []);
  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const handleProcedureChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedProcedure(selectedValue);
  };
  const procedures = [
    { id: "alliance", name: "Designación de alianza" },
    { id: "specialist", name: "Envío de especialista" },
    { id: "imed", name: "Descuento Imed" },
    { id: "refund", name: "Reembolso" },
  ];

  const { user } = useUser();
  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();
  const { setTitleUI, filters } = useUI();

  useEffect(() => {
    setTitleUI("Caso - Antecedentes (Adjuntos)");
  }, [router]);

  const handleAddService = async () => {
    try {
      upsert({
        alliance: caseValue.alliance,
        assistance_id: caseValue?.assistance?.id ?? "",
        beneficiary: caseValue?.beneficiary,
        case_number: caseValue?.case_number,
        case_id: idCase as string,
        cost: caseValue?.cost,
        customer: caseValue?.customer,
        event: caseValue.event,
        files: caseValue?.files,
        history: caseValue?.history,
        insured: caseValue?.insured,
        is_active: caseValue?.is_active,
        lead_id: caseValue?.lead_id,
        procedure_id: caseValue?.procedure_id,
        product: caseValue?.product,
        products: caseValue?.products,
        refund_amount: caseValue?.refund_amount,
        retail: caseValue?.retail,
        retails: caseValue?.retails,
        specialist: caseValue?.specialist,
        type: caseValue?.type,
        user_id: null,
        values: caseValue?.values,
      });

      router.push(`/assistance/case/${selectedProcedure}/${idCase}`);
    } catch (e) {
      setError("Faltaron campos");
    }
  };

  const handleSubmit = (file: any, documentId: any) => {
    const formData = new FormData();
    formData.append("case_id", caseValue?.case_id as string);
    formData.append("document_id", documentId.toString());
    formData.append("files", file);

    uploadDocuments(formData, {
      onSuccess: () => {
        toast({
          title: "Documento subido correctamente",
          description: "Se ha subido correctamente el documento.",
        });
        queryClient.invalidateQueries(["case"]);
      },
      onError: () => {
        toast({
          title: "Error al subir documentos",
          description:
            "Ha ocurrido un error al subir los documentos, por favor intenta nuevamente.",
          variant: "destructive",
        });
      },
    });
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push(`/assistance/case/product/${idCase as string}`);
  };
  const handleClickSave = () => {
    handleAddService();
  };
  return (
    <div className="w-1/2 lg:w-2/6">
      <ContentCell gap="20px">
        <div className="flex flex-col gap-[5px]">
          {caseValue?.customer && caseValue?.customer ? (
            <InputText
              label="Cliente"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseData?.customer?.name || `${caseValue?.customer?.name} `
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
                  : caseValue?.insured?.name ||
                    `${caseValue?.insured?.name} ${caseValue?.insured?.paternallastname}`
              }
              disabled
            />
          )}
          {caseValue?.retail && caseValue?.retail && (
            <InputText
              label="Empresa"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.retail?.name || `${caseValue?.retail?.name} `
              }
              disabled
            />
          )}

          {caseValue?.beneficiary?.name && (
            <InputText
              label="Beneficiario"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.beneficiary?.name ||
                    `${caseValue?.beneficiary?.name} ${caseValue?.beneficiary?.paternallastname}`
              }
              disabled
            />
          )}
        </div>
        <div className="flex flex-col gap-[5px]">
          <InputText
            label="Producto"
            type="text"
            value={caseValue?.product?.name ?? ""}
            disabled={true}
          />
          <InputText
            label="Servicio"
            type="text"
            value={caseValue?.assistance?.name ?? ""}
            disabled={true}
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <ComboBox
            label="Procedimiento"
            placeHolder="Seleccione el procedimiento"
            width="525px"
            value={selectedProcedure}
            onChange={handleProcedureChange}
            data={procedures}
            dataText="name"
            dataValue="id"
          />
          {/*    <CaseDocumentsTable
            thisStage={"Datos de antecedentes"}
            handleSubmit={handleSubmit}
            caseValue={caseValue}
          /> */}
        </div>
      </ContentCell>

      <LoadingMessage />
      <Fragment>
        <FloatMenu>
          <ButtonIcon iconName="home" onClick={handleClickHome} />
          <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
          <ButtonIcon
            iconName="save"
            onClick={() => {
              handleClickSave();
            }}
          />
        </FloatMenu>
      </Fragment>
    </div>
  );
};

export default CaseFormService;
