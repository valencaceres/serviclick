import { useState, useEffect } from "react";

import Icon from "../Icon";
import { Modal } from "../Modal";
import styles from "./LoadingMessage.module.scss";

const LoadingMessage = ({ showModal }: any) => {
  return (
    <Modal showModal={showModal}>
      <div className={styles.message}>
        <Icon iconName="refresh" className={styles.loading} />
        Por favor espere
      </div>
    </Modal>
  );
};

const SuccessMessage = ({ showModal, children, callback }: any) => {
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setTimeout(() => {
      callback();
      setShow(false);
    }, 3000);
  }, []);

  return (
    <Modal showModal={show}>
      <div className={styles.message}>
        <Icon iconName="check_circle" className={styles.success} size="50px" />
        {children}
      </div>
    </Modal>
  );
};

const WarningMessage = ({ showModal, message }: any) => {
  return (
    <Modal showModal={!showModal}>
      <div className={styles.message}>
        <Icon iconName="check_circle" className={styles.warning} size="50px" />
        {message}
      </div>
    </Modal>
  );
};

const ErrorMessage = ({ showModal, message }: any) => {
  return (
    <Modal showModal={!showModal}>
      <div className={styles.message}>
        <Icon iconName="check_circle" className={styles.error} size="50px" />
        {message}
      </div>
    </Modal>
  );
};

export { LoadingMessage, SuccessMessage, WarningMessage, ErrorMessage };
