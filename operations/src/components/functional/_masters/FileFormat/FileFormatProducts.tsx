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

const FileFormatProducts = ({ products, setProduct }: any) => {
  const { getFieldByProductPlanId } = useField();
  const { setFileFormat, fileFormat, getFileFormatByProductPlanId } =
    useFileFormat();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubscriptionClick = (item: any) => {
    getFileFormatByProductPlanId(item.productplan_id);
    setFileFormat({ ...fileFormat, productPlan_id: item.productplan_id });
    getFieldByProductPlanId(item.productplan_id);
    setProduct(item);
  };

  return (
    <ContentCell gap="5px">
      <Table width="373px" height="435px">
        <TableHeader>
          <TableCell width="360px">Producto</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {products?.map((item: any, idx: number) => (
            <TableRow
              key={idx}
              link={true}
              onClick={() => handleSubscriptionClick(item)}
            >
              <TableCell width="360px">{item.name}</TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
    </ContentCell>
  );
};

export default FileFormatProducts;
