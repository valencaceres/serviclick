import { useState, Fragment, useEffect } from "react";

import { unFormatRut, formatRut } from "~/utils";

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
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";
import { useCase } from "~/store/hooks";
import { useRouter } from "next/router";
import { ComboBox } from "~/components/ui";

const CaseTable = ({
  caseList,
  setSelectedRetailValue,
  setSelectedStageValue,
  selectedRetailValue,
  selectedStageValue,
  setInputText,
  inputText,
  setInputRut,
  inputRut,
  handleClickRefresh,
}: any) => {
  const { getRetails, retailList, getStatus, statusList } = useCase();
  const router = useRouter();

  useEffect(() => {
    getStatus();
    getRetails();
  }, [, getRetails, getStatus]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const unformattedRut = unFormatRut(value);
    setInputRut(unformattedRut);
  };

  const handleBlur = (e: any) => {
    const value = e.target.value;

    const formattedRut = formatRut(value);
    setInputRut(formattedRut);
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <ComboBox
            id="retail_id"
            label="Empresa"
            value={selectedRetailValue}
            placeHolder=":: Seleccione empresa ::"
            onChange={(e: any) => setSelectedRetailValue(e.target.value)}
            data={retailList}
            dataValue={"id"}
            dataText={"name"}
            width="250px"
          />

          <InputText
            label="Rut"
            width="150px"
            value={inputRut}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={(e: any) => {
              setInputRut(e.target.value);
              setInputText("");
            }}
          />
          <InputText
            label="Beneficiario"
            width="370px"
            value={inputText}
            onChange={(e: any) => {
              setInputText(e.target.value);
              setInputRut("");
            }}
          />
          <ComboBox
            id="stage_id"
            label="Estado del caso"
            value={selectedStageValue}
            placeHolder=":: Seleccione estado ::"
            onChange={(e: any) => setSelectedStageValue(e.target.value)}
            data={statusList}
            dataValue={"id"}
            dataText={"name"}
            width="250px"
          />

          <ButtonIcon
            onClick={() => handleClickRefresh()}
            iconName="search"
            color="gray"
          />
        </ContentRow>
        <Table width="1100px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="200px">N° Caso</TableCell>
            <TableCell width="250px">Cliente</TableCell>
            <TableCell width="300px">Asegurado / Beneficiario</TableCell>
            <TableCell width="250px">Servicio</TableCell>
            <TableCell width="250px">Estado</TableCell>
          </TableHeader>
          <TableDetail>
            {caseList.map((caseItem: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell align="center" width="200px">
                  {caseItem.number}
                </TableCell>
                <TableCell width="250px">{caseItem.customer_name}</TableCell>
                <TableCell width="300px">{caseItem.applicant_name}</TableCell>
                <TableCell width="250px">{caseItem.assistance_name}</TableCell>
                <TableCell width="250px">
                  {caseItem.stage_name}
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() =>
                        router.push(
                          `/assistance/case/${caseItem.code}/${caseItem.id}`
                        )
                      }
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-start">
          <ContentCellSummary color={caseList?.length > 0 ? "blue" : "#959595"}>
            {caseList?.length === 0
              ? "No hay casos"
              : caseList?.length === 1
              ? "1 caso"
              : `${caseList?.length} casos`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default CaseTable;
