import { useState, Fragment, useEffect } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../layout/Content";
import ComboBox from "../../ui/ComboBox";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../ui/Table";
import Icon from "../../ui/Icon";

import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";

import { useQueryCompany, useQueryCase } from "../../../hooks/query";
import { useRouter } from "next/router";

const CaseList = () => {
  const router = useRouter();
  const initialSearchForm = {
    company_id: "",
    name: "",
    state: "",
  };

  const [search, setSearch] = useState(initialSearchForm);

  const { data: companies } = useQueryCompany().useGetAll();
  const { data: cases } = useQueryCase().useGetAll();

  const handleChangeCompany = async (e: any) => {
    setSearch({
      ...search,
      company_id: e.target.value,
    });
  };

  const handleChangeName = async (e: any) => {
    setSearch({
      ...search,
      name: e.target.value,
    });
  };

  const handleChangeState = async (e: any) => {
    setSearch({
      ...search,
      state: e.target.value,
    });
  };

  const handleViewCase = (case_id: string, stage: string) => {
    router.push(`/case/${case_id}/${stage}`);
  };

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="start">
          <ComboBox
            label="Cliente"
            width="300px"
            value={search.company_id}
            onChange={handleChangeCompany}
            placeHolder="Seleccione cliente"
            data={companies}
            dataValue="id"
            dataText="companyName"
          />
          <InputText
            label="Asegurado"
            width="500px"
            value={""}
            onChange={handleChangeName}
            type="text"
            disabled={true}
          />

          <ComboBox
            label="Estado del caso"
            width="342px"
            value={""}
            onChange={handleChangeState}
            placeHolder="Seleccione estado"
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
            <TableCell width="99px">N° Caso</TableCell>
            <TableCell width="189px">Cliente</TableCell>
            <TableCell width="279px">Asegurado/Beneficiaro</TableCell>
            <TableCell width="250px">Servicio</TableCell>
            <TableCell width="150px">Estado</TableCell>
            <TableCell width="90px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {cases?.map((data: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="99px" align="center">
                  {data.number}
                </TableCell>
                <TableCell width="189px" align="center">
                  {data.createddate}
                </TableCell>
                <TableCell width="279px" align="center">
                  {data.name + " " + data.paternallastname}
                </TableCell>
                <TableCell width="250px" align="center">
                  {data.product ? data.product : "Sin servicio asignado"}
                </TableCell>
                <TableCell width="150px" align="center">
                  {data.stage}
                </TableCell>
                <TableCell width="90px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() =>
                        handleViewCase(data.case_id, data.stage.toLowerCase())
                      }
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary color={cases?.length > 0 ? "blue" : "#959595"}>
            {cases?.length === 0
              ? "No hay casos"
              : cases?.length === 1
              ? "1 caso"
              : `${cases?.length} casos`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default CaseList;
