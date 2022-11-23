import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";

import { useValueType, useFamily, useValue } from "../../../../hooks";

const ValueDetail = ({ saveValue }: any) => {
  const { valueTypeList } = useValueType();
  const { list: familyList } = useFamily();
  const { setValue, value } = useValue();

  const [enableSave, setEnableSave] = useState(false);

  const handleChangeFamily = (e: any) => {
    setValue({
      ...value,
      family: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  };

  const handleChangeValueType = (e: any) => {
    setValue({
      ...value,
      valuetype_code: e.target.value,
    });
  };

  const handleChangeName = (e: any) => {
    setValue({
      ...value,
      name: e.target.value,
    });
  };

  useEffect(() => {
    setEnableSave(false);
    if (value.family) {
      if (
        value.family.id !== "" &&
        value.name !== "" &&
        value.valuetype_code !== ""
      ) {
        setEnableSave(true);
      }
    }
  }, [value]);

  return (
    <ContentCell align="center" gap="30px">
      <ContentCell align="center" gap="5px">
        <ComboBox
          label="Familia"
          width="360px"
          value={value.family?.id}
          onChange={handleChangeFamily}
          placeHolder=":: Seleccione familia ::"
          data={familyList}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          label="Tipo de valor"
          width="360px"
          value={value.valuetype_code}
          onChange={handleChangeValueType}
          placeHolder=":: Seleccione tipo de valor ::"
          data={valueTypeList}
          dataValue="code"
          dataText="description"
        />
        <InputText
          id="txtValueName"
          label="Nombre"
          width="360px"
          value={value.name}
          onChange={handleChangeName}
        />
      </ContentCell>
      <Button
        text={value.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveValue}
        enabled={enableSave}
      />
    </ContentCell>
  );
};

export default ValueDetail;
