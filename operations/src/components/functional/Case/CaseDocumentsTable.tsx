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

import { useQueryAssistances, useQueryCase } from "../../../hooks/query";
import { useCase } from "../../../store/hooks/useCase";
import Link from "next/link";

const CaseDocumentsTable = ({
  thisCase,
  thisStage,
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

  const { data: attachments } = useQueryCase().useGetAttach(
    thisCase?.case_id,
    thisStage
  );

  const handleDownload = (fileData: string, fileName: string) => {
    const blob = new Blob([fileData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <Table height="287px">
      <TableHeader>
        <TableCell width="300px" align="center">
          Documento
        </TableCell>
        <TableCell width="100px">Subir</TableCell>
        <TableCell width="110px">Descargar</TableCell>
        <TableCellEnd />
      </TableHeader>
      <TableDetail>
        {documents?.length > 0 ? (
          documents?.map((item: any, idx: number) => (
            <TableRow key={item.id}>
              <TableCell width="300px" align="center">
                {item.name}
              </TableCell>

              <TableCell width="100px" align="center">
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
              <TableCell width="110px" align="center">
                <TableIcons>
                  {attachments?.find((a: any) => a.document_id === item.id) ? (
                    <Icon
                      iconName="download"
                      button={true}
                      onClick={() =>
                        handleDownload(
                          attachments[idx].file.base64,
                          attachments[idx].file.originalname
                        )
                      }
                    />
                  ) : null}
                </TableIcons>
              </TableCell>
              <TableCellEnd />
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
