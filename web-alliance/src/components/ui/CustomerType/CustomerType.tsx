import React, { FC } from "react";

import styles from "./CustomerType.module.scss";

interface ICustomerType {
  value: "p" | "c";
}

const type = {
  p: {
    icon: <span className="material-symbols-outlined">emoji_people</span>,
    name: "Persona",
  },
  c: {
    icon: <span className="material-symbols-outlined">domain</span>,
    name: "Empresa",
  },
};

const CustomerType: FC<ICustomerType> = ({ value }) => {
  return (
    <div className={styles.customerType}>
      {type[value].icon} <p>{type[value].name}</p>
    </div>
  );
};

export default CustomerType;
