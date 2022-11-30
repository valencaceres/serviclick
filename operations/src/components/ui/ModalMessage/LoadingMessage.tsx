import { useState, useEffect } from "react";

import Icon from "../Icon";
import { Modal } from "../Modal";
import styles from "./LoadingMessage.module.scss";

const LoadingMessage = ({ showModal }: any) => {
  return (
    <Modal showModal={showModal}>
      <div className={styles.message}>
        <Icon iconName="refresh" className={styles.loading} />
        Por favor espere...
      </div>
    </Modal>
  );
};

const SuccessMessage = ({ showModal, children, callback }: any) => {
  return (
    <Message type="success" showModal={showModal} callback={callback}>
      {children}
    </Message>
  );
};

const WarningMessage = ({ showModal, children, callback }: any) => {
  return (
    <Message type="warning" showModal={showModal} callback={callback}>
      {children}
    </Message>
  );
};

const ErrorMessage = ({ showModal, children, callback }: any) => {
  return (
    <Message type="error" showModal={showModal} callback={callback}>
      {children}
    </Message>
  );
};

const Message = ({ type, showModal, children, callback }: any) => {
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setTimeout(() => {
      callback();
      setShow(false);
    }, 3000);
  }, [callback]);

  return (
    <Modal showModal={show}>
      <div className={styles.message}>
        <Icon
          iconName={
            type === "error"
              ? "error"
              : type === "warning"
              ? "warning"
              : "check_circle"
          }
          className={styles[type]}
          size="50px"
        />
        {children}
      </div>
    </Modal>
  );
};

export { LoadingMessage, SuccessMessage, WarningMessage, ErrorMessage };
