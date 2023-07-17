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

import { useContractor } from "~/hooks";

const FileFormatSubscriptions = ({ contractor }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getSubscriptionById, subscriptionItem } = useContractor();

  const handleSubscriptionClick = (item: any) => {
    getSubscriptionById(item.subscription_id);
  };

  useEffect(() => {
    if (contractor) {
      if (contractor?.subscriptions?.length > 0) {
        getSubscriptionById(contractor?.subscriptions[0]?.subscription_id);
      }
    }
  }, [contractor]);

  useEffect(() => {
    if (subscriptionItem) {
      console.log(subscriptionItem);
    }
  }, [subscriptionItem]);

  return (
    <ContentCell gap="5px">
      <Table width="373px" height="435px">
        <TableHeader>
          <TableCell width="360px">Producto</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {contractor?.subscriptions?.map((item: any, idx: number) => (
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
