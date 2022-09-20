import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon, { icons } from "../../ui/Icon";

import styles from "./Menu.module.scss";

const menu = [
  { id: 1, icon: icons.faHome, text: "Inicio" },
  {
    id: 2,
    icon: icons.faCog,
    text: "Maestros",
    subOptions: [
      { id: 1, text: "Canales", route: "/masters/channels" },
      { id: 2, text: "Familias", route: "/masters/families" },
      { id: 4, text: "Productos", route: "/masters/products" },
    ],
  },
  { id: 3, icon: icons.faCarSide, text: "Procesos" },
  { id: 4, icon: icons.faFileInvoiceDollar, text: "Reportes" },
];

const Menu = ({ show, setShowMenu }: any) => {
  const [optionSelected, setOptionSelected] = useState(0);

  return (
    <div className={styles.menu + " " + styles[show ? "show" : "hide"]}>
      {menu.map((item: any, idx: number) => (
        <MenuOption
          key={idx}
          iconName={item.icon}
          id={item.id}
          text={item.text}
          className={
            styles.menuOption +
            (item.id === optionSelected ? " " + styles.selected : "")
          }
          subOptions={item.subOptions}
          setOptionSelected={setOptionSelected}
          setShowMenu={setShowMenu}
        />
      ))}
    </div>
  );
};

const MenuOption = ({
  iconName,
  id,
  text,
  subOptions,
  className,
  setOptionSelected,
  setShowMenu,
}: any) => {
  const [showSubOptions, setShowSubOptions] = useState(false);

  const displaySubOptions = () => {
    setOptionSelected(id);
    if (subOptions) {
      setShowSubOptions(!showSubOptions);
    }
  };

  return (
    <div className={className} onClick={displaySubOptions}>
      <div className={styles.option} onClick={displaySubOptions}>
        <div className={styles.left}>
          <Icon iconName={iconName} className={styles.icon} />
          <p>{text}</p>
        </div>
        {subOptions && (
          <Icon iconName={icons.faChevronRight} className={styles.iconArrow} />
        )}
      </div>
      {subOptions && (
        <SubOptions
          subOptions={subOptions}
          show={showSubOptions}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
};

const SubOptions = ({ subOptions, show, setShowMenu }: any) => {
  const navigate = useNavigate();

  const handleClickSuboption = (route: string) => {
    navigate(route);
    setShowMenu(false);
  };

  return subOptions.map((item: any, key: number) => (
    <div
      key={key}
      className={styles.subOption + " " + styles[show ? "show" : "hide"]}
      onClick={() => handleClickSuboption(item.route)}
    >
      {item.text}
    </div>
  ));
};

export default Menu;
