import { useMediaQuery } from "react-responsive";

import { Col } from "@/components/layout/Generic";
import { formatDate } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table-ui";
import { useEffect } from "react";
import { useProduct } from "@/store/hooks";

const PaymentBeneficiaries = ({ lead }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const { setProduct, product } = useProduct();

  return (
    <Col>
      {isDesktop ? (
        <Table>
          <TableHeader>
            <TableCell
              className="text-center border-r border-b border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="40px"
              align="center"
            >{`#`}</TableCell>
            <TableCell
              className="text-center border border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="110px"
            >
              Rut
            </TableCell>
            <TableCell
              className="text-center border border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="300px"
            >
              Nombre Completo
            </TableCell>
            <TableCell
              className="text-center border border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="100px"
            >
              Nacimiento
            </TableCell>
            <TableCell
              className="text-center border-l border-b border-white h-12 bg-gray-200  text-gray-600 font-bold"
              width="130px"
            >
              Parentesco
            </TableCell>
          </TableHeader>
          <TableBody>
            {lead &&
              lead.insured &&
              lead.insured.length > 0 &&
              lead.insured[0].beneficiaries.length > 0 &&
              lead.insured[0].beneficiaries.map(
                (itemBeneficiary: any, idx: number) => (
                  <TableRow
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-sky-100 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                        : "bg-slate-100 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                    }
                  >
                    <TableCell
                      className="border border-white h-12"
                      width="40px"
                      align="center"
                    >
                      {idx + 1}
                    </TableCell>
                    <TableCell
                      className="border border-white h-12"
                      width="110px"
                      align="right"
                    >
                      {itemBeneficiary.rut}
                    </TableCell>
                    <TableCell
                      className="border border-white h-12"
                      width="300px"
                    >{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                    <TableCell
                      className="border border-white h-12"
                      width="100px"
                    >
                      {formatDate(itemBeneficiary.birthDate)}
                    </TableCell>
                    <TableCell
                      className="border border-white h-12"
                      width="130px"
                    >
                      {itemBeneficiary.relationship}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableCell
              className="text-center border border-gray-400 h-12 bg-gray-200 text-black font-bold"
              width="320px"
            >
              Nombre Completo
            </TableCell>
          </TableHeader>
          <TableBody>
            {lead &&
              lead.insured &&
              lead.insured.length > 0 &&
              lead.insured[0].beneficiaries.length > 0 &&
              lead.insured[0].beneficiaries.map(
                (itemBeneficiary: any, idx: number) => (
                  <TableRow
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-sky-100 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                        : "bg-slate-100 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                    }
                  >
                    <TableCell
                      className="border border-white h-12"
                      width="320px"
                    >{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      )}
    </Col>
  );
};

export default PaymentBeneficiaries;
