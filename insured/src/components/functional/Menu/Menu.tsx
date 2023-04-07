import { useEffect } from "react";
import { useRouter } from "next/router";

import Icon from "../../ui/Icon";

import { useUI, useInsured } from "../../../zustand/hooks";

import styles from "./Menu.module.scss";

const menuOptions = [
  {
    icon: "person",
    label: "Mis datos",
    name: "insured",
    route: "/insured",
  },
  {
    icon: "medication_liquid",
    label: "Mis productos",
    name: "product",
    route: "/product",
  },
];

const Menu = () => {
  const router = useRouter();

  const { insuredProfile } = useInsured();
  const { setTitle, setShowButtonBack } = useUI();

  const { insured } = insuredProfile;

  const handleOptionClick = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    setTitle("Menú principal");
    setShowButtonBack(false);
  }, []);

  return (
    <div className={styles.menu}>
      <div className={styles.welcome}>
        Bienvenido(a) {insured.name} {insured.paternallastname}{" "}
        {insured.maternallastname}
      </div>
      <div className={styles.description}>Seleccione una opción de menú</div>
      <div className={styles.options}>
        {menuOptions.map((option: any, idx: number) => (
          <div
            key={idx}
            className={styles.option}
            onClick={() => handleOptionClick(option.route)}>
            <Icon iconName={option.icon} />
            <div className={styles.label}>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
