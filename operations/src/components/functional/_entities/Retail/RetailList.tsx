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
  TableCellEnd,
} from "../../../ui/Table";

import { LoadingMessage } from "../../../ui/LoadingMessage";

import { unFormatRut, formatRut } from "../../../../utils/format";

import { useUI, useRetail } from "../../../../hooks";

const RetailList = () => {
  const router = useRouter();

  const { filters, setFiltersUI } = useUI();
  const { retailList, getBySearchValues, retailLoading } = useRetail();

  const initialDataSearch = {
    rut: filters?.rut || "",
    name: filters?.name || "",
  };

  const [search, setSearch] = useState(initialDataSearch);

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
    getBySearchValues(search.rut, search.name);
  };

  const handleClickRow = (id: string) => {
    router.push(`/entities/retail/${id}`);
  };

  useEffect(() => {
    if (search.rut || search.name) {
      setFiltersUI(search);
    }
  }, [search]);

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="center">
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
            <TableCell width="402px">Nombre</TableCell>
            <TableCell width="115px">Productos</TableCell>
            <TableCell width="115px">Suscripciones</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {retailList &&
              retailList.length > 0 &&
              retailList.map((retail: any, idx: number) => (
                <TableRow
                  key={idx}
                  link={true}
                  onClick={() => handleClickRow(retail.id)}
                >
                  <TableCell width="70px" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell width="110px" align="right">
                    {retail.rut}
                  </TableCell>
                  <TableCell width="402px">{retail.name}</TableCell>
                  <TableCell width="115px" align="center">
                    {retail.products}
                  </TableCell>
                  <TableCell width="115px" align="center">
                    {retail.insured}
                  </TableCell>
                </TableRow>
              ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px" align="flex-start">
          <ContentCellSummary>{`${
            retailList && retailList.length ? retailList.length : "0"
          } empresas`}</ContentCellSummary>
          <ContentCellSummary>{`${
            retailList && retailList.length
              ? retailList.reduce(
                  (acum: number, item) =>
                    acum + parseInt(item.products.toString()),
                  0
                )
              : "0"
          } productos`}</ContentCellSummary>
          <ContentCellSummary>{`${
            retailList && retailList.length
              ? retailList.reduce(
                  (acum: number, item) =>
                    acum + parseInt(item.insured.toString()),
                  0
                )
              : "0"
          } suscripciones`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={retailLoading} />
    </Fragment>
  );
};

export default RetailList;
