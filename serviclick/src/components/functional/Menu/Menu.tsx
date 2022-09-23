import { Router, useRouter } from "next/router";

import Icon from "../../ui/Icon";

import useUI from "../../../hooks/useUI";

import styles from "./Menu.module.scss";

const menu = [
  { icon: <Icon iconName="home" />, text: "Inicio" },
  {
    icon: <Icon iconName="settings" />,
    text: "Maestros",
    subOptions: [
      { text: "Canales", route: "/masters/channel" },
      { text: "Familias", route: "/masters/family" },
      { text: "Coberturas", route: "/masters/coverage" },
      { text: "Productos", route: "/masters/product" },
    ],
  },
  {
    icon: <Icon iconName="directions_car" />,
    text: "Procesos",
    subOptions: [{ text: "Clientes", route: "/masters/products" }],
  },
  {
    icon: <Icon iconName="receipt_long" />,
    text: "Reportes",
    subOptions: [{ text: "Cobranza", route: "/masters/products" }],
  },
];

const Menu = () => {
  const { showMenu } = useUI();

  return (
    <div className={styles.menu + " " + styles[showMenu ? "show" : "hide"]}>
      {menu.map((item: any, idx: number) => (
        <MenuOption
          key={idx}
          iconName={item.icon}
          id={item.id}
          text={item.text}
          className={styles.menuOption}
          subOptions={item.subOptions}
        />
      ))}
    </div>
  );
};

const MenuOption = ({
  iconName,
  text,
  subOptions,
  className,
  setShowSubOptions,
  showSubOptions,
}: any) => {
  return (
    <div className={className}>
      <div className={styles.option}>
        <div className={styles.left}>
          <Icon iconName={iconName} className={styles.icon} />
          <p>{text}</p>
        </div>
        {subOptions && <Icon iconName="chevron_right" />}
      </div>
      {subOptions && (
        <SubOptions
          subOptions={subOptions}
          show={showSubOptions}
          setShowMenu={setShowSubOptions}
        />
      )}
    </div>
  );
};

const SubOptions = ({ subOptions, show, setShowMenu }: any) => {
  const router = useRouter();

  return subOptions.map((item: any, key: number) => (
    <div
      key={key}
      onClick={() => router.push(item.route)}
      className={styles.subOption + " " + styles[show ? "show" : "hide"]}>
      {item.text}
    </div>
  ));
};

export default Menu;
