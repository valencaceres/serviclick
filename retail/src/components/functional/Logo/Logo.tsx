import styles from "./Logo.module.scss";

import { useUI } from "../../../hooks";
import { url } from "inspector";

const Logo = () => {
  const { retail } = useUI();

  return (
    <div
      className={styles.logo}
      style={{ backgroundImage: `url(${retail.logo})` }}></div>
  );
};

export default Logo;
