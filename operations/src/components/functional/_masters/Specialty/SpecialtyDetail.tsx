import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import Button from "../../../ui/Button";

import { useFamily, useSpecialty } from "../../../../hooks";

const SpecialtyDetail = ({ saveSpecialty }: any) => {
  const { specialty, setSpecialty, resetSpecialty } = useSpecialty();
  const { list } = useFamily();

  const handleChangeFamily = (e: any) => {
    setSpecialty({ ...specialty, family_id: e.target.value });
  };

  const handleChangeName = (e: any) => {
    setSpecialty({ ...specialty, name: e.target.value });
  };

  return (
    <ContentCell align="center" gap="30px">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbFamily"
          label="Familia"
          width="290px"
          value={specialty.family_id}
          onChange={handleChangeFamily}
          placeHolder=":: Seleccione familia ::"
          data={list}
          dataValue="id"
          dataText="name"
        />
        <InputText
          id="txtSpecialtyName"
          label="Nombre"
          width="290px"
          value={specialty.name}
          onChange={handleChangeName}
        />
      </ContentCell>
      <Button
        text={specialty.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveSpecialty}
      />
    </ContentCell>
  );
};

export default SpecialtyDetail;
