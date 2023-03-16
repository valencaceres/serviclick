import { Disclosure, Transition } from "@headlessui/react";
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
      { text: "Familias", route: "/masters/family" },
      { text: "Especialidades", route: "/masters/specialty" },
      { text: "Tipos de valor", route: "/masters/valueType" },
      { text: "Valores", route: "/masters/value" },
      { text: "Documentos", route: "/masters/document" },
      { text: "Servicios", route: "/masters/assistance" },
      { text: "Etapas", route: "/masters/stage" },
      { text: "Productos", route: "/masters/product" },
    ],
  },
  {
    icon: <Icon iconName="people" />,
    text: "Entidades",
    subOptions: [
      { text: "Clientes", route: "/entities/contractor" },
      { text: "Especialistas", route: "/entities/specialist" },
      { text: "Convenios" },
      { text: "Operadores" },
    ],
  },
  {
    icon: <Icon iconName="build_circle" />,
    text: "Asistencia",
    subOptions: [{ text: "Dashboard" }, { text: "Apertura" }],
  },
];

const Menu = () => {
  const { showMenu, setShowMenuUI } = useUI();

  return (
    <div className={`${styles.menu} ${showMenu ? "left-0" : " -left-[200px]"}`}>
      {menu.map((item: any, idx: number) => (
        <MenuOption
          key={idx}
          iconName={item.icon}
          id={item.id}
          text={item.text}
          className={styles.menuOption}
          subOptions={item.subOptions}
          route={item.route}
          setShowMenu={setShowMenuUI}
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
  setShowMenu,
}: any) => {
  const router = useRouter();

  const handleClickOption = (route: string) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className={className}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={styles.option}
              onClick={() => handleClickOption(route)}
            >
              <div className={styles.left}>
                <Icon iconName={iconName} className={styles.icon} />
                <p>{text}</p>
              </div>
              {subOptions && (
                <Icon
                  iconName="chevron_right"
                  className={`${open ? "rotate-90" : ""}`}
                />
              )}
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {subOptions && (
                <SubOptions
                  subOptions={subOptions}
                  show={showSubOptions}
                  setShowMenu={setShowMenu}
                />
              )}
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

const SubOptions = ({ subOptions, show, setShowMenu }: any) => {
  const router = useRouter();

  return subOptions.map((item: any, key: number) => (
    <Disclosure.Panel
      key={key}
      onClick={() =>
        item.route ? (router.push(item.route), setShowMenu(false)) : {}
      }
      className={`${styles.subOption} ${
        router.pathname === item.route ? "bg-black" : ""
      }`}
      style={{
        textDecoration: !item.route ? "line-through" : "none",
        color: !item.route ? "gray" : "white",
      }}
    >
      {item.text}
    </Disclosure.Panel>
  ));
};

export default Menu;
