import { useEffect } from "react";
import { useRouter } from "next/router";

import Icon from "../../ui/Icon";

import { getByEmail } from "../../../redux/slices/userCompanySlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

import styles from "./Menu.module.scss";

const menuOptions = [
  {
    icon: "person",
    label: "Mis datos",
    name: "company",
    route: "/company",
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

  const { userCompany } = useAppSelector((state) => state.userCompanySlice);

  const handleOptionClick = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    if (userCompany.email !== "") {
      dispatch(getByEmail(userCompany.email));
    }
  }, [dispatch, userCompany.email]);

  return (
    <div className={styles.menu}>
      <div className={styles.welcome}>{userCompany.companyName}</div>
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
