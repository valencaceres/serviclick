import { Fragment, useState } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";
import { Label } from "~/components/ui";
import CheckBox from "~/components/ui/CheckBox";
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

import { useFamily } from "../../../../hooks";
import { useSpecialist } from "../../../../store/hooks";

const SpecialistSpecialties = ({ setShowSpecialitiesModal }: any) => {
  const { specialist, setSpecialist } = useSpecialist();
  const { listAll } = useFamily();
  const [isRemote, setIsRemote] = useState(false);
  const handleClickAddSpeciality = () => {
    listAll();
    setShowSpecialitiesModal(true);
  };

  const handleClickDelete = (id: string) => {
    setSpecialist({
      ...specialist,
      specialties: [...specialist.specialties.filter((item) => item.id !== id)],
    });
  };

  const handleChangeRemote = (e: any) => {
    const value = e.target.checked;
    const id = e.target.id;
    setSpecialist({
      ...specialist,
      [id]: value,
    });
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table height="390px">
          <TableHeader>
            <TableCell width="150px">Familia</TableCell>
            <TableCell width="200px">Especialidad</TableCell>
            <TableCell width="40px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {specialist.specialties.map((item, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="150px">{item.family_name}</TableCell>
                <TableCell width="200px">{item.name}</TableCell>
                <TableCell width="40px" align="center">
                  <Icon
                    iconName="delete"
                    button={true}
                    onClick={() => handleClickDelete(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="space-between">
          <ContentCellSummary
            color={specialist.specialties.length > 0 ? "blue" : "#959595"}
          >
            {specialist.specialties.length > 0
              ? `${specialist.specialties.length} ${
                  specialist.specialties.length === 1
                    ? "especialidad"
                    : "especialidades"
                }`
              : `Sin especialidades`}
          </ContentCellSummary>
          <CheckBox
            label="Remoto"
            value={specialist.isRemote ?? false}
            id="isRemote"
            onChange={handleChangeRemote}
            width="100"
          />

          <ButtonIcon
            iconName="add"
            color="gray"
            onClick={handleClickAddSpeciality}
          />
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default SpecialistSpecialties;
