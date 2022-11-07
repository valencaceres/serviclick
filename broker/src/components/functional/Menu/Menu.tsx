import { useRouter } from "next/router";

import { useState, Fragment } from "react";

import Icon from "../../ui/Icon";
import ModalWindow from "../../ui/ModalWindow";

import styles from "./Menu.module.scss";

import { useUI, useLead } from "../../../hooks";

const Menu = () => {
  const router = useRouter();

  const { setCustomerTypeUI } = useUI();
  const { resetLead } = useLead();

  const [showModalCustomerType, setShowModalCustomerType] = useState(false);

  const handleClickCloseCustomerType = () => {
    setShowModalCustomerType(false);
  };

  const handleProducts = () => {
    resetLead();
    router.push("/menu/family");
    //setShowModalCustomerType(true);
  };

  const handleClickCustomer = () => {
    setCustomerTypeUI("P");
    router.push("/contract/customer");
  };

  const handleClickCompany = () => {
    setCustomerTypeUI("C");
    router.push("/contract/company");
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
      <ModalWindow
        showModal={showModalCustomerType}
        setClosed={handleClickCloseCustomerType}
        title="Tipo de cliente">
        <div className={styles.menuModal}>
          <div className={styles.menuOption} onClick={handleClickCustomer}>
            <Icon iconName="accessibility_new" size="40px" />
            Persona Natural
          </div>
          <div className={styles.menuOption} onClick={handleClickCompany}>
            <Icon iconName="apartment" size="40px" />
            Empresa
          </div>
        </div>
      </ModalWindow>
    </Fragment>
  );
};

export default Menu;
