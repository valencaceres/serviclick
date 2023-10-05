import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";

import CaseDocumentsTable from "./CaseDocumentsTable";

import {
  useQueryCase,
  useQueryContractor,
  useQueryStage,
} from "../../../hooks/query";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";
import { Button } from "~/components/ui/ButtonC";
import { useToast } from "~/components/ui/use-toast";

const CaseFormRecordReception = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [uploadedFiles, setUploadedFiles] = useState<
    { file: any; documentId: any }[]
  >([]);
  const [thisStage, setThisStage] = useState<string>("");

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();
  const { data: contractor } = useQueryContractor().useGetById(
    thisCase?.contractor_id
  );

  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const handleSubmit = (file: any, documentId: any) => {
    const formData = new FormData();
    formData.append("case_id", thisCase?.case_id);
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
  const handleContinue = () => {
    updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        retail_id: contractor?.type === "C" ? thisCase?.contractor_id : null,
        customer_id: contractor?.type === "P" ? thisCase?.contractor_id : null,
        stage_id:
          stages?.find((s: any) => s.name === "Recepción de antecedentes")
            ?.id || "",
        user_id: user?.id,
        isactive: true,
        lead_id: thisCase?.lead_id,
        event_date: thisCase?.event_date,
        event_location: thisCase?.event_location,
      },
      {
        onSuccess: () => {
          return updateCase(
            {
              applicant: {
                id: thisCase?.insured_id,
              },
              number: thisCase?.case_number,
              product_id: thisCase?.product_id,
              assistance_id: thisCase?.assistance_id,
              retail_id:
                contractor?.type === "C" ? thisCase?.contractor_id : null,
              customer_id:
                contractor?.type === "P" ? thisCase?.contractor_id : null,
              stage_id: stages?.find((s: any) => s?.name === "Seguimiento")?.id,
              user_id: user?.id,
              isactive: true,
              lead_id: thisCase?.lead_id,
              event_date: thisCase?.event_date,
              event_location: thisCase?.event_location,
            },
            {
              onSuccess: () => {
                router.push(`/case/${thisCase?.case_id}/seguimiento`);
                queryClient.invalidateQueries(["case", thisCase?.case_id]);
              },
            }
          );
        },
      }
    );
  };

  useEffect(() => {
    if (stages) {
      setThisStage(stages.find((s: any) => s.name.toLowerCase() === stage)?.id);
    }
  }, [stages, stage]);

  return (
    <>
      <ContentCell gap="20px">
        <CaseDescription thisCase={thisCase} />
        <ContentCell gap="5px">
          <CaseDocumentsTable
            thisCase={thisCase}
            thisStage={thisStage}
            handleSubmit={handleSubmit}
          />
        </ContentCell>
        <ContentRow gap="5px">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={thisCase?.is_active ? false : true}
            className="w-full"
          >
            Continuar
          </Button>
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
    </>
  );
};

export default CaseFormRecordReception;
