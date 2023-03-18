import { useState, Fragment, useEffect } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";
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

import { useQueryCompany, useQueryImport } from "../../../../hooks/query";
import Loading from "../../../ui/Loading";

const ImportList = ({ viewImport }: any) => {
  const initialSearchForm = {
    client_id: "",
    year: "",
    month: "",
  };

  const [search, setSearch] = useState(initialSearchForm);

  const { data: companies } = useQueryCompany().useGetAll();
  const { data: imports, isLoading } = useQueryImport().useGetAll();

  const handleChangeClient = (e: any) => {
    setSearch({
      ...search,
      client_id: e.target.value,
    });
  };

  const handleChangeYear = (e: any) => {
    setSearch({
      ...search,
      year: e.target.value,
    });
  };

  const handleChangeMonth = (e: any) => {
    setSearch({
      ...search,
      month: e.target.value,
    });
  };

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="start">
          <ComboBox
            label="Cliente"
            width="298px"
            value={search.client_id}
            onChange={handleChangeClient}
            placeHolder="Seleccione cliente"
            data={companies}
            dataValue="id"
            dataText="companyName"
          />
          <ComboBox
            label="Mes"
            width="200px"
            value={search.month}
            onChange={handleChangeMonth}
            placeHolder="Seleccione mes"
            data={[]}
            dataValue="id"
            dataText="name"
          />
          <ComboBox
            label="Año"
            width="200px"
            value={search.year}
            onChange={handleChangeYear}
            placeHolder="Seleccione año"
            data={[]}
            dataValue="id"
            dataText="name"
          />
        </ContentRow>
        <Table>
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="160px">Cliente</TableCell>
            <TableCell width="153px">Fecha/Hora</TableCell>
            <TableCell width="56px">Año</TableCell>
            <TableCell width="94px">Mes</TableCell>
            <TableCell width="94px">Cantidad</TableCell>
            <TableCell width="56px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {imports?.map((data: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="160px">{data.companyname}</TableCell>
                <TableCell width="153px" align="center">
                  {data.createddate}
                </TableCell>
                <TableCell width="56px" align="center">
                  {data.year}
                </TableCell>
                <TableCell width="94px">{data.month}</TableCell>
                <TableCell width="94px" align="center">
                  {data.rows}
                </TableCell>
                <TableCell width="56px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => viewImport(data.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary color={imports?.length > 0 ? "blue" : "#959595"}>
            {imports?.length === 0
              ? "No hay importaciones"
              : imports?.length === 1
              ? "1 importación"
              : isLoading === true
              ? "Cargando..."
              : `${imports?.length} importaciones`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
    </Fragment>
  );
};

export default ImportList;
