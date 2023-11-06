import React from "react";

import { ContentCell } from "../../../layout/Content";
import Icon from "../../../ui/Icon";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableIcons,
  TableRow,
} from "../../../ui/Table";

import { useField, useFileFormat } from "../../../../hooks";

const FileFormatFieldsList = ({ setShowModal }: any) => {
  const { fieldList } = useField();
  const { setFileFormat, fileFormat } = useFileFormat();

  const handleClickAddDocument = (field: any) => {
    setFileFormat({
      ...fileFormat,
      fields: [
        ...fileFormat.fields,
        {
          id: "",
          field_id: field?.id,
          field_name: field?.name,
          field_format: field?.format,
        },
      ],
    });
  };

  return (
    <ContentCell>
      <Table width="720px" height="485px">
        <TableHeader>
          <TableCell width="403px">Nombre</TableCell>
          <TableCell width="250px">Formato</TableCell>
          <TableCell width="50px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {fieldList
            .filter(
              (field) =>
                !fileFormat.fields.find(
                  (fileFormatField) => fileFormatField.field_id === field.id
                )
            )
            .map((field, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="403px">{field.name}</TableCell>
                <TableCell width="250px">{field.format}</TableCell>
                <TableCell width="50px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="add_circle"
                      onClick={() => handleClickAddDocument(field)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
        </TableDetail>
      </Table>
    </ContentCell>
  );
};

export default FileFormatFieldsList;
