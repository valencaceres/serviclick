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

import { useBroker } from "../../../../hooks";

const BrokerList = ({ editBroker, deleteBroker }: any) => {
  const { broker, setBroker, brokerList, getAllBrokers } = useBroker();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (brokerItem: any) => {
    setBroker(brokerItem);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (id: string) => {
    deleteBroker(broker.id);
    setShowWarningDelete(false);
  };

  useEffect(() => {
    getAllBrokers();
  }, []);

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <InputText
            label="Texto a buscar"
            width="375px"
            value={search}
            onChange={setSearch}
          />
          <ButtonIcon iconName="search" color="gray" />
        </ContentRow>
        <Table width="428px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="350px">Nombre</TableCell>
          </TableHeader>
          <TableDetail>
            {brokerList &&
              brokerList.map &&
              brokerList.map((item: any, idx: number) => (
                <TableRow key={idx} className={"deleted"}>
                  <TableCell width="70px" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell width="350px">
                    {item.name}
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => editBroker(item.id)}
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
          <ContentCellSummary>{`${brokerList.length} registros`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de Broker"
        message={`Está seguro de eliminar el broker ${broker.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          {
            text: "Si",
            function: () => handleClickDeleteOK(broker.id),
          },
        ]}
      />
    </Fragment>
  );
};

export default BrokerList;
