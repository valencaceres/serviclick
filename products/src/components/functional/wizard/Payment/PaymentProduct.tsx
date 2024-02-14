import { useMediaQuery } from "react-responsive";

import { Col, Row } from "@/components/layout/Generic";

import InfoText from "@/components/ui/InfoText";
import Info from "@/components/ui/Info/Info";

import { formatAmount } from "@/utils/format";

import { calculateValidity } from "@/utils/functions";
import { IProduct } from "@/interfaces/product";
import { ILead } from "@/interfaces/lead";
import InputText from "@/components/ui/Input-ui-box";
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

  const infoDate = (date: string | undefined) => {
    if (date) {
      const oDate = date.split("T")[0].split("-");
      return `${oDate[2]}-${oDate[1]}-${oDate[0]}`;
    }
    return "";
  };

  return lead && lead.insured && lead.insured.length > 0 && isDesktop ? (
    <Col width="712px" align="center">
      <Row>
        <InputText
          disabled
          isCompleted={true}
          label="Inicio de vigencia"
          width="170px"
          value={infoDate(calculateValidity(product.assistances))}
        />
        <InputText
          disabled
          isCompleted={true}
          label="Frecuencia"
          width="170px"
          value={product.frequency}
        />
        <InputText
          label="Duracción"
          width="170px"
          disabled
          isCompleted={true}
          value={`${product.term} meses`}
        />
      </Row>
      <Row>
        <InputText
          label="Valor unitario ($)"
          width="170px"
          disabled
          isCompleted={true}
          value={formatAmount(product.plan.price.toString(), "P")}
        />
        <InputText
          label="Cantidad de beneficiarios"
          width="170px"
          disabled
          isCompleted={true}
          value={(lead?.insured[0]?.beneficiaries?.length || 0).toString()}
        />
        <InputText
          label="Valor a pagar ($)"
          width="170px"
          disabled
          isCompleted={true}
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
      <InputText
        label="Inicio de vigencia"
        width="170px"
        disabled
        isCompleted={true}
        value={infoDate(calculateValidity(product.assistances))}
      />
      <InputText
        label="Frecuencia"
        width="170px"
        disabled
        isCompleted={true}
        value={frequency[product.frequency]}
      />
      <InputText
        label="Duracción"
        width="170px"
        disabled
        isCompleted={true}
        value={`${product.term} meses`}
      />
      <InputText
        label="Valor unitario ($)"
        width="170px"
        disabled
        isCompleted={true}
        value={formatAmount(product.plan.price.toString(), "P")}
      />
      <InputText
        label="Cantidad de beneficiarios"
        width="170px"
        disabled
        isCompleted={true}
        value={lead.insured.length.toString()}
      />
      <InputText
        label="Valor a pagar ($)"
        width="170px"
        disabled
        isCompleted={true}
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
