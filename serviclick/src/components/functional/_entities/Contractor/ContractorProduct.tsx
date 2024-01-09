import { useEffect, Fragment } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import ComboBox from "../../../ui/ComboBox";
import InputText from "../../../ui/InputText/InputText";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";

import { formatAmount } from "../../../../utils/format";
import { IContractorData } from "~/interfaces/customer";
import { useCustomer, useUser } from "~/store/hooks";
import { useRouter } from "next/router";
const ContractorProduct: React.FC<{ contractor: IContractorData }> = ({
  contractor,
}) => {
  const { selectProduct, product } = useCustomer();
  const router = useRouter();
  const { usersList, getUsers, resetUserLists } = useUser();
  const handleChangeProduct = (e: any) => {
    const existingProduct = contractor.origins.find(
      (item: any) => item?.product?.id === e.target.value
    );
    if (existingProduct) {
      selectProduct(existingProduct);
    }
  };

  useEffect(() => {
    resetUserLists();
    if (product?.lead_user !== null) {
      getUsers([product?.lead_user]);
    }
  }, [product?.lead_user]);

  const userFullName = `${usersList?.data[0]?.first_name} ${usersList?.data[0]?.last_name}`;
  return (
    <Fragment>
      <ContentRow gap="5px">
        <InputText
          label="Empresa"
          type="text"
          disabled={true}
          width="100%"
          maxLength={9}
          value={product?.name}
          onChange={() => {}}
          isValid={true}
        />
        {usersList?.data[0]?.first_name && (
          <InputText
            label="Usuario vendedor"
            type="text"
            disabled={true}
            width="100%"
            maxLength={9}
            value={userFullName}
            onChange={() => {}}
            isValid={true}
          />
        )}
      </ContentRow>
      <ContentRow gap="5px">
        <ComboBox
          label="Producto"
          width="100%"
          value={product?.product?.id}
          onChange={handleChangeProduct}
          data={contractor?.origins}
          dataValue="product.id"
          dataText="product.name"
        />

        <InputText
          label="Adquisición"
          type="date"
          disabled={true}
          width="150px"
          maxLength={9}
          value={product?.dates?.purchase}
          onChange={() => {}}
          isValid={true}
        />
        <InputText
          label="Inicio vigencia"
          type="date"
          disabled={true}
          width="150px"
          maxLength={9}
          value={product?.dates?.init}
          onChange={() => {}}
          isValid={true}
        />
      </ContentRow>
      <Table width="855px" height="390px">
        <TableHeader>
          <TableCell width="320px">Servicio</TableCell>
          <TableCell width="100px">Monto</TableCell>
          <TableCell width="244px">Límite</TableCell>
          <TableCell width="80px">Eventos</TableCell>
          <TableCell width="90px">Carencia</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {product?.product?.assistances?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell width="320px">{item?.name}</TableCell>
              <TableCell width="100px" align="center">
                {formatAmount(item?.amount?.toString(), item?.currency)}
              </TableCell>
              <TableCell width="244px" align="center">
                {item?.maximum}
              </TableCell>
              <TableCell width="80px" align="center">{`${
                item?.events === 0 ? "Ilimitado" : item?.events
              }`}</TableCell>
              <TableCell width="90px" align="center">
                {item?.lack}
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={product?.product?.assistances?.length > 0 ? "blue" : "#959595"}
        >
          {product?.product?.assistances?.length > 0
            ? product?.product?.assistances?.length === 1
              ? `${product?.product?.assistances?.length} servicio`
              : `${product?.product?.assistances?.length} servicios`
            : `No hay servicios`}
        </ContentCellSummary>
      </ContentRow>
    </Fragment>
  );
};

export default ContractorProduct;
