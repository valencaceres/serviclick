import { Fragment, useEffect, useState } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";
import Icon from "../../../ui/Icon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";

import FileFormatFieldsList from "./FileFormatFieldsList";

import { useFileFormat, useField, useRetail } from "~/hooks";
import ButtonIcon from "~/components/ui/ButtonIcon";
import ModalWindow from "~/components/ui/ModalWindow";

const FileFormatFields = () => {
  const { fieldList } = useField();
  const { setFileFormat, fileFormat } = useFileFormat();
  const { retail } = useRetail();

  const [showModalFields, setShowModalFields] = useState(false);

  const handleClickAddField = () => {
    setShowModalFields(true);
  };

  const handleDeleteField = (id: string) => {
    setFileFormat({
      ...fileFormat,
      fields: fileFormat.fields.filter((field) => field.field_id !== id),
    });
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table width="720px" height="374px">
          <TableHeader>
            <TableCell width="403px">Nombre</TableCell>
            <TableCell width="250px">Formato</TableCell>
            <TableCell width="50px"></TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {fileFormat.fields.map((field, idx: number) => (
              <TableRow key={idx} link={true}>
                <TableCell width="403px">{field.field_name}</TableCell>
                <TableCell width="250px">{field.field_format}</TableCell>
                <TableCell width="50px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="delete"
                      onClick={() => handleDeleteField(field.field_id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="space-between">
          <ContentCellSummary
            color={fileFormat.fields.length > 0 ? "blue" : "gray"}
          >
            {fileFormat.fields.length > 0
              ? `${fileFormat.fields.length} campos`
              : "No hay campos"}
          </ContentCellSummary>
          {fieldList.length > 0 && retail.rut !== "" && (
            <ButtonIcon
              iconName="add"
              color="gray"
              onClick={handleClickAddField}
            />
          )}
        </ContentRow>
      </ContentCell>
      <ModalWindow
        showModal={showModalFields}
        setClosed={() => setShowModalFields(false)}
        title="Seleccione campos"
      >
        <FileFormatFieldsList setShowModal={setShowModalFields} />
      </ModalWindow>
    </Fragment>
  );
};

export default FileFormatFields;
