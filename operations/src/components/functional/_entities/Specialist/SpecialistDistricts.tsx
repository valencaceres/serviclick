import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon/Icon";
import ButtonIcon from "../../../ui/ButtonIcon";

import { useDistrict } from "../../../../hooks";
import { useSpecialist } from "../../../../store/hooks";

const SpecialistDistricts = () => {
  const { list: districtList } = useDistrict();
  const { specialist } = useSpecialist();

  return (
    <ContentCell gap="5px">
      <Table height="390px">
        <TableHeader>
          <TableCell width="200px">Comuna</TableCell>
          <TableCell width="40px">&nbsp;</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {specialist.districts.map((item, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="200px">{item.district_name}</TableCell>
              <TableCell width="40px" align="center">
                <Icon iconName="delete" />
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary color="#959595">{`Sin comunas`}</ContentCellSummary>
        <ButtonIcon iconName="add" color="gray" />
      </ContentRow>
    </ContentCell>
  );
};

export default SpecialistDistricts;
