import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../ui/Table";
import Icon from "../../ui/Icon";

import { useQueryAssistances, useQueryDocument } from "../../../hooks/query";
import { useCase } from "../../../store/hooks/useCase";
import InputFile from "../../ui/InputFile";
import InputText from "../../ui/InputText";

const CaseDocumentsTable = ({
  thisCase,
  uploadData,
  setData,
  documentData,
  setDocumentData,
}: any) => {
  const { data } = useCase();
  const [assistance, setAssistance] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setAssistance(thisCase?.assistance_id);
    }
  }, [data]);

  const { data: documents } =
    useQueryAssistances().useGetDocumentsById(assistance);

  return (
    <Table height="287px">
      <TableHeader>
        <TableCell width="390px" align="center">
          Documento
        </TableCell>
        <TableCell width="120px">Subir</TableCell>
        <TableCellEnd />
      </TableHeader>
      <TableDetail>
        {documents?.length > 0 ? (
          documents?.map((item: any, idx: number) => (
            <TableRow key={item.id}>
              <TableCell width="390px" align="center">
                {item.name}
                <InputText
                  label="Documento"
                  value={item.id}
                  type="text"
                  disabled={true}
                  width="525px"
                  id={`document_id_${idx}`}
                  className={"hidden"}
                />
              </TableCell>

              <TableCell width="120px" align="center">
                <TableIcons>
                  <label htmlFor={`file-[${idx}]`}>
                    <input
                      type={"file"}
                      id={`file-[${idx}]`}
                      onChange={(e) => {
                        setData([...uploadData, e.target.files[0]]);
                        setDocumentData([...documentData, item.id]);
                      }}
                      className={"hidden"}
                      accept=".csv .jpg .png .pdf .jpeg"
                    />
                    {uploadData[idx] ? (
                      <Icon iconName="check" />
                    ) : (
                      <Icon iconName="upload" button={true} />
                    )}
                  </label>
                </TableIcons>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell width="510px" align="center">
              No hay documentos asignados para este servicio
            </TableCell>
          </TableRow>
        )}
      </TableDetail>
    </Table>
  );
};

export default CaseDocumentsTable;
