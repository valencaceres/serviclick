import Image from "next/image";

import styles from "./HeaderServiClick.module.scss";

import { useProduct, useUI, useSlug } from "../../../hooks/store";

const HeaderServiClick = ({ title }: any) => {
  const { product } = useProduct();
  const { slug } = useSlug();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <p>{slug.fantasyName}</p>
      </div>
      <div className={styles.right}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default HeaderServiClick;
