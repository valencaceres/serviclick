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

const CaseServiceTable = ({ assistance }: any) => {
  const { data } = useQueryAssistances().useGetValues(assistance);

  console.log(data);
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
        {data?.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell width="250px" align="center">
              {item.name}
            </TableCell>
            <TableCell width="260px">Valor dinámico</TableCell>
          </TableRow>
        ))}
      </TableDetail>
    </Table>
  );
};

export default CaseServiceTable;
