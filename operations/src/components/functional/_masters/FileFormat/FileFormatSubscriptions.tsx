import { useEffect, useState } from "react";

import { ContentCell } from "../../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";

import { useField, useFileFormat } from "~/hooks";

const FileFormatSubscriptions = ({ leads, setLead }: any) => {
  const { getFieldByLeadId } = useField();
  const { setFileFormat, fileFormat, getFileFormatByLeadId } = useFileFormat();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubscriptionClick = (item: any) => {
    getFileFormatByLeadId(item.lead_id);
    setFileFormat({ ...fileFormat, lead_id: item.lead_id });
    getFieldByLeadId(item.lead_id);
    setLead(item);
  };

  return (
    <ContentCell gap="5px">
      <Table width="373px" height="435px">
        <TableHeader>
          <TableCell width="360px">Producto</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {leads.map((item: any, idx: number) => (
            <TableRow
              key={idx}
              link={true}
              onClick={() => handleSubscriptionClick(item)}
            >
              <TableCell width="360px">{item.product_name}</TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
    </ContentCell>
  );
};

export default FileFormatSubscriptions;
