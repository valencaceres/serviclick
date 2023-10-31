import React, { Fragment, useEffect, useState } from "react";
import { ContentCell } from "~/components/layout/Content";
import { ComboBox, InputText } from "~/components/ui";
import { useDistrict } from "~/hooks";
import { IApplicant } from "~/interfaces/applicant";
import { useCase } from "~/store/hooks";
import CaseDocumentsTable from "../../Case/CaseDocumentsTable";
import { useProcedure } from "~/store/hooks";
import { useToast } from "~/components/ui/use-toast";
import { useQueryCase } from "~/hooks/query";
import { useQueryClient } from "@tanstack/react-query";

interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseAttachment = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  const { caseValue, setCase } = useCase();
  const queryClient = useQueryClient();
  const { list: districtList } = useDistrict();
  const { procedureList, getAll } = useProcedure();
  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();
  const [applicant, setApplicant] = useState<IApplicant>();
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const { toast } = useToast();
  console.log(procedureList);
  const handleChange = (e: any) => {
    const value = e.target.value;
    const id = e.target.id;

    setCase({
      ...caseValue,
      [id]: value,
    });
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
  useEffect(() => {
    getAll();
    if (caseValue) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, []);
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
            disabled={itWasFound}
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            id="customer"
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue.type === "C" && (
          <InputText
            id="insured"
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue.insured?.name} ${caseValue.insured?.paternalLastName} ${caseValue.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
            disabled={itWasFound}
          />
        )}
        <InputText
          id="applicant"
          label="Beneficiario"
          type="text"
          value={
            caseValue
              ? `${applicant?.name} ${applicant?.paternalLastName} ${applicant?.maternalLastName}` ||
                ""
              : ""
          }
          width="530px"
          disabled={itWasFound}
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
          <ComboBox
            label="Procedimiento"
            id="procedure_id"
            placeHolder="Seleccione el procedimiento"
            width="525px"
            value={caseValue.procedure_id ?? ""}
            onChange={handleChange}
            data={procedureList}
            dataText="name"
            dataValue="id"
          />
          {/*      <CaseDocumentsTable
            thisStage={"attachment"}
            handleSubmit={handleSubmit}
            caseValue={caseValue}
          /> */}
        </ContentCell>
      </ContentCell>
    </ContentCell>
  );
};

export default CaseAttachment;
