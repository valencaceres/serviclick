import { useState, useEffect, Fragment } from "react";

import AssistanceValues from "./AssistanceValues";
import AssistanceSpecialties from "./AssistanceSpecialties";
import AssistanceDocuments from "./AssistanceDocuments";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import TextArea from "../../../ui/TextArea/TextArea";
import ComboBox from "../../../ui/ComboBox";
import Icon from "../../../ui/Icon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";
import ButtonIcon from "../../../ui/ButtonIcon";
import ModalWindow from "../../../ui/ModalWindow";

import {
  useValue,
  useDocument,
  useSpecialty,
  useAssistance,
} from "../../../../hooks";
import { LoadingMessage } from "../../../ui/LoadingMessage";

const AssistanceDetail = ({ setEnableSave }: any) => {
  const { getValuesByFamilyId } = useValue();
  const { getDocumentsByFamilyId } = useDocument();
  const { getSpecialtiesByFamilyId } = useSpecialty();
  const {
    setAssistance,
    resetAssistanceAll,
    assistance,
    families,
    assistanceLoading,
  } = useAssistance();

  const [showModalValues, setShowModalValues] = useState(false);
  const [showModalSpecialties, setShowModalSpecialties] = useState(false);
  const [showModalDocuments, setShowModalDocuments] = useState(false);

  const handleClickAddValue = () => {
    setShowModalValues(true);
  };

  const handleClickAddDocument = () => {
    setShowModalDocuments(true);
  };

  const handleClickAddSpecialty = () => {
    setShowModalSpecialties(true);
  };

  const handleClickDeleteValue = (item: any) => {
    setAssistance({
      ...assistance,
      values: assistance.values.filter((it: any) => it.id !== item.id),
    });
  };

  const handleClickDeleteDocument = (item: any) => {
    setAssistance({
      ...assistance,
      documents: assistance.documents.filter((it: any) => it.id !== item.id),
    });
  };

  const handleClickDeleteSpecialty = (item: any) => {
    setAssistance({
      ...assistance,
      specialties: assistance.specialties.filter(
        (it: any) => it.id !== item.id
      ),
    });
  };

  useEffect(() => {
    if (assistance.family) {
      if (assistance.family.id !== "") {
        getValuesByFamilyId(assistance.family?.id);
        getDocumentsByFamilyId(assistance.family?.id);
        getSpecialtiesByFamilyId(assistance.family?.id);
      }
    }
  }, [assistance.family]);

  useEffect(() => {
    setEnableSave(
      assistance.family?.id !== "" &&
        assistance.name !== "" &&
        assistance.description !== ""
    );
  }, [assistance]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentCell gap="5px">
          <ContentRow gap="5px">
            <ComboBox
              id="cmbFamily"
              label="Familia"
              width="290px"
              value={assistance.family?.id}
              data={families}
              dataValue="id"
              dataText="name"
              enabled={false}
            />
            <InputText
              id="txtName"
              label="Nombre"
              width="620px"
              value={assistance.name}
              disabled={true}
            />
          </ContentRow>
          <TextArea
            id="txtName"
            label="Descripción"
            width="915px"
            height="150px"
            value={assistance.description}
            disabled={true}
          />
        </ContentCell>
        <ContentRow gap="5px">
          <ContentCell gap="5px">
            <Table width="285px" height="189px">
              <TableHeader>
                <TableCell width="220px">Valores</TableCell>
                <TableCell width="50px" align="center">
                  &nbsp;
                </TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {assistance.values?.map((value: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="220px">{value.name}</TableCell>
                    <TableCell width="50px" align="center">
                      <TableIcons>
                        <Icon
                          iconName="delete"
                          onClick={() => handleClickDeleteValue(value)}
                        />
                      </TableIcons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
            <ContentRow align="space-between">
              <ContentCellSummary>{`${
                assistance.values ? assistance.values.length : 0
              } valores`}</ContentCellSummary>
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickAddValue}
              />
            </ContentRow>
          </ContentCell>
          <ContentCell gap="5px">
            <Table width="335px" height="189px">
              <TableHeader>
                <TableCell width="270px">Especialidades</TableCell>
                <TableCell width="50px" align="center">
                  &nbsp;
                </TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {assistance.specialties?.map((specialty: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="270px">{specialty.name}</TableCell>
                    <TableCell width="50px" align="center">
                      <TableIcons>
                        <Icon
                          iconName="delete"
                          onClick={() => handleClickDeleteSpecialty(specialty)}
                        />
                      </TableIcons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
            <ContentRow align="space-between">
              <ContentCellSummary>{`${
                assistance.specialties ? assistance.specialties.length : 0
              } especialidades`}</ContentCellSummary>
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickAddSpecialty}
              />
            </ContentRow>
          </ContentCell>
          <ContentCell gap="5px">
            <Table width="285px" height="189px">
              <TableHeader>
                <TableCell width="220px">Documentos</TableCell>
                <TableCell width="50px" align="center">
                  &nbsp;
                </TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {assistance.documents?.map((document: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="220px">{document.name}</TableCell>
                    <TableCell width="50px" align="center">
                      <TableIcons>
                        <Icon
                          iconName="delete"
                          onClick={() => handleClickDeleteDocument(document)}
                        />
                      </TableIcons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
            <ContentRow align="space-between">
              <ContentCellSummary>{`${
                assistance.documents ? assistance.documents.length : 0
              } documentos`}</ContentCellSummary>
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickAddDocument}
              />
            </ContentRow>
          </ContentCell>
        </ContentRow>
      </ContentCell>
      <ModalWindow
        showModal={showModalValues}
        setClosed={() => setShowModalValues(false)}
        title="Seleccione valores"
      >
        <AssistanceValues setShowModal={setShowModalValues} />
      </ModalWindow>
      <ModalWindow
        showModal={showModalSpecialties}
        setClosed={() => setShowModalSpecialties(false)}
        title="Seleccione especialidades"
      >
        <AssistanceSpecialties setShowModal={setShowModalSpecialties} />
      </ModalWindow>
      <ModalWindow
        showModal={showModalDocuments}
        setClosed={() => setShowModalDocuments(false)}
        title="Seleccione valores"
      >
        <AssistanceDocuments setShowModal={setShowModalDocuments} />
      </ModalWindow>
      {assistanceLoading && <LoadingMessage showModal={assistanceLoading} />}
    </Fragment>
  );
};

export default AssistanceDetail;
