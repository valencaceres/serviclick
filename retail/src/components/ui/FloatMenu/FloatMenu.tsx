import ButtonIcon from "../ButtonIcon";

import styles from "./FloatMenu.module.scss";

import useUI from "../../../hooks/useUI";

const FloatMenu = ({ children }: any) => {
  const { options } = useUI();

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
