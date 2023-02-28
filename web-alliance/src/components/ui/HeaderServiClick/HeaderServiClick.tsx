import Image from "next/image";

import styles from "./HeaderServiClick.module.scss";

import { useProduct, useUI } from "../../../hooks/store";

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
      </div>
    </div>
  );
};

export default HeaderServiClick;
