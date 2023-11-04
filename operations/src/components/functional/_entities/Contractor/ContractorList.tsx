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
// import ComboBox from "../../../ui/ComboBox";
import { LoadingMessage } from "../../../ui/LoadingMessage";

import { unFormatRut, formatRut } from "../../../../utils/rut";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

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
    rut: filters?.rut || "",
    name: filters?.name || "",
    status: filters?.status || "A",
  };

  const dataContractorType = [
    { id: "P", name: "Persona natural" },
    { id: "C", name: "Empresa" },
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

  const handleChangeRut = (e: any) => {
    setSearch({ ...search, rut: e.target.value, name: "" });
  };

  const handleBlurRut = (e: any) => {
    e.target.value = formatRut(e.target.value);
    setSearch({ ...search, rut: e.target.value });
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeName = (e: any) => {
    setSearch({ ...search, rut: "", name: e.target.value });
  };

  const handleClickSearch = () => {
    getAllContractors(
      search.type,
      search.rut,
      search.name,
      search.status === "A"
    );
  };

  useEffect(() => {
    if (search.type || search.rut || search.name || search.status) {
      setFiltersUI(search);
    }
  }, [search]);

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="center">
          {/* <ComboBox
            label="Tipo cliente"
            width="200px"
            value={search.type}
            onChange={handleChangeType}
            placeHolder=":: Tipo de cliente ::"
            data={dataContractorType}
            dataValue="id"
            dataText="name"
          /> */}
          <InputText
            label="Rut"
            width="150px"
            value={search.rut}
            onChange={handleChangeRut}
            onBlur={handleBlurRut}
            onFocus={handleFocusRut}
          />
          <InputText
            label="Nombre a buscar"
            width="635px"
            value={search.name}
            onChange={handleChangeName}
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
          )} suscripciones`}</ContentCellSummary>
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
        title="Tipo de cliente"
      >
        <MenuButtons>
          <MenuItem
            key={1}
            onClick={() => router.push("/entities/contractor/new/person")}
          >
            <Icon iconName="accessibility_new" />
            Persona natural
          </MenuItem>
          <MenuItem
            key={2}
            onClick={() => router.push("/entities/contractor/new/company")}
          >
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
