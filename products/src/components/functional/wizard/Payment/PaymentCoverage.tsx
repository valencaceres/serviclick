import { Col, Row } from "@/components/layout/Generic";
import { useMediaQuery } from "react-responsive";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table-ui";
import InfoText from "@/components/ui/InfoText";

import { formatAmount } from "@/utils/format";
import { useLead } from "@/store/hooks";
import InputText from "@/components/ui/Input-ui-box";
const PaymentCoverage = ({ product }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const { lead } = useLead();

  return isDesktop ? (
    <Col>
      <InputText
        disabled
        isCompleted={true}
        label="Nombre del producto"
        value={product.name}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell
              className="text-center border-r border-b border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="251px"
            >
              Servicio
            </TableCell>
            <TableCell
              className="text-center border border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="100px"
            >
              Monto
            </TableCell>
            <TableCell
              className="text-center border border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="150px"
            >
              Límite
            </TableCell>
            <TableCell
              className="text-center border border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="90px"
            >
              Eventos
            </TableCell>
            <TableCell
              className="text-center border-l border-b border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="100px"
            >
              Carencia
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product &&
            product.assistances.map((item: any, idx: number) => (
              <TableRow
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-sky-100 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                    : "bg-slate-100 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                }
              >
                <TableCell
                  align="left"
                  className="border border-white h-12"
                  width="251px"
                >
                  {item.name}
                </TableCell>
                <TableCell
                  align="center"
                  className="border border-white h-12"
                  width="100px"
                >
                  {formatAmount(item.amount, item.currency)}
                </TableCell>
                <TableCell
                  align="center"
                  className="border border-white h-12"
                  width="150px"
                >
                  {item.maximum}
                </TableCell>
                <TableCell
                  align="center"
                  className="border border-white h-12"
                  width="90px"
                >
                  {item.events + (lead?.insured[0]?.beneficiaries?.length || 0)}
                </TableCell>
                <TableCell
                  align="center"
                  className="border border-white h-12"
                  width="100px"
                >
                  {item.lack}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell
              className="text-center border border-gray-400 h-12 bg-gray-200 text-black font-bold"
              width="290px"
            >
              Servicio
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product &&
            product.assistances.map((item: any, idx: number) => (
              <TableRow
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-sky-100 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                    : "bg-slate-100 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                }
              >
                <TableCell
                  align="left"
                  className="border border-white h-12"
                  width="290px"
                >
                  <div className="text-sm font-bold">{item.name}</div>
                  {item.maximum !== "" && (
                    <div className="text-xs">{item.maximum}</div>
                  )}
                  {item.amount > 0 && (
                    <div className="text-xs">
                      {formatAmount(item.amount, item.currency)}
                    </div>
                  )}
                  <div className="text-xs">
                    {item.events === 0
                      ? "Ilimitados"
                      : `${
                          item.events +
                          (lead?.insured[0]?.beneficiaries?.length || 0)
                        } eventos en el año`}
                    {" ("}
                    {item.lack}
                    {" días carencia)"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
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
