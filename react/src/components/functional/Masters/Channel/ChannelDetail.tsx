import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Component, Row, Cell, CellSeparator } from "../../../layout/Generic";
import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { resetChannel } from "../../../../redux/slices/channelSlice";

const ChannelDetail = ({ saveChannel }: any) => {
  const dispatch = useAppDispatch();

  const { channel } = useAppSelector((state) => state.channelSlice);

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const saveDataChannel = () => {
    saveChannel(id, name, false);
    dispatch(resetChannel());
  };

  useEffect(() => {
    setId(channel.id);
    setName(channel.name);
  }, [channel]);

  return (
    <Component>
      <Row>
        <Cell>
          <InputText
            id="txtChannelName"
            label="Nombre"
            width="360px"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </Cell>
      </Row>
      <Row>
        <CellSeparator />
      </Row>
      <Row>
        <Cell>
          <Button
            text={channel.id ? "Modificar" : "Agregar"}
            width="200px"
            onClick={saveDataChannel}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default ChannelDetail;
