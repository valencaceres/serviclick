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
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";
import ButtonIcon from "../../../ui/ButtonIcon";
import Icon from "../../../ui/Icon";

import { useRetail } from "../../../../hooks";

const RetailUsers = ({ addNewUser, editUser, deleteUser }: any) => {
  const { retail } = useRetail();

  return (
    <ContentCell gap="5px">
      <Table width="739px" height="200px">
        <TableHeader>
          <TableCell width="300px">Nombre</TableCell>
          <TableCell width="232px">e-mail</TableCell>
          <TableCell width="120px">Perfil</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {retail.users.map((user: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="300px">
                {user.name} {user.paternalLastName} {user.maternalLastName}
              </TableCell>
              <TableCell width="232px">{user.email}</TableCell>
              <TableCell width="120px">{user.profileName}</TableCell>
              <TableCell width="68px" align="center">
                <TableIcons>
                  <Icon iconName="edit" onClick={() => editUser(user)} />
                  <Icon iconName="delete" onClick={() => deleteUser(user)} />
                </TableIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary>
          {retail.users.length === 0
            ? "Sin usuarios asociados"
            : retail.users.length === 1
            ? "1 usuario asociado"
            : `${retail.users.length} usuarios asociados`}
        </ContentCellSummary>
        <ButtonIcon iconName="add" color="gray" onClick={addNewUser} />
      </ContentRow>
    </ContentCell>
  );
};

export default RetailUsers;
