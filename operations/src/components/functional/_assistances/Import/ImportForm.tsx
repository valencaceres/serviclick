import { useState } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";
import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";
import InputFile from "../../../ui/InputFile";

import { useQueryCompany, useQueryImport } from "../../../../hooks/query";
import { months, years } from "../../../../data/masters";

const ImportForm = () => {
  const initialImportData = {
    company_id: "",
    year: "",
    month: "",
    file: "",
  };
  const [importData, setImportData] = useState(initialImportData);

  const { data: companies } = useQueryCompany().useGetAll();
  const uploadFile = useQueryImport().useUploadFile();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", importData.file);
    formData.append("company_id", importData.company_id);
    formData.append("year", importData.year);
    formData.append("month", importData.month);
    uploadFile.mutate(formData);
  };

  return (
    <form
      action=""
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit}
    >
      <ContentCell gap="5px" align="center">
        <ComboBox
          label="Cliente"
          width="355px"
          value={importData.company_id}
          onChange={(e: any) =>
            setImportData({ ...importData, company_id: e.target.value })
          }
          placeHolder=":: Seleccione cliente ::"
          data={companies}
          dataValue="id"
          dataText="companyName"
        />
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Año"
            width="150px"
            value={importData.year}
            onChange={(e: any) =>
              setImportData({ ...importData, year: e.target.value })
            }
            placeHolder=":: Año ::"
            data={years}
            dataValue="id"
            dataText="name"
          />
          <ComboBox
            label="Mes"
            width="200px"
            value={importData.month}
            onChange={(e: any) =>
              setImportData({ ...importData, month: e.target.value })
            }
            placeHolder=":: Mes ::"
            data={months}
            dataValue="id"
            dataText="name"
          />
        </ContentRow>
        <InputFile
          label="Archivo"
          width="w-[355px]"
          id="file"
          value={importData.file}
          onChange={(e: any) => {
            const file = e.target.files[0];
            setImportData({ ...importData, file: file });
          }}
        />
        <ContentRow align="center">
          <Button width="200px" text="Procesar" className={"mt-5"} />
        </ContentRow>
      </ContentCell>
    </form>
  );
};

export default ImportForm;
