import styles from "./ButtonLink.module.scss";

import Icon from "../Icon";

type ButtonLinkT = {
  onClick?: any;
  disabled?: boolean;
  children: any;
};

const ButtonLink = ({ onClick, disabled = false, children }: ButtonLinkT) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonLink;
