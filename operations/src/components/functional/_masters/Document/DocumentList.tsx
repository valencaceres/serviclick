import { useState, Fragment, useEffect } from "react";

import { DocumentDetail } from ".";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import ButtonIcon from "../../../ui/ButtonIcon";
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
import { Modal, Window } from "../../../ui/Modal";
import { LoadingMessage } from "../../../ui/LoadingMessage";

import useDocument from "../../../../hooks/useDocument";
import ModalWarning from "../../../ui/ModalWarning";

const DocumentList = ({ setShowModal, showModal }: any) => {
  const {
    families,
    documentList,
    createDocument,
    updateDocument,
    deleteDocumentById,
    getDocumentsByFamilyId,
    setDocument,
    resetDocument,
    document,
    documentLoading,
  } = useDocument();

  const [search, setSearch] = useState({ family_id: "", text: "" });
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const editDocument = (document: any) => {
    setDocument(document);
    setShowModal(true);
  };

  const setClosed = () => {
    resetDocument();
    setShowModal(false);
  };

  const saveDocument = () => {
    if (document.id === "") {
      createDocument(document);
    } else {
      updateDocument(document);
    }
    resetDocument();
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (document: any) => {
    setDocument(document);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (document_id: string) => {
    deleteDocumentById(document_id);
    setShowWarningDelete(false);
  };

  const handleChangeFamily = (e: any) => {
    setSearch({ ...search, family_id: e.target.value });
  };

  const handleChangeText = (e: any) => {
    setSearch({ ...search, text: e.target.value });
  };

  const handleClickSearch = () => {
    getDocumentsByFamilyId(search.family_id);
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <ComboBox
            id="cmbFamily"
            label="Familia"
            width="220px"
            value={search.family_id}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione familia ::"
            data={families || []}
            dataValue="family_id"
            dataText="family_name"
          />
          <InputText
            label="Texto a buscar"
            width="360px"
            value={search.text}
            onChange={handleChangeText}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="637px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="200px">Familia</TableCell>
            <TableCell width="350px">Nombre</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {documentList.map((document: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="200px">{document.family_name}</TableCell>
                <TableCell width="350px">
                  {document.name}
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editDocument(document)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(document)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${documentList.length} documento`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Documento" setClosed={setClosed}>
          <DocumentDetail saveDocument={saveDocument} />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de documento"
        message={`¿Está seguro de eliminar el documento ${document.name}?`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(document.id) },
        ]}
      />
      <LoadingMessage showModal={documentLoading} />
    </Fragment>
  );
};

export default DocumentList;
