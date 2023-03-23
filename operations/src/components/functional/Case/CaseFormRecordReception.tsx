import { useState } from "react";

import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../../ui/Button";
import ComboBox from "../../ui/ComboBox";

import { useRouter } from "next/router";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import CaseDocumentsTable from "./CaseDocumentsTable";

const CaseFormRecordReception = ({ thisCase }: any) => {
  const router = useRouter();
  const initialImportData = {
    company_id: "",
    year: "",
    month: "",
    file: "",
  };
  const [importData, setImportData] = useState(initialImportData);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", importData.file);
    formData.append("company_id", importData.company_id);
    formData.append("year", importData.year);
    formData.append("month", importData.month);
  };

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
            onChange={(e: any) =>
              setImportData({ ...importData, company_id: e.target.value })
            }
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
          <CaseDocumentsTable thisCase={thisCase} />
        </ContentCell>
        <Button text="Continuar" type="submit" />
      </ContentCell>
      <LoadingMessage />
    </form>
  );
};

export default CaseFormRecordReception;
