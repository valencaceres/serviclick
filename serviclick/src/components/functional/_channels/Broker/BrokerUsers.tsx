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

import { useBroker } from "../../../../hooks";
import { useBroker as useBrokerQuery } from "~/hooks/query";
import { useRouter } from "next/router";

const BrokerUsers = ({ addNewUser, editUser, deleteUser }: any) => {
  const router = useRouter();

  const { broker } = useBroker();

  const { data } = useBrokerQuery().useGetBrokerAgents(router.query.id as string);

  return (
    <ContentCell gap="5px">
      <Table width="739px" height="226px">
        <TableHeader>
          <TableCell width="300px">Nombre</TableCell>
          <TableCell width="232px">E-mail</TableCell>
          <TableCell width="120px">Perfil</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {data?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="300px">
                {item.user.first_name} {item.user.last_name} 
              </TableCell>
              <TableCell width="232px">{item.user.email_addresses[0]?.email_address}</TableCell>
              <TableCell width="120px">{item.profilecode === "A" ? "Administrador" : "Vendedor"}</TableCell>
              <TableCell width="68px" align="center">
                <TableIcons>
                  <Icon iconName="edit" onClick={() => editUser(item.user)} />
                  <Icon iconName="delete" onClick={() => deleteUser(item.user)} />
                </TableIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={broker.users.length > 0 ? "blue" : "#959595"}>
          {broker.users.length === 0
            ? "Sin usuarios asociados"
            : broker.users.length === 1
            ? "1 usuario asociado"
            : `${broker.users.length} usuarios asociados`}
        </ContentCellSummary>
        <ButtonIcon iconName="add" color="gray" onClick={addNewUser} />
      </ContentRow>
    </ContentCell>
  );
};

export default BrokerUsers;
