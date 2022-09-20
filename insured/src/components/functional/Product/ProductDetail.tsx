import { useEffect } from "react";

import InputText from "../../ui/InputText";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
} from "../../ui/Table";
import Loading from "../../ui/Loading";

import { getProduct, resetProduct } from "../../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import styles from "./Product.module.scss";

const ProductDetail = ({ id }: any) => {
  const dispatch = useAppDispatch();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { product } = useAppSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(resetProduct());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return product.id ? (
    <div className={styles.sectionContent}>
      <InputText
        id="txtProductName"
        label="Nombre"
        width={isDesktop ? "940px" : "100%"}
        value={product.name}
        onChange={() => {}}
        disabled={true}
      />
      {isDesktop ? (
        <Table width="940px" height="auto">
          <TableHeader>
            <TableCell width="270px">Servicio</TableCell>
            <TableCell width="160px">Monto</TableCell>
            <TableCell width="250px">Límite</TableCell>
            <TableCell width="70px" alt="Inicio de vigencia en díasx">
              Inicio
            </TableCell>
            <TableCell width="176px">Eventos</TableCell>
          </TableHeader>
          <TableDetail>
            {product.coverages.map((coverageItem: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="270px">{coverageItem.name}</TableCell>
                <TableCell width="160px" align="center">
                  {coverageItem.amount}
                </TableCell>
                <TableCell width="250px">{coverageItem.maximum}</TableCell>
                <TableCell width="70px" align="flex-end">
                  {coverageItem.lack}
                </TableCell>
                <TableCell width="170px" align="center">
                  {coverageItem.events}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
      ) : (
        <Table width="100%" height={`auto`}>
          <TableHeader>
            <TableCell width="100%">Cobertura</TableCell>
          </TableHeader>
          <TableDetail>
            {product.coverages.map((coverageItem: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="100%">
                  <div
                    style={{
                      width: "calc(100% - 120px)",
                      paddingRight: "10px",
                    }}
                  >
                    <b>{coverageItem.name}</b>
                  </div>
                  <div style={{ width: "120px" }}>
                    Monto: {coverageItem.amount}
                    <br />
                    Límite: {coverageItem.maximum}
                    <br />
                    Carencia: {coverageItem.lack}
                    <br />
                    Cant. eventos: {coverageItem.events}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default ProductDetail;
