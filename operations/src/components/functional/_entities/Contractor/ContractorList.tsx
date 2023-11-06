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
import { LoadingMessage } from "../../../ui/LoadingMessage";

import { unFormatRut, formatRut } from "../../../../utils/rut";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useCustomer } from "../../../../store/hooks";

const ContractorList = ({ editContractor, filters, setFilters }: any) => {
  const router = useRouter();

  const { getByRutOrName, customerList, customerIsLoading } = useCustomer();

  const handleChangeRut = (e: any) => {
    setFilters({ ...filters, rut: e.target.value, name: "" });
  };

  const handleBlurRut = (e: any) => {
    e.target.value = formatRut(e.target.value);
    setFilters({ ...filters, rut: e.target.value });
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeName = (e: any) => {
    setFilters({ ...filters, rut: "", name: e.target.value });
  };

  const handleClickSearch = () => {
    setFilters({ ...filters, page: 1 });
    getByRutOrName(filters.rut, filters.name, filters.records, 1);
  };

  const handleClickNextPage = () => {
    if ((filters?.page || 1) === customerList.pagination.total) return;
    setFilters({ ...filters, page: filters.page + 1 });
    getByRutOrName(
      filters.rut,
      filters.name,
      filters.records,
      filters.page + 1
    );
  };

  const handleClickPrevPage = () => {
    if ((filters?.page || 1) === 1) return;
    setFilters({ ...filters, page: filters.page - 1 });
    getByRutOrName(
      filters.rut,
      filters.name,
      filters.records,
      filters.page - 1
    );
  };

  useEffect(() => {
    console.log(1);
    if (filters?.rut || filters?.name || filters?.page || filters?.records) {
      setFilters(filters);
    }
  }, [filters]);

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="center">
          <InputText
            label="Rut"
            width="150px"
            value={filters?.rut || ""}
            onChange={handleChangeRut}
            onBlur={handleBlurRut}
            onFocus={handleFocusRut}
          />
          <InputText
            label="Nombre a buscar"
            width="601px"
            value={filters?.name || ""}
            onChange={handleChangeName}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="801px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="110px">Rut</TableCell>
            <TableCell width="460px">Nombre</TableCell>
            <TableCell width="100px">Productos</TableCell>
            <TableCell width="40px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {customerList.data &&
              customerList.data.map((insuredItem, idx: number) => (
                <TableRow key={idx}>
                  <TableCell width="70px" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell width="110px" align="right">
                    {insuredItem.rut}
                  </TableCell>
                  <TableCell width="460px">{insuredItem.name}</TableCell>
                  <TableCell width="100px" align="center">
                    {insuredItem.products}
                  </TableCell>
                  <TableCell width="40px">
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() => editContractor(insuredItem.id)}
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px" align="space-between">
          <ContentRow gap="5px" align="flex-start">
            <ContentCellSummary>{`${customerList.summary.customer} clientes`}</ContentCellSummary>
            <ContentCellSummary>{`${customerList.summary.products} productos`}</ContentCellSummary>
          </ContentRow>
          <ContentRow gap="5px" align="flex-end">
            <ButtonIcon
              iconName="navigate_before"
              onClick={handleClickPrevPage}
              color="gray"
            />
            <ContentCellSummary>{`Página ${filters?.page || 1} de ${
              customerList.pagination?.total || 1
            }`}</ContentCellSummary>
            <ButtonIcon
              iconName="navigate_next"
              onClick={handleClickNextPage}
              color="gray"
            />
          </ContentRow>
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={customerIsLoading} />
    </Fragment>
  );
};

export default ContractorList;
