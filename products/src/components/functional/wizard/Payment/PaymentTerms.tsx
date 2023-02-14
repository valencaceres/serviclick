import { Row } from "../../../layout/Generic";

import styles from "./Payment.module.scss";

const PaymentTerms = ({ state, onClick }: any) => {
  return (
    <Row align="center">
      <p className={styles.terms}>
        <input type="checkbox" onChange={(e: any) => state(e.target.checked)} />
        Acepta nuestros <a onClick={onClick}>Términos y Condiciones</a>
      </p>
    </Row>
  );
};

export default PaymentTerms;
