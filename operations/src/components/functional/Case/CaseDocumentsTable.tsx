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

const CaseDocumentsTable = ({ thisCase }: any) => {
  const { data } = useCase();
  const [assistance, setAssistance] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setAssistance(thisCase?.assistance_id);
    }
  }, [data]);

  const { data: documents } =
    useQueryAssistances().useGetDocumentsById(assistance);

  console.log(documents);
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
              </TableCell>

              <TableCell width="120px" align="center">
                <TableIcons>
                  <Icon iconName="upload" button={true} onClick={() => {}} />
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
