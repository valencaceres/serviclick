import { Col, Row } from "@/components/layout/Generic";
import { useMediaQuery } from "react-responsive";

import InfoText from "@/components/ui/InfoText/InfoText";

const PaymentInsured = ({ data }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  const infoDate = (date: string) => {
    if (date) {
      const oDate = date.split("T")[0].split("-");
      return `${oDate[2]}-${oDate[1]}-${oDate[0]}`;
    }
  };

  return (
    <Col width={isDesktop ? "340px" : "300px"}>
      <Row align="space-between">
        <InfoText label="Rut" width="150px" value={data?.rut} />
        <InfoText
          label="Fecha nacimiento"
          width="150px"
          value={infoDate(data?.birthDate)}
        />
      </Row>
      <InfoText label="Nombres" value={data?.name} />
      <InfoText label="Apellido paterno" value={data?.paternalLastName} />
      <InfoText label="Apellido materno" value={data?.maternalLastName} />
      <InfoText label="Dirección" value={data?.address} />
      <InfoText label="Comuna" value={data?.district} />
      <InfoText label="Correo electrónico" value={data?.email} />
      <InfoText label="Teléfono" value={data?.phone} />
    </Col>
  );
};

export default PaymentInsured;
