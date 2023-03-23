import { useQueryAssistances } from "../../../hooks/query";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../ui/Table";

import { useCase } from "../../../store/hooks/useCase";

const CaseServiceTable = ({ product }: any) => {
  const { data } = useCase();
  const { data: assistanceValues } = useQueryAssistances().useGetValues(
    product?.assistance.id
  );

  const { data: insuredValues } = useQueryAssistances().useGetValuesById(
    data?.beneficiary.id,
    product?.assistance.id,
    product?.id
  );

  return (
    <Table height="287px">
      <TableHeader>
        <TableCell width="250px" align="center">
          Dato
        </TableCell>
        <TableCell width="260px">Valor</TableCell>
        <TableCellEnd />
      </TableHeader>
      <TableDetail>
        {assistanceValues?.length > 0 ? (
          assistanceValues?.map((item: any, idx: number) => (
            <TableRow key={item.id}>
              <TableCell width="250px" align="center">
                {item.name}
              </TableCell>

              <TableCell width="260px" align="center">
                {insuredValues &&
                  insuredValues.length > idx &&
                  insuredValues[idx].value}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell width="510px" align="center">
              No hay datos disponibles en este momento
            </TableCell>
          </TableRow>
        )}
      </TableDetail>
    </Table>
  );
};

export default CaseServiceTable;
