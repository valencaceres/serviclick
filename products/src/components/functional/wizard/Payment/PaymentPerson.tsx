import { Col, Row } from "../../../layout/Generic";
import { useMediaQuery } from "react-responsive";

import InfoText from "../../../ui/InfoText";

const PaymentPerson = ({ data }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return (
    <Col width={isDesktop ? "340px" : "300px"}>
      <Row align="space-between">
        <InfoText label="Rut" width="150px" value={data?.rut} />
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

export default PaymentPerson;
