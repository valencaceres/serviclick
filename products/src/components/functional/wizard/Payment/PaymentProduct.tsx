import { useMediaQuery } from "react-responsive";

import { Col, Row } from "@/components/layout/Generic";

import InfoText from "@/components/ui/InfoText";
import Info from "@/components/ui/Info/Info";

import { formatAmount } from "@/utils/format";

import { calculateValidity } from "@/utils/functions";
import { IProduct } from "@/interfaces/product";
import { ILead } from "@/interfaces/lead";
interface IPaymentProduct {
  product: IProduct;
  lead: ILead;
}

const PaymentProduct = ({ product, lead }: IPaymentProduct) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  const frequency = {
    M: "Mensual",
    A: "Anual",
    S: "Semanal",
  };

  const infoDate = (date: string) => {
    if (date) {
      const oDate = date.split("-");
      return `${oDate[2]}-${oDate[1]}-${oDate[0]}`;
    }
  };
  return lead && lead.insured && lead.insured.length > 0 && isDesktop ? (
    <Col width="712px" align="center">
      <Row>
        <InfoText
          label="Inicio de vigencia"
          width="170px"
          value={infoDate(calculateValidity(product.assistances))}
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
          value={formatAmount(product.plan.price.toString(), "P")}
        />
        <InfoText
          label="Cantidad de beneficiarios"
          width="170px"
          value={lead?.insured[0]?.beneficiaries?.length || 0}
        />
        <InfoText
          label="Valor a pagar ($)"
          width="170px"
          value={formatAmount(
            !isNaN(
              (product?.plan?.price || 0) +
                (lead?.insured[0]?.beneficiaries?.length || 0) *
                  (product?.plan?.beneficiary_price || 0)
            )
              ? (
                  (product?.plan?.price || 0) +
                  (lead?.insured[0]?.beneficiaries?.length || 0) *
                    (product?.plan?.beneficiary_price || 0)
                ).toString()
              : (product?.plan?.price || 0).toString(),
            "P"
          )}
        />
      </Row>
      {(product.plan.discount.type === String("t") ||
        product.plan.discount.type === String("p")) && (
        <Info
          iconName="redeem"
          text={`Tienes ${
            product.plan.discount.type === String("t")
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
      )}
    </Col>
  ) : (
    <Col width="300px" align="center">
      <InfoText
        label="Inicio de vigencia"
        width="170px"
        value={infoDate(calculateValidity(product.assistances))}
      />
      <InfoText
        label="Frecuencia"
        width="170px"
        value={frequency[product.frequency]}
      />
      <InfoText
        label="Duracción"
        width="170px"
        value={`${product.term} meses`}
      />
      <InfoText
        label="Valor unitario ($)"
        width="170px"
        value={formatAmount(product.plan.price.toString(), "P")}
      />
      <InfoText
        label="Cantidad de beneficiarios"
        width="170px"
        value={lead.insured.length}
      />
      <InfoText
        label="Valor a pagar ($)"
        width="170px"
        value={formatAmount(
          !isNaN(
            (product?.plan?.price || 0) +
              (lead?.insured[0]?.beneficiaries?.length || 0) *
                (product?.plan?.beneficiary_price || 0)
          )
            ? (
                (product?.plan?.price || 0) +
                (lead?.insured[0]?.beneficiaries?.length || 0) *
                  (product?.plan?.beneficiary_price || 0)
              ).toString()
            : (product?.plan?.price || 0).toString(),
          "P"
        )}
      />
      {(product.plan.discount.type === String("t") ||
        product.plan.discount.type === String("p")) && (
        <Info
          iconName="redeem"
          text={`Tienes ${
            product.plan.discount.type === String("t")
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
      )}
    </Col>
  );
};

export default PaymentProduct;
