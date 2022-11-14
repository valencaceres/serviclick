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

import { useAppSelector } from "../../../redux/hooks";
import { useProduct } from "../../../redux/hooks";

import styles from "./Product.module.scss";

const ProductDetail = ({ id }: any) => {
  const { product, resetProduct } = useProduct();

  const { isDesktop } = useAppSelector((state) => state.uiSlice);
  const { products } = useAppSelector((state) => state.companySlice);

  const frequency = {
    M: "Mensual",
    A: "Anual",
    S: "Semanal",
  };

  useEffect(() => {
    resetProduct();
  }, []);

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
      <div className={styles.values}>
        <InputText
          id="txtProductCompanyPriceUnitary"
          label="Valor unitario ($)"
          width="100%"
          value={product.price["company"]
            .toLocaleString("en-US")
            .replace(",", ".")}
          disabled={true}
        />
        <InputText
          id="txtProductCompanyInsured"
          label="Cantidad asegurados"
          width="100%"
          value={products
            .filter((item) => item.id === product.id)[0]
            .insured.length.toString()}
          disabled={true}
        />
        <InputText
          id="txtProductCompanyPriceTotal"
          label="Valor Total ($)"
          width="100%"
          value={(
            product.price["company"] *
            products.filter((item) => item.id === product.id)[0].insured.length
          )
            .toLocaleString("en-US")
            .replace(",", ".")}
          disabled={true}
        />
        <InputText
          id="txtProductCompanyFrequency"
          label="Frecuencia"
          width="100%"
          value={frequency[product.frequency]}
          disabled={true}
        />
      </div>
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
                    }}>
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
