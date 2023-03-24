import { useEffect, useState } from "react";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import ComboBox from "../../ui/ComboBox";

import { useRouter } from "next/router";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import CaseDocumentsTable from "./CaseDocumentsTable";
import { useQueryCase, useQueryStage } from "../../../hooks/query";

const CaseFormRecordReception = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;

  const [files, setFiles] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);
  const [thisStage, setThisStage] = useState<string>("");

  const { data: stages } = useQueryStage().useGetAll();
  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("case_id", thisCase?.case_id);
    formData.append("casestage_id", thisStage);
    documents.forEach((d: any, idx: number) => {
      formData.append(`document_id[${idx}]`, d);
    });
    files.forEach((item: any, idx: number) => {
      formData.append("files", item);
    });
    uploadDocuments(formData);
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
        <ContentCell gap="5px">
          <InputText
            label="Cliente"
            value={"Embotelladora Andina S.A."}
            type="text"
            disabled={true}
            width="525px"
          />
          <InputText
            label="Asegurado"
            value={
              thisCase?.applicant_name + " " + thisCase?.applicant_lastname
            }
            type="text"
            disabled={true}
            width="525px"
          />
          <InputText
            label="Servicio"
            value={thisCase?.assistance}
            type="text"
            disabled={true}
            width="525px"
          />
        </ContentCell>
        <ContentCell gap="5px">
          <CaseDocumentsTable
            thisCase={thisCase}
            thisStage={thisStage}
            uploadData={files}
            setData={setFiles}
            documentData={documents}
            setDocumentData={setDocuments}
          />
        </ContentCell>
        <Button text="Continuar" type="submit" />
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
    </form>
  );
};

export default CaseFormRecordReception;
