import { useState, useEffect } from "react";
import moment from "moment";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";

import ButtonIcon from "../../../ui/ButtonIcon";
import InputText from "../../../ui/InputText";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";

import {
  unFormatRut,
  formatRut,
  currencyFormat,
} from "../../../../utils/format";
import { isValidRut } from "../../../../utils/validations";

import { monthNames } from "../../../../data/masters";

import { useTransaction } from "../../../../hooks";

const TransactionsList = ({ setSearchForm, searchForm, search }: any) => {
  const { getByFilters, resetTransactionList, transactionList } =
    useTransaction();

  type ResumeT = {
    records: number;
    insured: number;
    total: number;
  };

  const clientTypes = [
    { id: "p", name: "Persona Natural" },
    { id: "c", name: "Empresa" },
  ];

  const periods = [
    { id: "d", name: "Hoy" },
    { id: "w", name: "Esta semana" },
    { id: "m", name: `${monthNames[moment().month()]} ${moment().year()}` },
    { id: "y", name: `Año ${moment().year()}` },
    { id: "l", name: `Año ${moment().subtract(1, "year").year()}` },
    { id: "a", name: `Todo` },
  ];

  const initialDataResume = {
    records: 0,
    insured: 0,
    total: 0,
  };

  const [resume, setResume] = useState<ResumeT>(initialDataResume);

  const changeSearchformValue = (field: string, value: string) => {
    setSearchForm({ ...searchForm, [field]: value });
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleBlurRut = (event: any) => {
    const isValid = isValidRut(event.target.value);

    event.target.value = formatRut(event.target.value);

    changeSearchformValue("rut", event.target.value);
  };

  useEffect(() => {
    resetTransactionList();
    search();
  }, []);

  useEffect(() => {
    setResume({
      records: transactionList.length,
      insured:
        transactionList.length > 0
          ? transactionList
              .map((transaction) => transaction.num_insured)
              .reduce((acc, num_insured) => acc + num_insured)
          : 0,
      total:
        transactionList.length > 0
          ? transactionList
              .map((transaction) => transaction.amount)
              .reduce((acc, amount) => acc + amount)
          : 0,
    });
  }, [transactionList.length]);

  return (
    <ContentCell gap="5px">
      <ContentRow gap="5px" align="center">
        <ComboBox
          label="Tipo cliente"
          width="250px"
          value={searchForm.clientType}
          onChange={(e: any) =>
            changeSearchformValue("clientType", e.target.value)
          }
          placeHolder=":: Seleccione tipo cliente ::"
          data={clientTypes}
          dataValue="id"
          dataText="name"
        />
        <InputText
          width="150px"
          label="Rut cliente"
          maxLength={9}
          value={searchForm.rut}
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          onChange={(e: any) => changeSearchformValue("rut", e.target.value)}
        />
        <InputText
          width="320px"
          label="Nombre cliente"
          maxLength={9}
          value={searchForm.name}
          onChange={(e: any) => changeSearchformValue("name", e.target.value)}
        />
        <ComboBox
          label="Período"
          width="200px"
          value={searchForm.period}
          onChange={(e: any) => changeSearchformValue("period", e.target.value)}
          data={periods}
          dataValue="id"
          dataText="name"
        />
        <ButtonIcon iconName="search" color="gray" onClick={search} />
      </ContentRow>
      <Table width="991px" height="calc(100vh - 210px)">
        <TableHeader>
          <TableCell width="69px" align="center">
            #
          </TableCell>
          <TableCell width="95px">Fecha</TableCell>
          <TableCell width="55px">Hora</TableCell>
          <TableCell width="321px">Cliente</TableCell>
          <TableCell width="299px">Producto</TableCell>
          <TableCell width="129px">Monto</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {transactionList.map((transaction: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="69px" align="center">
                {idx + 1}
              </TableCell>
              <TableCell width="95px" align="center">
                {transaction.date}
              </TableCell>
              <TableCell width="55px" align="center">
                {transaction.time}
              </TableCell>
              <TableCell width="321px">{transaction.contractor_name}</TableCell>
              <TableCell width="299px">{transaction.product_name}</TableCell>
              <TableCell width="129px" align="flex-end">
                {currencyFormat(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow gap="5px">
        <ContentCellSummary>{resume.records} transacciones</ContentCellSummary>
        <ContentCellSummary>
          {currencyFormat(resume.total)} Total
        </ContentCellSummary>
      </ContentRow>
    </ContentCell>
  );
};

export default TransactionsList;
