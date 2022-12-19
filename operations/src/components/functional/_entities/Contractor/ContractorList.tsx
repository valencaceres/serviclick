import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

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
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";

import ModalWarning from "../../../ui/ModalWarning";
import ComboBox from "../../../ui/ComboBox";
import { LoadingMessage } from "../../../ui/LoadingMessage";

import { useUI, useContractor } from "../../../../hooks";
import ModalWindow from "../../../ui/ModalWindow";
import { MenuButtons, MenuItem } from "../../../ui/MenuButtons";

const ContractorList = ({
  setShowModalType,
  editContractor,
  showModalType,
}: any) => {
  const router = useRouter();

  const { filters, setFiltersUI } = useUI();
  const {
    contractorList,
    getAllContractors,
    setContractor,
    resetContractor,
    contractor,
    contractorLoading,
  } = useContractor();

  const initialDataSearch = {
    type: filters?.type || "",
    name: filters?.name || "",
    status: filters?.status || "A",
  };

  const dataContractorType = [
    { id: "P", name: "Persona natural" },
    { id: "C", name: "Empresa" },
  ];

  const dataContractorStatus = [
    { id: "A", name: "Activo" },
    { id: "T", name: "Todos" },
  ];

  const [search, setSearch] = useState(initialDataSearch);
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (contractor: any) => {
    setContractor(contractor);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (contractor_id: string) => {
    //deleteContractorById(contractor_id);
    setShowWarningDelete(false);
  };

  const handleChangeType = (e: any) => {
    setSearch({ ...search, type: e.target.value });
  };

  const handleChangeName = (e: any) => {
    setSearch({ ...search, name: e.target.value });
  };

  const handleChangeStatus = (e: any) => {
    setSearch({ ...search, status: e.target.value });
  };

  const handleClickSearch = () => {
    getAllContractors(search.type, search.name, search.status === "A");
  };

  const handleClickContractorType = (type: string) => {
    setShowModalType(false);
    resetContractor();
    setContractor({ ...contractor, type });
    router.push("/entities/contractor?id=new");
  };

  useEffect(() => {
    if (search.type || search.name || search.status) {
      setFiltersUI(search);
    }
  }, [search]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Tipo cliente"
            width="200px"
            value={search.type}
            onChange={handleChangeType}
            placeHolder=":: Tipo de cliente ::"
            data={dataContractorType}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Texto a buscar"
            width="430px"
            value={search.name}
            onChange={handleChangeName}
          />
          <ComboBox
            label="Estado"
            width="150px"
            value={search.status}
            onChange={handleChangeStatus}
            data={dataContractorStatus}
            dataValue="id"
            dataText="name"
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="833px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="110px">Rut</TableCell>
            <TableCell width="110px">Tipo cliente</TableCell>
            <TableCell width="350px">Nombre</TableCell>
            <TableCell width="100px">Productos</TableCell>
            <TableCell width="70px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {contractorList.map((contractor: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="110px" align="right">
                  {contractor.rut}
                </TableCell>
                <TableCell width="110px">
                  {contractor.type === "P" ? "Persona natural" : "Empresa"}
                </TableCell>
                <TableCell width="350px">{contractor.name}</TableCell>
                <TableCell width="100px" align="center">
                  {contractor.quantity}
                </TableCell>
                <TableCell width="70px">
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editContractor(contractor.id)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(contractor)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px" align="flex-start">
          <ContentCellSummary>{`${contractorList.length} clientes`}</ContentCellSummary>
          <ContentCellSummary>{`${contractorList.reduce(
            (acum: number, item) => acum + parseInt(item.quantity.toString()),
            0
          )} suscriptiones`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de producto"
        message={`Está seguro de eliminar al cliente ${contractor.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(contractor.id) },
        ]}
      />
      <ModalWindow
        showModal={showModalType}
        setClosed={() => setShowModalType(false)}
        title="Tipo de cliente">
        <MenuButtons>
          <MenuItem key={1} onClick={() => handleClickContractorType("P")}>
            <Icon iconName="accessibility_new" />
            Persona natural
          </MenuItem>
          <MenuItem key={2} onClick={() => handleClickContractorType("C")}>
            <Icon iconName="apartment" />
            Empresa
          </MenuItem>
        </MenuButtons>
      </ModalWindow>
      <LoadingMessage showModal={contractorLoading} />
    </Fragment>
  );
};

export default ContractorList;
