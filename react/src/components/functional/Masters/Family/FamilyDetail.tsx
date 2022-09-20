import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Component, Row, Cell, CellSeparator } from "../../../layout/Generic";
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

import { resetFamily, setFamily } from "../../../../redux/slices/familySlice";

const FamilyDetail = ({ saveFamily }: any) => {
  const dispatch = useAppDispatch();

  const { family } = useAppSelector((state) => state.familySlice);

  const [buttonRegisterEnabled, setButtonRegisterEnabled] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState("");

  const saveDataFamily = () => {
    saveFamily(id, name, values);
    dispatch(resetFamily());
  };

  const handleAddValue = () => {
    dispatch(
      setFamily({
        id,
        name,
        values: [...values, { id: "", name: newValue }],
        isActive: true,
      })
    );
    setNewValue("");
  };

  const handleRemoveValue = (removedValue: string) => {
    dispatch(
      setFamily({
        id,
        name,
        values: values.filter((value: any) => value.name !== removedValue),
        isActive: true,
      })
    );
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
    <Component>
      <Row>
        <Cell>
          <InputText
            id="txtFamilyId"
            label="id"
            width="360px"
            value={id}
            onChange={(e: any) => setId(e.target.value)}
            display={false}
          />
          <InputText
            id="txtFamilyName"
            label="Nombre"
            width="360px"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Table height="316px" width="360px">
            <TableHeader>
              <TableCell width="available">Campos</TableCell>
            </TableHeader>
            <TableDetail>
              {values.map((value: any, idx: number) => (
                <TableRow key={idx} className={"deleted"}>
                  <TableCell width="available">
                    {value.name}
                    <TableIcons>
                      <Icon
                        iconName={icons.faTrashAlt}
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
          <InputText
            id="txtFamilyName"
            label="Nuevo valor"
            width="360px"
            value={newValue}
            onChange={(e: any) => setNewValue(e.target.value)}
            icon="upload"
            onClick={handleAddValue}
          />
        </Cell>
      </Row>
      <Row>
        <CellSeparator />
      </Row>
      <Row>
        <Cell>
          <Button
            text={family.id ? "Modificar" : "Agregar"}
            width="200px"
            onClick={saveDataFamily}
            enabled={buttonRegisterEnabled}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default FamilyDetail;
