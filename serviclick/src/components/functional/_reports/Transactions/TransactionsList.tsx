import { useState, useEffect } from "react";

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
  TableIcons,
} from "../../../ui/Table";

import {
  unFormatRut,
  formatRut,
  currencyFormat,
} from "../../../../utils/format";
import { isValidRut } from "../../../../utils/validations";

import { useChannel, useStatus, useTransaction } from "../../../../hooks";

const TransactionsList = ({ search }: any) => {
  const { list: channelList } = useChannel();
  const { statusList } = useStatus();
  const { getByFilters, resetTransactionList, transactionList } =
    useTransaction();

  type SearchFormT = {
    channelId: string;
    clientType: string;
    rut: string;
    period: string;
    statusId: string;
  };

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
    { id: "m", name: "Septiembre 2022" },
    { id: "y", name: "Año 2022" },
  ];

  const initialDataSearchForm = {
    channelId: "",
    clientType: "",
    rut: "",
    period: "d",
    statusId: "",
  };

  const initialDataResume = {
    records: 0,
    insured: 0,
    total: 0,
  };

  const [searchForm, setSearchForm] = useState<SearchFormT>(
    initialDataSearchForm
  );
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

  const handleClickSearch = () => {
    resetTransactionList();

    getByFilters(
      searchForm.channelId,
      searchForm.clientType,
      searchForm.rut,
      searchForm.period,
      searchForm.statusId
    );
  };

  useEffect(() => {
    resetTransactionList();
    handleClickSearch();
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
          label="Canal"
          width="230px"
          value={searchForm.channelId}
          onChange={(e: any) =>
            changeSearchformValue("channelId", e.target.value)
          }
          placeHolder=":: Seleccione canal ::"
          data={channelList}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          label="Tipo cliente"
          width="230px"
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
          width="170px"
          label="Rut"
          maxLength={9}
          value={searchForm.rut}
          onFocus={handleFocusRut}
          onBlur={handleBlurRut}
          onChange={(e: any) => changeSearchformValue("rut", e.target.value)}
        />
        <ComboBox
          label="Período"
          width="230px"
          value={searchForm.period}
          onChange={(e: any) => changeSearchformValue("period", e.target.value)}
          data={periods}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          label="Estado transacción"
          width="225px"
          value={searchForm.statusId?.toString() || ""}
          onChange={(e: any) =>
            changeSearchformValue("statusId", e.target.value)
          }
          placeHolder=":: Seleccione ::"
          data={statusList}
          dataValue="id"
          dataText="name"
        />
        <ButtonIcon
          iconName="search"
          color="gray"
          onClick={handleClickSearch}
        />
      </ContentRow>
      <Table width="1149px" height="calc(100vh - 210px)">
        <TableHeader>
          <TableCell width="69px" align="center">
            #
          </TableCell>
          <TableCell width="95px">Fecha</TableCell>
          <TableCell width="55px">Hora</TableCell>
          <TableCell width="421px">Cliente</TableCell>
          <TableCell width="197px">Producto</TableCell>
          <TableCell width="83px">N° Aseg.</TableCell>
          <TableCell width="72px">Estado</TableCell>
          <TableCell width="137px">Monto</TableCell>
          {/* <TableCell width="49px"></TableCell> */}
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
              <TableCell width="421px">{transaction.client_name}</TableCell>
              <TableCell width="197px">{transaction.product_name}</TableCell>
              <TableCell width="83px" align="flex-end">
                {transaction.num_insured}
              </TableCell>
              <TableCell width="72px">{transaction.status_name}</TableCell>
              <TableCell width="130px" align="flex-end">
                {currencyFormat(transaction.amount)}
              </TableCell>
              {/* <TableCell width="45px" align="center">
                <TableIcons>
                  <Icon iconName="search" onClick={() => {}} />
                </TableIcons>
              </TableCell> */}
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow gap="5px">
        <ContentCellSummary>{resume.records} registros</ContentCellSummary>
        <ContentCellSummary>{resume.insured} asegurados</ContentCellSummary>
        <ContentCellSummary>
          {currencyFormat(resume.total)} Total
        </ContentCellSummary>
      </ContentRow>
    </ContentCell>
  );
};

export default TransactionsList;
