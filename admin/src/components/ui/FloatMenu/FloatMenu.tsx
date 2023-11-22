import ButtonIcon from "../ButtonIcon";

import styles from "./FloatMenu.module.scss";

const FloatMenu = ({ children }: any) => {
  return (
    <div className={styles.floatMenu}>
      {children}
      {/* {options.map((option: any, idx: number) => (
        <ButtonIcon
          key={idx}
          iconName={option.icon}
          onClick={option.function}
          disabled={!option.enabled}
        />
      ))} */}
    </div>
  );
};

export default FloatMenu;
