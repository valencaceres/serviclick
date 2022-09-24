import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import useChannel from "../../../../hooks/useChannel";

const ChannelDetail = ({ saveChannel }: any) => {
  const { channel, reset } = useChannel();

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const saveDataChannel = () => {
    saveChannel(id, name, false);
    reset();
  };

  useEffect(() => {
    setId(channel.id);
    setName(channel.name);
  }, [channel]);

  return (
    <ContentCell align="center" gap="30px">
      <InputText
        id="txtChannelName"
        label="Nombre"
        width="360px"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Button
        text={channel.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDataChannel}
      />
    </ContentCell>
  );
};

export default ChannelDetail;
