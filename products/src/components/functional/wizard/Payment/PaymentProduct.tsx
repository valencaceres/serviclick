import { useMediaQuery } from "react-responsive";

import { useState, useEffect } from "react";

import { Col, Row } from "@/components/layout/Generic";

import InfoText from "@/components/ui/InfoText";
import Info from "@/components/ui/Info/Info";
import Button from "@/components/ui/Button";

import { formatAmount } from "@/utils/format";

import { calculateValidity } from "@/utils/functions";
import { IProduct } from "@/interfaces/product";
import { ILead } from "@/interfaces/lead";
import InputText from "@/components/ui/Input-ui-box";

import { config } from "@/utils/config";
import { useBin, useProduct } from "@/store/hooks";
import { Badge } from "lucide-react";

interface IPaymentProduct {
  product: IProduct;
  lead: ILead;
}

const PaymentProduct = ({ product, lead }: IPaymentProduct) => {
  const [binNumber, setBinNumber] = useState("");
  const { getById, bin, binIsLoading, binIsError } = useBin();
  const { setNewProduct } = useProduct();

  const binIsNumber = parseInt(binNumber);

  const isDesktop = useMediaQuery({ minWidth: 1200 });

  const frequency = {
    M: "Mensual",
    A: "Anual",
    S: "Semanal",
  };

  const handleBinNumberChange = (e: any) => {
    setBinNumber(e.target.value);
  };

  const handleClick = (number: number) => {
    getById(number);
  };

  const infoDate = (date: string | undefined) => {
    if (date) {
      const oDate = date.split("T")[0].split("-");
      return `${oDate[2]}-${oDate[1]}-${oDate[0]}`;
    }
    return "";
  };

  useEffect(() => {
    if (bin.bin > 0) {
      setNewProduct({
        plan: {
          ...product.plan,
          price: product.plan.price,
        },
      });
    }
  }, [bin]);

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
        {config.serviceId === product.plan.agentId ? (
          <InputText
            label="Valor unitario ($)"
            width="170px"
            disabled
            isCompleted={true}
            value={formatAmount(product.plan.baseprice.toString(), "P")}
          />
        ) : (
          <InputText
            label="Valor unitario ($)"
            width="170px"
            disabled
            isCompleted={true}
            value={formatAmount(product.plan.price.toString(), "P")}
          />
        )}
        <InputText
          label="Cantidad de beneficiarios"
          width="170px"
          disabled
          isCompleted={true}
          value={(lead?.insured[0]?.beneficiaries?.length || 0).toString()}
        />
        {config.serviceId === product.plan.agentId ? (
          <InputText
            label="Valor a pagar ($)"
            width="170px"
            disabled
            isCompleted={true}
            value={formatAmount(
              !isNaN(
                config.serviceId === product.plan.agentId
                  ? bin.bin > 0
                    ? (product?.plan?.price || 0) +
                      (lead?.insured[0]?.beneficiaries?.length || 0) *
                        (product?.plan?.beneficiary_price || 0)
                    : (product?.plan?.baseprice || 0) +
                      (lead?.insured[0]?.beneficiaries?.length || 0) *
                        (product?.plan?.beneficiary_price || 0)
                  : (product?.plan?.price || 0) +
                      (lead?.insured[0]?.beneficiaries?.length || 0) *
                        (product?.plan?.beneficiary_price || 0)
              )
                ? (config.serviceId === product.plan.agentId
                    ? bin.bin > 0
                      ? (product?.plan?.price || 0) +
                        (lead?.insured[0]?.beneficiaries?.length || 0) *
                          (product?.plan?.beneficiary_price || 0)
                      : (product?.plan?.baseprice || 0) +
                        (lead?.insured[0]?.beneficiaries?.length || 0) *
                          (product?.plan?.beneficiary_price || 0)
                    : (product?.plan?.price || 0) +
                      (lead?.insured[0]?.beneficiaries?.length || 0) *
                        (product?.plan?.beneficiary_price || 0)
                  ).toString()
                : (product?.plan?.price || 0).toString(),
              "P"
            )}
          />
        ) : (
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
        )}
      </Row>
      {config.serviceId === product.plan.agentId ? (
        <Row>
          <InputText
            label="Ingrese los 6 primeros dígitos de su tarjeta"
            onChange={handleBinNumberChange}
            value={binNumber}
            width="315px"
            disabled={bin.bin > 0}
          />
          {bin.bin === 0 ? (
            <Button
              onClick={() => {
                handleClick(binIsNumber);
              }}
              text="Verificar"
              width="200px"
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                backgroundColor: "green",
                color: "white",
                width: "200px",
                borderRadius: "20px",
              }}>
              Descuento aplicado
            </div>
          )}
          {binIsError ? "La verificacion fallo" : null}
        </Row>
      ) : null}
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
      {config.serviceId === product.plan.agentId ? (
        <InputText
          label="Valor unitario ($)"
          width="170px"
          disabled
          isCompleted={true}
          value={formatAmount(product.plan.baseprice.toString(), "P")}
        />
      ) : (
        <InputText
          label="Valor unitario ($)"
          width="170px"
          disabled
          isCompleted={true}
          value={formatAmount(product.plan.price.toString(), "P")}
        />
      )}
      <InputText
        label="Cantidad de beneficiarios"
        width="170px"
        disabled
        isCompleted={true}
        value={lead.insured.length.toString()}
      />
      {config.serviceId === product.plan.agentId ? (
        <InputText
          label="Valor a pagar ($)"
          width="170px"
          disabled
          isCompleted={true}
          value={formatAmount(
            !isNaN(
              config.serviceId === product.plan.agentId
                ? bin.bin > 0
                  ? (product?.plan?.price || 0) +
                    (lead?.insured[0]?.beneficiaries?.length || 0) *
                      (product?.plan?.beneficiary_price || 0)
                  : (product?.plan?.baseprice || 0) +
                    (lead?.insured[0]?.beneficiaries?.length || 0) *
                      (product?.plan?.beneficiary_price || 0)
                : (product?.plan?.price || 0) +
                    (lead?.insured[0]?.beneficiaries?.length || 0) *
                      (product?.plan?.beneficiary_price || 0)
            )
              ? (config.serviceId === product.plan.agentId
                  ? bin.bin > 0
                    ? (product?.plan?.price || 0) +
                      (lead?.insured[0]?.beneficiaries?.length || 0) *
                        (product?.plan?.beneficiary_price || 0)
                    : (product?.plan?.baseprice || 0) +
                      (lead?.insured[0]?.beneficiaries?.length || 0) *
                        (product?.plan?.beneficiary_price || 0)
                  : (product?.plan?.price || 0) +
                    (lead?.insured[0]?.beneficiaries?.length || 0) *
                      (product?.plan?.beneficiary_price || 0)
                ).toString()
              : (product?.plan?.price || 0).toString(),
            "P"
          )}
        />
      ) : (
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
      )}
      {config.serviceId === product.plan.agentId ? (
        <Col>
          <InputText
            label="Ingrese 6 primeros dígitos"
            onChange={handleBinNumberChange}
            value={binNumber}
            width="170px"
            disabled={bin.bin > 0}
          />
          {bin.bin === 0 ? (
            <Button
              onClick={() => {
                handleClick(binIsNumber);
              }}
              text="Verificar"
              width="170px"
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                backgroundColor: "green",
                color: "white",
                width: "170px",
                borderRadius: "20px",
              }}>
              Dcto. aplicado
            </div>
          )}
          {binIsError ? "La verificacion fallo" : null}
        </Col>
      ) : null}
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
