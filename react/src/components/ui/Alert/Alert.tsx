import { useState } from "react";

import { Component, Row, Cell, CellSeparator } from "../../layout/Generic";

import { Modal, Window } from "../Modal";
import Button from "../Button";
import Icon, { icons } from "../Icon";

import styles from "./Alert.module.scss";

const Alert = ({ message, type }: any) => {
  const [showAlert, setShowAlert] = useState(false);

  const setClosed = () => {
    setShowAlert(false);
  };

  let iconName, color;

  switch (type) {
    case "info":
      iconName = icons.faInfo;
      color = "blue";
      break;
    case "warning":
      iconName = icons.faWarning;
      color = "yelow";
      break;
    case "error":
      iconName = icons.faWarning;
      color = "red";
      break;
    default:
      iconName = icons.faInfo;
      color = "blue";
      break;
  }

  return (
    <Modal showModal={showAlert}>
      <Window title="Nueva Familia" setClosed={setClosed}>
        <Component>
          <Row>
            <Cell>
              <div className={styles.message}>
                <Icon iconName={iconName} />
                <p>{message}</p>
              </div>
            </Cell>
          </Row>
          <Row>
            <CellSeparator></CellSeparator>
          </Row>
          <Row>
            <Cell>
              <Button onClick={setClosed}>Aceptar</Button>
            </Cell>
          </Row>
        </Component>
      </Window>
    </Modal>
  );
};

export default Alert;
