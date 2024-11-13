import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "~/components/layout/Content";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "~/components/ui/Table";
import Icon from "~/components/ui/Icon";
import PDFViewer from "~/components/ui/PDFViewer/PdfViewer";
import { LoadingMessage } from "~/components/ui/LoadingMessage";
import { useCase } from "~/store/hooks";
import Button from "~/components/ui/Button";
import { Modal, Window } from "~/components/ui/Modal";
const CaseHistory = ({ showModal, setShowModal }: any) => {
  const router = useRouter();
  const [pdfModal, setPdfModal] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const {
    caseValue,
    pdfBase64,
    getContract,
    getById,
    usersList,
    getChatByCase,
    resetPdf,
    isLoading,
  } = useCase();
  const { id } = router.query;
  const stringId = id?.toString();

  const handleCloseModalPdf = () => {
    resetPdf();
    setPdfModal(false);
  };

  const openModal = () => {
    setShowModal(true);
    if (caseValue?.case_id) {
      getChatByCase(caseValue?.case_id);
    }
  };

  const openContract = () => {
    if (stringId) {
      getContract(stringId);
      setPdfModal(true);
    }
  };

  useEffect(() => {
    if (stringId) {
      getById(stringId);
    }
  }, []);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table height="400px">
          <TableHeader>
            <TableCell width="95px" align="center">
              Fecha
            </TableCell>
            <TableCell width="100px">Hora</TableCell>
            <TableCell width="208px">Etapa/Acción</TableCell>
            <TableCell width="41px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {caseValue?.history?.map((stage, idx: number) => {
              return (
                <TableRow key={idx}>
                  <TableCell width="95px" align="center">
                    {stage.date}
                  </TableCell>
                  <TableCell width="100px">{stage.time}</TableCell>
                  <TableCell width="208px" align="left">
                    {stage.name}
                  </TableCell>
                  <TableCell width="41px" align="left">
                    <TableIcons>
                      <Icon
                        iconName="search"
                        button={true}
                        onClick={() => {
                          router.push(
                            `/assistance/case/${stage.code}/${caseValue?.case_id}`
                          );
                        }}
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableDetail>
        </Table>

        <ContentRow className="justify-between">
          <ContentCellSummary
            color={caseValue?.history?.length > 0 ? "blue" : "#959595"}
          >
            {caseValue?.history?.length === 0 || !caseValue?.history
              ? "No hay acciones"
              : caseValue?.history?.length === 1
              ? "1 acción"
              : `${caseValue?.history?.length} acciones`}
          </ContentCellSummary>
          <>
            <Button
              text="Contrato"
              iconName="history_edu"
              onClick={openContract}
            />
            <Modal showModal={pdfModal}>
              {pdfBase64 && !isLoading ? (
                <Window title="Documento" setClosed={handleCloseModalPdf}>
                  <PDFViewer base64={pdfBase64} />
                </Window>
              ) : !pdfBase64 && !isLoading ? (
                <Window title="Documento" setClosed={handleCloseModalPdf}>
                  <p>No existe un contrato para este plan...</p>
                </Window>
              ) : null}
            </Modal>
          </>
          {caseValue?.case_id !== null && caseValue?.case_id !== "" && (
            <Button text="Chat" iconName="chat" onClick={() => openModal()} />
          )}
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};
export default CaseHistory;
