import { useState, Fragment } from "react";

import { SpecialtyDetail } from ".";

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

import useSpecialty from "../../../../hooks/useSpecialty";
import ModalWarning from "../../../ui/ModalWarning";

const SpecialtyList = ({ setShowModal, showModal }: any) => {
  const {
    families,
    specialtyList,
    createSpecialty,
    updateSpecialty,
    deleteSpecialtyById,
    getSpecialtiesByFamilyId,
    setSpecialty,
    resetSpecialty,
    specialty,
    specialtyLoading,
  } = useSpecialty();

  const [search, setSearch] = useState({ family_id: "", text: "" });
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const editSpecialty = (specialty: any) => {
    setSpecialty(specialty);
    setShowModal(true);
  };

  const setClosed = () => {
    resetSpecialty();
    setShowModal(false);
  };

  const saveSpecialty = () => {
    if (specialty.id === "") {
      createSpecialty(specialty);
    } else {
      updateSpecialty(specialty);
    }
    resetSpecialty();
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (specialty: any) => {
    setSpecialty(specialty);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (specialty_id: string) => {
    deleteSpecialtyById(specialty_id);
    setShowWarningDelete(false);
  };

  const handleChangeFamily = (e: any) => {
    setSearch({ ...search, family_id: e.target.value });
  };

  const handleChangeText = (e: any) => {
    setSearch({ ...search, text: e.target.value });
  };

  const handleClickSearch = () => {
    getSpecialtiesByFamilyId(search.family_id);
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
            {specialtyList.map((specialty: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="200px">{specialty.family_name}</TableCell>
                <TableCell width="350px">
                  {specialty.name}
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editSpecialty(specialty)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(specialty)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${specialtyList.length} especialidades`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Especialidad" setClosed={setClosed}>
          <SpecialtyDetail saveSpecialty={saveSpecialty} />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de especialidad"
        message={`¿Está seguro de eliminar la especialidad ${specialty.name}?`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(specialty.id) },
        ]}
      />
      <LoadingMessage showModal={specialtyLoading} />
    </Fragment>
  );
};

export default SpecialtyList;
