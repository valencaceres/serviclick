import ButtonIcon from "../ButtonIcon";

import styles from "./FloatMenu.module.scss";

const FloatMenu = ({ options }: any) => {
  return (
    <div className={styles.floatMenu}>
      {options.map((option: any, idx: number) => (
        <ButtonIcon
          key={idx}
          iconName={option.icon}
          onClick={option.function}
        />
      ))}
    </div>
  );
};

export default FloatMenu;
