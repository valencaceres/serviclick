import { Screen, Content, Footer, Col, Row } from "../../../layout/Form";

import InfoText from "../../../ui/InfoText";
import Info from "../../../ui/Info/Info";

import { formatAmount } from "../../../../utils/format";

import styles from "./Payment.module.scss";

const PaymentProduct = ({ product, lead }: any) => {
  return (
    <Col width="500px">
      <Row>
        <InfoText
          label="Inicio de vigencia"
          width="170px"
          value={`DD/MM/YYYY`}
        />
        <InfoText label="Frecuencia" width="170px" value={product.frequency} />
        <InfoText
          label="Duracción"
          width="170px"
          value={`${product.term} meses`}
        />
      </Row>
      <Row>
        <InfoText
          label="Valor unitario ($)"
          width="170px"
          value={formatAmount(product.plan.price, "P")}
        />
        <InfoText
          label="Cantidad de beneficiarioss"
          width="170px"
          value={lead.insured.length}
        />
        <InfoText
          label="Valor a pagar ($)"
          width="170px"
          value={formatAmount(
            (product.plan.price * lead.insured.length).toString(),
            "P"
          )}
        />
      </Row>
      {/* {product.plan.discount.type === "t" ||
        (product.plan.discount.type === "p" && ( */}
      <Info
        iconName="redeem"
        text={`Tienes ${
          product.plan.discount.type === "t"
            ? product.plan.discount.cicles === 1
              ? "un mes gratis"
              : `${product.plan.discount.cicles} meses gratis`
            : `${product.plan.discount.percent}% de descuento por ${
                product.plan.discount.cicles === 1
                  ? "un mes"
                  : `${product.plan.discount.cicles} meses`
              }`
        }`}
      />
      {/* ))} */}
    </Col>
  );
};

export default PaymentProduct;
