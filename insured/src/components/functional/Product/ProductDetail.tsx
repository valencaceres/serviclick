import { useEffect, useState } from "react";

import { Row, Col, Content } from "../../layout/Generic";

import InputText from "../../ui/InputText";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
} from "../../ui/Table";
import Loading from "../../ui/Loading";

import { useUI, useInsured } from "../../../zustand/hooks";

import { IProduct } from "../../../interfaces/insured";

import styles from "./Product.module.scss";

const ProductDetail = ({ id }: any) => {
  const { ui } = useUI();
  const { insuredProfile } = useInsured();

  const { products } = insuredProfile;

  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const productSearch: IProduct[] = products.filter((item) => item.id === id);

    if (productSearch && productSearch.length > 0) {
      setProduct(productSearch[0]);
    }
  }, []);

  return product && product.id ? (
    <Content>
      <Col gap="5px">
        <Col gap="5px">
          <InputText
            id="txtProductName"
            label="Nombre"
            width={ui.isDesktop ? "940px" : "100%"}
            value={product.name}
            onChange={() => {}}
            disabled={true}
          />
          {ui.isDesktop ? (
            <Row gap="80px">
              <InputText
                id="txtInitDate"
                type="date"
                label="Fecha Adquisición"
                width="140px"
                value={product.collection[0].incorporation}
                onChange={() => {}}
                disabled={true}
              />
              <Row gap="5px">
                <InputText
                  id="txtInitDate"
                  label="Valor mensual"
                  width="140px"
                  value={product.collection[0].fee_value.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Meses cobrados"
                  width="140px"
                  value={product.collection[0].fees_charged.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Total cobrado"
                  width="140px"
                  value={product.collection[0].charged.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Total pagado"
                  width="140px"
                  value={product.collection[0].paid.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Total adeudado"
                  width="140px"
                  value={product.collection[0].balance.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
              </Row>
            </Row>
          ) : (
            <Col gap="5px">
              <Row gap="5px">
                <InputText
                  id="txtInitDate"
                  type="date"
                  label="Fecha Adquisición"
                  width="100%"
                  value={product.collection[0].incorporation}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Valor mensual"
                  width="100%"
                  value={product.collection[0].fee_value.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
              </Row>
              <Row gap="5px">
                <InputText
                  id="txtInitDate"
                  label="Meses cobrados"
                  width="100%"
                  value={product.collection[0].fees_charged.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Total cobrado"
                  width="100%"
                  value={product.collection[0].charged.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
              </Row>
              <Row gap="5px">
                <InputText
                  id="txtInitDate"
                  label="Total pagado"
                  width="100%"
                  value={product.collection[0].paid.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
                <InputText
                  id="txtInitDate"
                  label="Total adeudado"
                  width="100%"
                  value={product.collection[0].balance.toString()}
                  onChange={() => {}}
                  disabled={true}
                />
              </Row>
            </Col>
          )}
          {ui.isDesktop ? (
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
                {product.assistances.map((coverageItem, idx: number) => (
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
                {product.assistances.map((coverageItem: any, idx: number) => (
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
        </Col>
        <Col gap="5px">
          {ui.isDesktop ? (
            <Table width="940px" height="auto">
              <TableHeader>
                <TableCell width="40px" align="center">{`#`}</TableCell>
                <TableCell width="130px">Rut</TableCell>
                <TableCell width="500px">Nombre Completo</TableCell>
                <TableCell width="120px">Nacimiento</TableCell>
                <TableCell width="130px">Parentesco</TableCell>
              </TableHeader>
              <TableDetail>
                {product.beneficiaries &&
                  product.beneficiaries &&
                  product.beneficiaries.map(
                    (itemBeneficiary: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell width="40px" align="center">
                          {idx + 1}
                        </TableCell>
                        <TableCell width="130px" align="right">
                          {itemBeneficiary.rut}
                        </TableCell>
                        <TableCell width="500px">{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                        <TableCell width="120px">
                          {itemBeneficiary.birthdate}
                        </TableCell>
                        <TableCell width="130px">
                          {itemBeneficiary.relationship}
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableDetail>
            </Table>
          ) : (
            <Table height="auto">
              <TableHeader>
                <TableCell width="320px">Nombre Completo</TableCell>
              </TableHeader>
              <TableDetail>
                {product.beneficiaries &&
                  product.beneficiaries &&
                  product.beneficiaries.map(
                    (itemBeneficiary: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell width="320px">{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                      </TableRow>
                    )
                  )}
              </TableDetail>
            </Table>
          )}
        </Col>
      </Col>
    </Content>
  ) : (
    <Loading />
  );
};

export default ProductDetail;
