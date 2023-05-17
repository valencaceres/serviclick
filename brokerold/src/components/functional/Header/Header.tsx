import Image from "next/image";

import Logo from "../Logo";

import { useUI } from "../../../hooks";

import styles from "./Header.module.scss";

const Header = () => {
  const { title } = useUI();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {/* <Image alt="ServiClick" src="/logo.jpg" width={243} height={51} /> */}
        <div className={styles.logo}></div>
      </div>
      <div className={styles.center}>{title}</div>
      <div className={styles.right}>
        <Logo />
      </div>
    </div>
  );
};

export default Header;
