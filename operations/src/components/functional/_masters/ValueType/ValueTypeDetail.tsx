import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import { useValueType } from "../../../../hooks";

const ValueTypeDetail = ({ saveValueType }: any) => {
  const { valueType, resetValueTypeAll } = useValueType();

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const saveDataValueType = () => {
    saveValueType(id, name, false);
    resetValueTypeAll();
  };

  useEffect(() => {
    setId(valueType.id);
    setName(valueType.name);
  }, [valueType]);

  return (
    <ContentCell align="center" gap="30px">
      <InputText
        id="txtValueTypeName"
        label="Nombre"
        width="360px"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Button
        text={valueType.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDataValueType}
      />
    </ContentCell>
  );
};

export default ValueTypeDetail;
