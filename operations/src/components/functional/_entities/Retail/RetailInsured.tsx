import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";
import Button from "../../../ui/Button";

import { dbDateToText } from "../../../../utils/date";

import { useRetail } from "../../../../hooks";

import { LoadingMessage } from "~/components/ui/LoadingMessage";
import ModalWindow from "~/components/ui/ModalWindow";
import InputText from "~/components/ui/InputText";

const RetailInsured = () => {
  const router = useRouter();

  const {
    retail,
    retailProductCustomers,
    retailSelectedProduct,
    uploadExcel,
    retailLoading,
  } = useRetail();

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const handleFileChange = (e: any) => {
    setIsFileDialogOpen(false);

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", file?.name);
    formData.append("retail_id", retail?.id);
    formData.append(
      "productPlan_id",
      retailSelectedProduct?.productplan_id || ""
    );

    uploadExcel(formData);
    router.push("/uploads-insured");
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px">
          <InputText
            label="Producto"
            width="100%"
            disabled={true}
            value={retailSelectedProduct?.name || ""}
          />
        </ContentRow>
        <Table width="855px" height="390px">
          <TableHeader>
            <TableCell width="60px">#</TableCell>
            <TableCell width="120px">Rut</TableCell>
            <TableCell width="536px">Nombre completo</TableCell>
            <TableCell width="120px">Inicio</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {retailProductCustomers.map((item, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="60px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="120px" align="right">
                  {item.customer_rut}
                </TableCell>
                <TableCell width="536px">
                  {item.customer_name +
                    " " +
                    item.customer_paternalLastName +
                    " " +
                    item.customer_maternalLastName}
                </TableCell>
                <TableCell width="120px" align="center">
                  {dbDateToText(item.initialDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="space-between">
          <ContentRow gap="5px">
            <ContentCellSummary
              color={retailProductCustomers?.length > 0 ? "blue" : "#959595"}
            >
              {retailProductCustomers?.length > 0
                ? retailProductCustomers?.length === 1
                  ? `${retailProductCustomers?.length} beneficiario`
                  : `${retailProductCustomers?.length} beneficiarios`
                : `No hay beneficiarios`}
            </ContentCellSummary>
          </ContentRow>
          <Button
            text="Carga masiva"
            onClick={() => setIsFileDialogOpen(true)}
          />
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={retailLoading} />
      <ModalWindow
        showModal={isFileDialogOpen}
        setClosed={() => setIsFileDialogOpen(false)}
        title="Carga masiva"
      >
        <ContentCell gap="5px">
          <ContentRow gap="5px">
            <input type="file" onChange={handleFileChange} />
          </ContentRow>
        </ContentCell>
      </ModalWindow>
    </Fragment>
  );
};

export default RetailInsured;
