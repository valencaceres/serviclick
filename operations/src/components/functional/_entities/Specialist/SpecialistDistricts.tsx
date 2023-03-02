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

const SpecialistDistricts = ({ setShowDistrictsModal }: any) => {
  const { listAllDistrict } = useDistrict();
  const { specialist } = useSpecialist();

  const handleClickAddDistrict = () => {
    listAllDistrict();
    setShowDistrictsModal(true);
  };

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
        <ContentCellSummary
          color={specialist.districts.length > 0 ? "blue" : "#959595"}>
          {specialist.districts.length > 0
            ? `${specialist.districts.length} ${
                specialist.districts.length === 1 ? "comuna" : "comunas"
              }`
            : `Sin comunas`}
        </ContentCellSummary>
        <ButtonIcon
          iconName="add"
          color="gray"
          onClick={handleClickAddDistrict}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default SpecialistDistricts;
