import Image from "next/image";

import useUI from "../../../hooks/useUI";

import styles from "./HeaderServiClick.module.scss";

const HeaderServiClick = ({ title }: any) => {
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
      <div className={styles.right}>{title}</div>
    </div>
  );
};

export default HeaderServiClick;
