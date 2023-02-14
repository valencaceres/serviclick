import { Content, Footer, Col, Row } from "../../../layout/Generic";

import InfoText from "../../../ui/InfoText/InfoText";

const PaymentInsured = ({ data }: any) => {
  return (
    <Col width="340px">
      <Row align="space-between">
        <InfoText label="Rut" width="150px" value={data?.rut} />
        <InfoText
          label="Fecha nacimiento"
          width="150px"
          value={data?.birthDate}
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
