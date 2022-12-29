import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import useFamily from "../../../../hooks/useFamily";

const FamilyDetail = ({ saveFamily }: any) => {
  const { family, reset } = useFamily();

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const saveDataFamily = () => {
    saveFamily(id, name, false);
    reset();
  };

  useEffect(() => {
    setId(family.id);
    setName(family.name);
  }, [family]);

  return (
    <ContentCell align="center" gap="30px">
      <InputText
        id="txtFamilyName"
        label="Nombre"
        width="360px"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Button
        text={family.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDataFamily}
      />
    </ContentCell>
  );
};

export default FamilyDetail;
