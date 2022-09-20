import { useState } from "react";

import { useAppSelector } from "../../../../redux/hooks";

import {
  MasterList,
  Title,
  Search,
  List,
  Buttons,
  Summary,
  Pages,
  Actions,
} from "../../../layout/MasterList";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import Icon, { icons } from "../../../ui/Icon";

const ChannelList = ({ addChannel, editChannel, deleteChannel }: any) => {
  const { list } = useAppSelector((state) => state.channelSlice);

  const [search, setSearch] = useState("");

  return (
    <MasterList>
      <Title>Canales</Title>
      <Search>
        <InputText
          label="Texto a buscar"
          icon="search"
          width="700px"
          value={search}
          onChange={setSearch}
        />
      </Search>
      <List>
        <Table width="700px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="available">Nombre</TableCell>
          </TableHeader>
          <TableDetail>
            {list.map((channel: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="available">
                  {channel.name}
                  <TableIcons>
                    <Icon
                      iconName={icons.faPen}
                      onClick={() => editChannel(channel)}
                    />
                    <Icon
                      iconName={icons.faTrashAlt}
                      onClick={() => deleteChannel(channel.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
      </List>
      <Buttons>
        <Summary>{`${list.length} registros`}</Summary>
        <Pages></Pages>
        <Actions>
          <Button text="" icon="plus" onClick={addChannel} />
        </Actions>
      </Buttons>
    </MasterList>
  );
};

export default ChannelList;
