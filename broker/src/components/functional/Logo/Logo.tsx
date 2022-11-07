import styles from "./Logo.module.scss";

import { useUI } from "../../../hooks";
import { url } from "inspector";

const Logo = () => {
  const { broker } = useUI();

  return (
    <div
      className={styles.logo}
      style={{ backgroundImage: `url(${broker.logo})` }}></div>
  );
};

export default Logo;
