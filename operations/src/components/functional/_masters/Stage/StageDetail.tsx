import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import useStage from "../../../../hooks/useStage";

const StageDetail = ({ saveStage }: any) => {
  const { stage, resetStage } = useStage();

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const saveDataStage = () => {
    saveStage(id, name, false);
    resetStage();
  };

  useEffect(() => {
    setId(stage.id);
    setName(stage.name);
  }, [stage]);

  return (
    <ContentCell align="center" gap="30px">
      <InputText
        id="txtStageName"
        label="Nombre"
        width="360px"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Button
        text={stage.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDataStage}
      />
    </ContentCell>
  );
};

export default StageDetail;
