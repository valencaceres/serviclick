import { Col } from "@/components/layout/Generic";

import ButtonMenu from "@/components/ui/ButtonMenu";

import styles from "./Payment.module.scss";

const PaymentType = ({ data }: any) => {
  return (
    <Col gap="10px">
      {data.map((item: any, idx: number) => (
        <ButtonMenu
          key={idx}
          iconName={item.iconName}
          text={item.text}
          description={item.description}
          onClick={item.onClick}
        />
      ))}
    </Col>
  );
};

export default PaymentType;
