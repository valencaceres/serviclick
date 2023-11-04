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
import Link from "next/link";

const CaseDocumentsTable = ({ caseValue, thisStage, handleSubmit }: any) => {
  const [assistance, setAssistance] = useState<any>(null);

  useEffect(() => {
    if (caseValue) {
      setAssistance(caseValue?.assistance?.id);
    }
  }, [caseValue?.assistance?.id, caseValue]);

  const { data: documents } =
    useQueryAssistances().useGetDocumentsById(assistance);

  const { data: attachments } = useQueryCase().useGetAttach(
    caseValue?.case_id as string,
    thisStage
  );

  const handleChangeInput = (e: any, item: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const documentId = item.id;
      handleSubmit(file, documentId);
    }
  };

  return (
    <Table height="287px">
      <TableHeader>
        <TableCell width="300px" align="center">
          Documento
        </TableCell>
        <TableCell width="100px">Subir</TableCell>
        <TableCell width="110px">Visualizar</TableCell>
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
                      onChange={(e) => handleChangeInput(e, item)}
                      className={"hidden"}
                      accept=".csv,.jpg,.png,.pdf,.jpeg"
                    />
                    {attachments?.find(
                      (a: any) => a.document_id === item.id
                    ) ? (
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
                    <Link
                      className="flex items-center"
                      href={attachments[idx].viewLink}
                      target="_blank"
                    >
                      <Icon iconName="open_in_new" button={true} />
                    </Link>
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
//
export default CaseDocumentsTable;
