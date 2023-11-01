import { useState, Fragment, useEffect } from "react";

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
import { useCase, useStage, useRetails } from "~/store/hooks";
import { useRouter } from "next/router";
import { ComboBox } from "~/components/ui";

const CaseTable = ({ setShowModal, showModal }: any) => {
  const { getAll, caseList } = useCase();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { getAll: getAllStages, stageList } = useStage();
  const { getAll: getAllRetails, retailList } = useRetails();
  const [selectedRetailValue, setSelectedRetailValue] = useState("");
  const [selectedStageValue, setSelectedStageValue] = useState("");

  useEffect(() => {
    getAll("", "", "", "");
    getAllRetails();
    getAllStages();
  }, [getAll, getAllStages, getAllRetails]);
  console.log(selectedRetailValue);
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
            dataValue={"retail_id"}
            dataText={"retail_id"}
            width="250px"
          />

          <InputText
            label="Rut"
            width="150px"
            value={search}
            onChange={setSearch}
          />
          <InputText
            label="Beneficiario"
            width="280px"
            value={search}
            onChange={setSearch}
          />
          <ComboBox
            id="stage_id"
            label="Estado del caso"
            value={selectedStageValue}
            placeHolder=":: Seleccione estado ::"
            onChange={(e: any) => setSelectedStageValue(e.target.value)}
            data={stageList}
            dataValue={"stage_id"}
            dataText={"stage_id"}
            width="250px"
          />

          <ButtonIcon iconName="search" color="gray" />
        </ContentRow>
        <Table width="1000px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="200px">N° Caso</TableCell>
            <TableCell width="250px">Cliente</TableCell>
            <TableCell width="250px">Asegurado / Beneficiario</TableCell>
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
                <TableCell width="250px">{caseItem.applicant_name}</TableCell>
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
