import { useState, useEffect, Fragment } from "react";

import AssistanceValues from "./AssistanceValues";
import AssistanceBenefits from "./AssistanceBenefits";
import AssistanceExclusions from "./AssistanceExclusions";
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
import {
  TableWide,
  TableWHeader,
  TableWDetail,
  TableWRow,
  TableWCell,
  TableWCellIcons,
  TableWIcons,
  TableWCellEnd,
} from "../../../ui/TableWide";
import ButtonIcon from "../../../ui/ButtonIcon";
import ModalWindow from "../../../ui/ModalWindow";

import {
  useValue,
  useAssistance,
  useDocument,
  useSpecialty,
  useFamily,
} from "../../../../hooks";
import { LoadingMessage } from "../../../ui/LoadingMessage";

const AssistanceDetail = ({ setEnableSave }: any) => {
  const { getValuesByFamilyId } = useValue();
  const { getDocumentsByFamilyId } = useDocument();
  const { getSpecialtiesByFamilyId } = useSpecialty();
  const { list: familyList } = useFamily();
  const {
    setAssistance,
    resetAssistanceAll,
    assistance,
    families,
    assistanceLoading,
  } = useAssistance();

  const [showModalValues, setShowModalValues] = useState(false);
  const [showModalBenefits, setShowModalBenefits] = useState(false);
  const [showModalExclusions, setShowModalExclusions] = useState(false);
  const [showModalSpecialties, setShowModalSpecialties] = useState(false);
  const [showModalDocuments, setShowModalDocuments] = useState(false);
  const [benefitValue, setBenefitValue] = useState({ id: "", description: "" });
  const [exclusionValue, setExclusionValue] = useState({
    id: "",
    description: "",
  });

  const handleChangeFamily = (e: any) => {
    if (e.target.value === "") {
      resetAssistanceAll();
    }
    setAssistance({
      ...assistance,
      family: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  };

  const handleChangeName = (e: any) => {
    setAssistance({
      ...assistance,
      name: e.target.value,
    });
  };

  const handleChangeDescription = (e: any) => {
    setAssistance({
      ...assistance,
      description: e.target.value,
    });
  };

  const handleClickAddValue = () => {
    setShowModalValues(true);
  };

  const handleClickAddBenefit = () => {
    setBenefitValue({ id: "", description: "" });
    setShowModalBenefits(true);
  };

  const handleClickAddExclusion = () => {
    setExclusionValue({ id: "", description: "" });
    setShowModalExclusions(true);
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

  const handleClickDeleteBenefit = (item: any) => {
    setAssistance({
      ...assistance,
      benefits: assistance.benefits.filter(
        (it: any) => it.description !== item.description
      ),
    });
  };

  const handleClickDeleteExclusion = (item: any) => {
    setAssistance({
      ...assistance,
      exclusions: assistance.exclusions.filter(
        (it: any) => it.description !== item.description
      ),
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
        getDocumentsByFamilyId(assistance.family?.id);
        getSpecialtiesByFamilyId(assistance.family?.id);
        getValuesByFamilyId(assistance.family?.id);
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
        <ContentRow gap="5px">
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <ComboBox
                id="cmbFamily"
                label="Familia"
                width="290px"
                value={assistance.family?.id}
                onChange={handleChangeFamily}
                placeHolder=":: Seleccione familia ::"
                data={familyList}
                dataValue="id"
                dataText="name"
              />
              <InputText
                id="txtName"
                label="Nombre"
                width="500px"
                value={assistance.name}
                onChange={handleChangeName}
              />
            </ContentRow>
            <TextArea
              id="txtName"
              label="Descripción"
              width="795px"
              height="179px"
              value={assistance.description}
              onChange={handleChangeDescription}
            />
          </ContentCell>
          <ContentCell gap="5px">
            <Table width="335px" height="189px">
              <TableHeader>
                <TableCell width="270px">Valores</TableCell>
                <TableCell width="50px" align="center"></TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {assistance.values?.map((value: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="270px">{value.name}</TableCell>
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
        </ContentRow>
        <ContentRow gap="5px">
          <ContentCell gap="5px">
            <TableWide width="565px" height="230px">
              <TableWHeader>
                <TableWCell width="500px">Prestaciones</TableWCell>
                <TableWCell width="50px" align="center"></TableWCell>
                <TableWCellEnd />
              </TableWHeader>
              <TableWDetail>
                {assistance.benefits?.map((benefit: any, idx: number) => (
                  <TableWRow key={idx}>
                    <TableWCell width="500px">{benefit.description}</TableWCell>
                    <TableWCellIcons width="50px" align="center">
                      <TableWIcons>
                        <Icon
                          iconName="delete"
                          onClick={() => handleClickDeleteBenefit(benefit)}
                        />
                      </TableWIcons>
                    </TableWCellIcons>
                  </TableWRow>
                ))}
              </TableWDetail>
            </TableWide>
            <ContentRow align="space-between">
              <ContentCellSummary>{`${
                assistance.benefits ? assistance.benefits.length : 0
              } prestaciones`}</ContentCellSummary>
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickAddBenefit}
              />
            </ContentRow>
          </ContentCell>
          <ContentCell gap="5px">
            <TableWide width="565px" height="230px">
              <TableWHeader>
                <TableWCell width="500px">Exclusiones</TableWCell>
                <TableWCell width="50px" align="center"></TableWCell>
                <TableWCellEnd />
              </TableWHeader>
              <TableWDetail>
                {assistance.exclusions?.map((exclusion: any, idx: number) => (
                  <TableWRow key={idx}>
                    <TableWCell width="500px">
                      {exclusion.description}
                    </TableWCell>
                    <TableWCellIcons width="50px" align="center">
                      <TableWIcons>
                        <Icon
                          iconName="delete"
                          onClick={() => handleClickDeleteExclusion(exclusion)}
                        />
                      </TableWIcons>
                    </TableWCellIcons>
                  </TableWRow>
                ))}
              </TableWDetail>
            </TableWide>
            <ContentRow align="space-between">
              <ContentCellSummary>{`${
                assistance.exclusions ? assistance.exclusions.length : 0
              } exclusiones`}</ContentCellSummary>
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleClickAddExclusion}
              />
            </ContentRow>
          </ContentCell>
        </ContentRow>
        <ContentRow gap="5px">
          <ContentCell gap="5px">
            <Table width="565px" height="230px">
              <TableHeader>
                <TableCell width="500px">Especialidades</TableCell>
                <TableCell width="50px" align="center"></TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {assistance.specialties?.map((specialty: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="500px">{specialty.name}</TableCell>
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
            <Table width="565px" height="230px">
              <TableHeader>
                <TableCell width="500px">Documentos</TableCell>
                <TableCell width="50px" align="center"></TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {assistance.documents?.map((document: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="500px">{document.name}</TableCell>
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
        showModal={showModalBenefits}
        setClosed={() => setShowModalBenefits(false)}
        title="Prestación"
      >
        <AssistanceBenefits
          setShowModal={setShowModalBenefits}
          benefitValue={benefitValue}
          setBenefitValue={setBenefitValue}
        />
      </ModalWindow>
      <ModalWindow
        showModal={showModalExclusions}
        setClosed={() => setShowModalExclusions(false)}
        title="Exclusión"
      >
        <AssistanceExclusions
          setShowModal={setShowModalExclusions}
          exclusionValue={exclusionValue}
          setExclusionValue={setExclusionValue}
        />
      </ModalWindow>
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
        title="Seleccione documentos"
      >
        <AssistanceDocuments setShowModal={setShowModalDocuments} />
      </ModalWindow>
      {assistanceLoading && <LoadingMessage showModal={assistanceLoading} />}
    </Fragment>
  );
};

export default AssistanceDetail;
