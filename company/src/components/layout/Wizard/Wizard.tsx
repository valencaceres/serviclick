import React from "react";

import styles from "./Wizard.module.scss";

const Wizard = ({ children }: any) => {
  return <div className={styles.wizard}>{children}</div>;
};

const Title = ({ children }: any) => {
  return <div className={styles.title}>{children}</div>;
};

const Description = ({ children }: any) => {
  return <div className={styles.description}>{children}</div>;
};

const Content = ({ children }: any) => {
  return <div className={styles.content}>{children}</div>;
};

const Buttons = ({ children }: any) => {
  return <div className={styles.buttons}>{children}</div>;
};

export default Wizard;
export { Title, Description, Content, Buttons };
