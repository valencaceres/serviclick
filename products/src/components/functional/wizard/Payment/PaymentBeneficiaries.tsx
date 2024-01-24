import { useMediaQuery } from "react-responsive";

import { Col } from "@/components/layout/Generic";
import {formatDate} from "@/utils/format"
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useEffect } from "react";
import { useProduct } from "@/store/hooks";

const PaymentBeneficiaries = ({ lead }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const { setProduct, product } = useProduct();

  return (
    <Col>
      {isDesktop ? (
        <Table height="auto">
          <TableHeader>
            <TableCell width="40px" align="center">{`#`}</TableCell>
            <TableCell width="110px">Rut</TableCell>
            <TableCell width="300px">Nombre Completo</TableCell>
            <TableCell width="100px">Nacimiento</TableCell>
            <TableCell width="130px">Parentesco</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {lead &&
              lead.insured &&
              lead.insured.length > 0 &&
              lead.insured[0].beneficiaries.length > 0 &&
              lead.insured[0].beneficiaries.map(
                (itemBeneficiary: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="40px" align="center">
                      {idx + 1}
                    </TableCell>
                    <TableCell width="110px" align="right">
                      {itemBeneficiary.rut}
                    </TableCell>
                    <TableCell width="300px">{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                    <TableCell width="100px">
                    {formatDate(itemBeneficiary.birthDate)}

                    </TableCell>
                    <TableCell width="130px">
                      {itemBeneficiary.relationship}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableDetail>
        </Table>
      ) : (
        <Table height="auto">
          <TableHeader>
            <TableCell width="320px">Nombre Completo</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {lead &&
              lead.insured &&
              lead.insured.length > 0 &&
              lead.insured[0].beneficiaries.length > 0 &&
              lead.insured[0].beneficiaries.map(
                (itemBeneficiary: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="320px">{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                  </TableRow>
                )
              )}
          </TableDetail>
        </Table>
      )}
    </Col>
  );
};

export default PaymentBeneficiaries;
