import { Col, Row } from "@/components/layout/Generic";
import { useMediaQuery } from "react-responsive";
import { formatDate } from "@/utils/format";
import InputText from "@/components/ui/Input-ui-box";

const PaymentInsured = ({ data }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return (
    <Col width={isDesktop ? "340px" : "300px"}>
      <Row align="space-between">
        <InputText
          disabled
          isCompleted={true}
          label="Rut"
          width="150px"
          value={data?.rut}
        />
        <InputText
          disabled
          isCompleted={true}
          label="Fecha nacimiento"
          width="150px"
          value={formatDate(data?.birthDate)}
        />
      </Row>
      <InputText
        disabled
        isCompleted={true}
        label="Nombres"
        value={data?.name}
      />
      <InputText
        disabled
        isCompleted={true}
        label="Apellido paterno"
        value={data?.paternalLastName}
      />
      <InputText
        disabled
        isCompleted={true}
        label="Apellido materno"
        value={data?.maternalLastName}
      />
      <InputText
        disabled
        isCompleted={true}
        label="Dirección"
        value={data?.address}
      />
      <InputText
        disabled
        isCompleted={true}
        label="Comuna"
        value={data?.district}
      />
      <InputText
        disabled
        isCompleted={true}
        label="Correo electrónico"
        value={data?.email}
      />
      <InputText
        disabled
        isCompleted={true}
        label="Teléfono"
        value={data?.phone}
      />
    </Col>
  );
};

export default PaymentInsured;
