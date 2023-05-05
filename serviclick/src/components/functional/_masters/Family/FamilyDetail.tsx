import { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";
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

import useFamily from "../../../../hooks/useFamily";

const FamilyDetail = ({ saveFamily }: any) => {
  const { family, set, reset } = useFamily();

  const [buttonRegisterEnabled, setButtonRegisterEnabled] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState<any[]>([]);
  const [newValue, setNewValue] = useState("");

  const saveDataFamily = () => {
    saveFamily(id, name, values);
    reset();
  };

  const handleAddValue = () => {
    set({
      id,
      name,
      values: [...values, { id: "", name: newValue }],
      isActive: true,
    });
    setNewValue("");
  };

  const handleRemoveValue = (removedValue: string) => {
    set({
      id,
      name,
      values: values.filter((value: any) => value.name !== removedValue),
      isActive: true,
    });
    setNewValue("");
  };

  useEffect(() => {
    if (family) {
      setId(family.id);
      setName(family.name);
      setValues(family.values);
    }
  }, [family]);

  useEffect(() => {
    setButtonRegisterEnabled(name !== "");
  }, [name]);

  return (
    <ContentCell gap="30px" align="center">
      <ContentCell gap="10px">
        <InputText
          id="txtFamilyName"
          label="Nombre"
          width="360px"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Table height="215px" width="360px">
          <TableHeader>
            <TableCell width="available">Campos</TableCell>
          </TableHeader>
          <TableDetail>
            {values?.map((value: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="available">
                  {value.name}
                  <TableIcons>
                    <Icon
                      iconName="delete"
                      onClick={() => {
                        handleRemoveValue(value.name);
                      }}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="center">
          <InputText
            id="txtFamilyName"
            label="Nuevo valor"
            width="310px"
            value={newValue}
            onChange={(e: any) => setNewValue(e.target.value)}
          />
          <ButtonIcon iconName="add" color="gray" onClick={handleAddValue} />
        </ContentRow>
      </ContentCell>
      <Button
        text={family.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDataFamily}
        enabled={buttonRegisterEnabled}
      />
    </ContentCell>
  );
};

export default FamilyDetail;
