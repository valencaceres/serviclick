import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import Button from "../../../ui/Button";

import { useFamily, useDocument } from "../../../../hooks";

const DocumentDetail = ({ saveDocument }: any) => {
  const { document, setDocument, resetDocument } = useDocument();
  const { list } = useFamily();

  const handleChangeFamily = (e: any) => {
    setDocument({ ...document, family_id: e.target.value });
  };

  const handleChangeName = (e: any) => {
    setDocument({ ...document, name: e.target.value });
  };

  return (
    <ContentCell align="center" gap="30px">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbFamily"
          label="Familia"
          width="290px"
          value={document.family_id}
          onChange={handleChangeFamily}
          placeHolder=":: Seleccione familia ::"
          data={list}
          dataValue="id"
          dataText="name"
        />
        <InputText
          id="txtDocumentName"
          label="Nombre"
          width="290px"
          value={document.name}
          onChange={handleChangeName}
        />
      </ContentCell>
      <Button
        text={document.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDocument}
      />
    </ContentCell>
  );
};

export default DocumentDetail;
