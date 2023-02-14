import Image from "next/image";

import styles from "./HeaderServiClick.module.scss";
import Badge from "../Badge";

import { currencyFormat } from "../../../utils/format";

import { useProduct } from "../../../hooks/store";

const HeaderServiClick = ({ title }: any) => {
  const { product } = useProduct();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Image
          alt="Logo ServiClick"
          src="/images/logos/serviclick.jpg"
          width={243}
          height={51}
        />
      </div>
      <div className={styles.right}>
        <h1>{title}</h1>
        <Badge>{currencyFormat(product?.plan.price || 0)}</Badge>
      </div>
    </div>
  );
};

export default HeaderServiClick;
