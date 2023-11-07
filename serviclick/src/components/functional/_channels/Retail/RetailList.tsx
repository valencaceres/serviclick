import { useState, useEffect, Fragment } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
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
import ModalWarning from "../../../ui/ModalWarning";

import { useRetail } from "../../../../hooks";

const RetailList = ({ editRetail, deleteRetail }: any) => {
  const { retail, setRetail, retailList, getAllRetails } = useRetail();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (retailItem: any) => {
    setRetail(retailItem);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (id: string) => {
    deleteRetail(retail.id);
    setShowWarningDelete(false);
  };

  useEffect(() => {
    getAllRetails();
  }, []);

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <InputText
            label="Texto a buscar"
            width="530px"
            value={search}
            onChange={setSearch}
          />
          <ButtonIcon iconName="search" color="gray" />
        </ContentRow>
        <Table width="578px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="500px">Nombre</TableCell>
          </TableHeader>
          <TableDetail>
            {retailList &&
              retailList.map &&
              retailList.map((item: any, idx: number) => (
                <TableRow key={idx} className={"deleted"}>
                  <TableCell width="70px" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell width="500px">
                    {item.name}
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => editRetail(item.id)}
                      />
                      <Icon
                        iconName="delete"
                        onClick={() => handleClickDelete(item)}
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${retailList.length} registros`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de Retail"
        message={`Está seguro de eliminar el retail ${retail.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          {
            text: "Si",
            function: () => handleClickDeleteOK(retail.id),
          },
        ]}
      />
    </Fragment>
  );
};

export default RetailList;
