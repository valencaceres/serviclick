import { useMediaQuery } from "react-responsive";

import { Row } from "@/components/layout/Generic";

import styles from "./Payment.module.scss";

const PaymentTerms = ({ state, onClick }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return (
    <Row align="center" width="100%">
      <p className="flex justify-center items-center gap-5 mt-0 text-base font-semibold text-gray-600">
        <input type="checkbox" onChange={(e: any) => state(e.target.checked)} />
        Acepta nuestros{" "}
        <a onClick={onClick} className="text-base">
          Términos y Condiciones
        </a>
      </p>
    </Row>
  );
};

export default PaymentTerms;
