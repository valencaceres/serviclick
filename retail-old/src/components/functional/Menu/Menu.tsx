import { useRouter } from "next/router";

import { useState, Fragment } from "react";

import Icon from "../../ui/Icon";

import styles from "./Menu.module.scss";

import { useUI, useLead } from "../../../hooks";

const Menu = () => {
  const router = useRouter();

  const { retail } = useUI();
  const { setAgentId } = useLead();

  const handleProducts = () => {
    setAgentId(retail.id);
    router.push("/menu/family");
  };

  const handleCustomers = () => {};

  const handleReports = () => {};

  return (
    <Fragment>
      <div className={styles.menu}>
        <div className={styles.menuOption} onClick={handleProducts}>
          <Icon iconName="real_estate_agent" size="40px" />
          Productos
        </div>
        <div className={styles.menuOption} onClick={handleCustomers}>
          <Icon iconName="groups" size="40px" />
          Clientes
        </div>
        <div className={styles.menuOption} onClick={handleReports}>
          <Icon iconName="monitoring" size="40px" />
          Reportes
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
