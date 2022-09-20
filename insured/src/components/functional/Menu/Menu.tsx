import { useEffect } from "react";
import { useRouter } from "next/router";

import Icon from "../../ui/Icon";

import { getByEmail } from "../../../redux/slices/userInsuredSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

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
  const dispatch = useAppDispatch();

  const { userInsured } = useAppSelector((state) => state.userInsuredSlice);

  const handleOptionClick = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    if (userInsured.email) {
      dispatch(getByEmail(userInsured.email));
    }
  }, [dispatch, userInsured.email]);

  return (
    <div className={styles.menu}>
      <div className={styles.welcome}>
        Bienvenido(a) {userInsured.name} {userInsured.paternalLastName}{" "}
        {userInsured.maternalLastName}
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
