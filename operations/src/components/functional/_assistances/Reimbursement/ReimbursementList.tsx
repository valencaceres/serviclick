import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";

import { LoadingMessage } from "../../../ui/LoadingMessage";

import { useQueryCase } from "../../../../hooks/query";
import { Modal, Window } from "../../../ui/Modal";
import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import { reimbursementActions } from "../../../../data/masters";

const ReimbursementList = ({ setShowModal, showModal }: any) => {
  const router = useRouter();
  const [action, setAction] = useState("");
  const { data: reimbursements, isLoading } =
    useQueryCase().useGetAllReimbursements();

  const handleViewCase = (case_id: string, stage_id: string) => {
    router.push(`/case/${case_id}/${stage_id}`);
  };

  const setClosed = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <Table>
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="190px">Cliente</TableCell>
            <TableCell width="250px">Servicio</TableCell>
            <TableCell width="100px">Disponible</TableCell>
            <TableCell width="100px">Reembolso</TableCell>
            <TableCell width="100px">Estado</TableCell>
            <TableCell width="80px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {reimbursements?.map((data: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {data.case_number}
                </TableCell>
                <TableCell width="190px">
                  {data.name + " " + data.paternallastname}
                </TableCell>
                <TableCell width="250px" align="center">
                  {data.assistance}
                </TableCell>
                <TableCell width="100px" align="center">
                  {parseInt(data?.max_amount).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell width="100px" align="center">
                  {parseInt(data?.amount).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell width="100px" align="center">
                  {data.status}
                </TableCell>
                <TableCell width="80px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="payments"
                      button={true}
                      onClick={() => setShowModal(true)}
                    />
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => handleViewCase(data.case_id, "resolución")}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary
            color={reimbursements?.length > 0 ? "blue" : "#959595"}
          >
            {reimbursements?.length === 0
              ? "No hay reembolsos"
              : reimbursements?.length === 1
              ? "1 reembolso"
              : isLoading === true
              ? "Cargando..."
              : `${reimbursements?.length} reembolsos`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
      <Modal showModal={showModal}>
        <Window title="Reembolsar" setClosed={setClosed}>
          <ContentCell gap="5px" className="fade-in-fwd">
            <ComboBox
              label="Acción"
              width="260px"
              data={reimbursementActions}
              value={action}
              onChange={(e: any) => setAction(e.target.value)}
              dataText="name"
              dataValue="name"
              placeHolder="Seleccione una acción"
            />
          </ContentCell>
        </Window>
      </Modal>
    </Fragment>
  );
};

export default ReimbursementList;
