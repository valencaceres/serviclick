import Image from "next/image";

import ButtonIcon from "../../ui/ButtonIcon";

import useUI from "../../../hooks/useUI";

import styles from "./Header.module.scss";

const Header = () => {
  const { setShowMenuUI, showMenu, title, user } = useUI();

  const handleToggleMenu = () => {
    setShowMenuUI(!showMenu);
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {user.rut !== "" && (
          <ButtonIcon iconName="menu" onClick={handleToggleMenu} />
        )}
        <Image alt="ServiClick" src="/logo.jpg" width={243} height={51} />
      </div>
      <div className={styles.right}>{title}</div>
    </div>
  );
};

export default Header;
