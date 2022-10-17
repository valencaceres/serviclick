import { Router, useRouter } from "next/router";

import Icon from "../../ui/Icon";

import useUI from "../../../hooks/useUI";

import styles from "./Menu.module.scss";

const menu = [
  { icon: <Icon iconName="home" />, text: "Inicio", route: "/" },
  {
    icon: <Icon iconName="settings" />,
    text: "Maestros",
    subOptions: [
      { text: "Canales de Venta", route: "/masters/channel" },
      { text: "Familias", route: "/masters/family" },
      { text: "Coberturas", route: "/masters/coverage" },
      { text: "Productos", route: "/masters/product" },
    ],
  },
  {
    icon: <Icon iconName="shopping_cart_checkout" />,
    text: "Canales de venta",
    subOptions: [{ text: "Internet", route: "/channels/web" }],
  },
  {
    icon: <Icon iconName="directions_car" />,
    text: "Procesos",
    subOptions: [{ text: "Asignación de precios", route: "/processes/price" }],
  },
  {
    icon: <Icon iconName="receipt_long" />,
    text: "Reportes",
    subOptions: [{ text: "Transacciones", route: "/reports/transactions" }],
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
          route={item.route}
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
  route,
}: any) => {
  const router = useRouter();

  const handleClickOption = (route: string) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className={className}>
      <div className={styles.option} onClick={() => handleClickOption(route)}>
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
