import { Col, Row } from "@/components/layout/Generic";
import { useMediaQuery } from "react-responsive";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import InfoText from "@/components/ui/InfoText";

import { formatAmount } from "@/utils/format";
import { useLead } from "@/store/hooks";
const PaymentCoverage = ({ product }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const { lead } = useLead();

  return isDesktop ? (
    <Col>
      <InfoText label="Nombre del producto" value={product.name} />
      <Table height="auto">
        <TableHeader>
          <TableCell width="251px">Servicio</TableCell>
          <TableCell width="100px">Monto</TableCell>
          <TableCell width="150px">Límite</TableCell>
          <TableCell width="90px">Eventos</TableCell>
          <TableCell width="100px">Carencia</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {product &&
            product.assistances.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell align="left" width="251px">
                  {item.name}
                </TableCell>
                <TableCell align="center" width="100px">
                  {formatAmount(item.amount, item.currency)}
                </TableCell>
                <TableCell align="center" width="150px">
                  {item.maximum}
                </TableCell>
                <TableCell align="center" width="90px">
                  {item.events + (lead?.insured[0]?.beneficiaries?.length || 0)}
                </TableCell>
                <TableCell align="center" width="100px">
                  {item.lack}
                </TableCell>
              </TableRow>
            ))}
        </TableDetail>
      </Table>
      <p style={{ maxWidth: "700px", textAlign: "center" }}>
        Al agregar cargas a su plan de asistencia, se efectuará un aumento de
        una unidad en el límite máximo de eventos anuales por cada carga
        agregada, según lo estipulado en el presente contrato.
      </p>
    </Col>
  ) : (
    <Col>
      <InfoText label="Nombre del producto" value={product.name} />
      <Table height="auto">
        <TableHeader>
          <TableCell width="290px">Servicio</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {product &&
            product.assistances.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell align="left" width="290px">
                  {item.name}
                  {item.maximum !== "" && <br />}
                  {item.maximum !== "" && item.maximum}
                  {item.amount > 0 && <br />}
                  {item.amount > 0 && formatAmount(item.amount, item.currency)}
                  <br />
                  {item.events === 0 ? (
                    "Ilimitados"
                  ) : (
                    <>
                      {item.events +
                        (lead?.insured[0]?.beneficiaries?.length || 0)}{" "}
                      eventos en el año
                    </>
                  )}
                  {" ("}
                  {item.lack}
                  {" días carencia)"}
                </TableCell>
              </TableRow>
            ))}
        </TableDetail>
      </Table>
      <p style={{ maxWidth: "300px", textAlign: "center" }}>
        Al agregar cargas a su plan de asistencia, se efectuará un aumento de
        una unidad en el límite máximo de eventos anuales por cada carga
        agregada, según lo estipulado en el presente contrato.
      </p>
    </Col>
  );
};

export default PaymentCoverage;
