import { useQueryClient } from "@tanstack/react-query";
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

import { useQueryCase, useQueryUF } from "../../../../hooks/query";
import { Modal, Window } from "../../../ui/Modal";
import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import { reimbursementActions } from "../../../../data/masters";
import Button from "../../../ui/Button";

const ReimbursementList = ({ setShowModal, showModal }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [action, setAction] = useState("");
  const [reimbursement, setReimbursement] = useState<any | null>(null);

  const { data: ufValue } = useQueryUF().useGetUFValue();
  const { data: reimbursements, isLoading } =
    useQueryCase().useGetAllReimbursements();

  const { mutate: updateReimbursement } =
    useQueryCase().useUpdateReimbursementStatus();

  console.log(reimbursements);
  const handleViewCase = (case_id: string, stage_id: string) => {
    router.push(`/case/${case_id}/${stage_id}`);
  };

  const handleShow = (reimbursement: any) => {
    setShowModal(true);
    setReimbursement(reimbursement);
  };

  const setClosed = () => {
    setShowModal(false);
  };

  const handleUpdate = (case_id: string, casestageresult_id: string) => {
    if (action === "Reembolsar") {
      updateReimbursement(
        {
          case_id,
          casestageresult_id,
          status: "Aprobado",
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["allReimbursements"]);
          },
        }
      );
    } else if (action === "Rechazar reembolso") {
      updateReimbursement(
        {
          case_id,
          casestageresult_id,
          status: "Rechazado",
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["allReimbursements"]);
          },
        }
      );
    }
    setShowModal(false);
  };

  console.log(reimbursements);

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
            <TableCell width="130px">Monto Total</TableCell>
            <TableCell width="130px">Disponible</TableCell>
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
                <TableCell width="130px" align="center">
                  {data?.currency === "P"
                    ? parseInt(data?.max_amount).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : (data?.max_amount).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLF",
                      }) + " UF"}
                </TableCell>
                <TableCell width="130px" align="center">
                  {data?.currency === "P"
                    ? (
                        parseInt(data?.available) - parseInt(data?.amount)
                      ).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : (data?.available * ufValue.serie[0].valor).toLocaleString(
                        "es-CL",
                        {
                          style: "currency",
                          currency: "CLP",
                        }
                      )}
                </TableCell>
                <TableCell width="100px" align="center">
                  {data?.currency === "P"
                    ? parseInt(data?.amount).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : (data?.amount * data?.uf_value).toLocaleString("es-CL", {
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
                      onClick={() => handleShow(data)}
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
          <ContentCell gap="10px" className="fade-in-fwd">
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
            <Button
              text={"Confirmar"}
              onClick={() =>
                handleUpdate(
                  reimbursement.case_id,
                  reimbursement.casestageresult_id
                )
              }
            />
          </ContentCell>
        </Window>
      </Modal>
    </Fragment>
  );
};

export default ReimbursementList;
