import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import CaseDocumentsTable from "./CaseDocumentsTable";

import { useQueryCase, useQueryContractor, useQueryStage } from "../../../hooks/query";
import { useUser } from "@clerk/nextjs";
import { CaseDescription } from "./CaseDescription";

const CaseFormRecordReception = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
  const queryClient = useQueryClient();

  const [uploadedFiles, setUploadedFiles] = useState<
    { file: any; documentId: any }[]
  >([]);
  const [thisStage, setThisStage] = useState<string>("");

  const { user } = useUser();
  const { data: stages } = useQueryStage().useGetAll();

  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();
  const { mutate: updateCase } = useQueryCase().useCreate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("case_id", thisCase?.case_id);
    const documentIds = uploadedFiles.map(({ documentId }) =>
      documentId.toString()
    );
    formData.append("document_id", JSON.stringify(documentIds));
    uploadedFiles.forEach(({ file }) => {
      formData.append("files", file);
    });

    uploadDocuments(formData, {
      onSuccess: () => {
        updateCase(
          {
            applicant: {
              id: thisCase?.insured_id,
            },
            number: thisCase?.case_number,
            product_id: thisCase?.product_id,
            assistance_id: thisCase?.assistance_id,
            stage_id:
              stages?.find((s: any) => s.name === "Recepción de antecedentes")
                ?.id || "",
            user_id: user?.id,
            isactive: true,
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
                  stage_id: stages?.find((s: any) => s?.name === "Seguimiento")
                    ?.id,
                  user_id: user?.id,
                  isactive: true,
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
      },
    });
  };

  const handleSkip = (e: any) => {
    e.preventDefault();
    updateCase(
      {
        applicant: {
          id: thisCase?.insured_id,
        },
        number: thisCase?.case_number,
        product_id: thisCase?.product_id,
        assistance_id: thisCase?.assistance_id,
        stage_id:
          stages?.find((s: any) => s.name === "Recepción de antecedentes")
            ?.id || "",
        user_id: user?.id,
        isactive: true,
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
              company_id: thisCase?.contractor_id,
              stage_id: stages?.find((s: any) => s?.name === "Seguimiento")?.id,
              user_id: user?.id,
              isactive: true,
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
    <form
      action=""
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit}
    >
      <ContentCell gap="20px">
      <CaseDescription thisCase={thisCase} />
        <ContentCell gap="5px">
          <CaseDocumentsTable
            thisCase={thisCase}
            thisStage={thisStage}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </ContentCell>
        <ContentRow gap="5px">
          <Button
            enabled={thisCase?.is_active ? true : false}
            text="Subir archivos"
            width="50%"
            type="submit"
          />
          <Button
            enabled={thisCase?.is_active ? true : false}
            text="Omitir"
            type="button"
            width="50%"
            onClick={(e: any) => handleSkip(e)}
          />
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
    </form>
  );
};

export default CaseFormRecordReception;
