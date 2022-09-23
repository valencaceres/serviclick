import { useState } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ButtonIcon from "../../../ui/ButtonIcon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";

import useChannel from "../../../../hooks/useChannel";

const ChannelList = ({ addChannel, editChannel, deleteChannel }: any) => {
  const { list } = useChannel();

  const [search, setSearch] = useState("");

  return (
    <ContentCell gap="10px">
      <ContentRow gap="10px" align="center">
        <InputText
          label="Texto a buscar"
          width="375px"
          value={search}
          onChange={setSearch}
        />
        <ButtonIcon iconName="search" />
      </ContentRow>
      <Table width="428px">
        <TableHeader>
          <TableCell width="70px" align="center">
            #
          </TableCell>
          <TableCell width="350px">Nombre</TableCell>
        </TableHeader>
        <TableDetail>
          {list.map((channel: any, idx: number) => (
            <TableRow key={idx} className={"deleted"}>
              <TableCell width="70px" align="center">
                {idx + 1}
              </TableCell>
              <TableCell width="350px">
                {channel.name}
                <TableIcons>
                  <Icon
                    iconName="edit"
                    onClick={() => editChannel(channel.id)}
                  />
                  <Icon
                    iconName="delete"
                    onClick={() => deleteChannel(channel.id)}
                  />
                </TableIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <div>{`${list.length} registros`}</div>
      <ButtonIcon iconName="add" onClick={addChannel} />
    </ContentCell>
  );
};

export default ChannelList;
