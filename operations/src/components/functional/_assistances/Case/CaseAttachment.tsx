import React, { Fragment, useEffect, useState } from "react";
import { ContentCell } from "~/components/layout/Content";
import { InputText } from "~/components/ui";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";
import CaseDocumentsTable from "../../Case/CaseDocumentsTable";
import { useToast } from "~/components/ui/use-toast";
import { useQueryAssistances } from "~/hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import useStage from "~/store/hooks/useStage";
import { useRouter } from "next/router";

interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseAttachment = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { stage } = router.query;
  const { toast } = useToast();

  const { caseValue, setCase } = useCase();
  const { getAll: getStages, stageList } = useStage();
  const { mutate: uploadDocuments, isLoading } =
    useQueryAssistances().useUploadDocument();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [thisStage, setThisStage] = useState<string>("");

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

  useEffect(() => {
    getStages();
    if (caseValue) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, []);

  useEffect(() => {
    let foundStageCode = "";
    if (stageList) {
      const foundStage = stageList.find(
        (s: any) => s.code.toLowerCase() === stage
      );
      if (foundStage) {
        foundStageCode = foundStage.code;
      }
    }
    setThisStage(foundStageCode);
  }, [stageList, stage]);

  return (
    <ContentCell gap="20px">
      <ContentCell gap="5px">
        {caseValue.retail?.rut !== caseValue.customer.rut && (
          <InputText
            id="retail"
            label="Empresa"
            type="text"
            value={caseValue ? caseValue.retail?.name || "" : ""}
            width="530px"
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            id="customer"
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
          />
        )}
        {caseValue.type === "C" && (
          <InputText
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue.insured?.name} ${caseValue.insured?.paternalLastName} ${caseValue.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
          />
        )}
        <InputText
          label="Beneficiario"
          type="text"
          value={
            caseValue
              ? `${applicant?.name} ${applicant?.paternalLastName} ${applicant?.maternalLastName}` ||
                ""
              : ""
          }
          width="530px"
        />
      </ContentCell>
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          {caseValue.case_id !== "" && (
            <Fragment>
              <InputText
                id="product"
                label="Producto"
                type="text"
                value={caseValue.product.name}
                width="530px"
                disabled={itWasFound}
              />
              <InputText
                id="assistance"
                label="Asistencia"
                type="text"
                value={caseValue.assistance.name}
                width="530px"
                disabled={itWasFound}
              />
            </Fragment>
          )}{" "}
        </ContentCell>
        <ContentCell gap="5px">
          <CaseDocumentsTable
            thisStage={thisStage}
            handleSubmit={handleSubmit}
            caseValue={caseValue}
          />
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseAttachment;
