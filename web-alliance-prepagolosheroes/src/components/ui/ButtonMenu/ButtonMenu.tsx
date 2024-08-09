import React from "react";

import { Row, Col } from "../../layout/Form";

import Icon from "../Icon/Icon";

import styles from "./ButtonMenu.module.scss";

const ButtonMenu = ({ iconName, text, description = "", onClick }: any) => {
  return (
    <button className={styles.buttonMenu} onClick={onClick}>
      <Row gap="10px">
        <Icon iconName={iconName} />
        <Col>
          <h1>{text}</h1>
          {description !== "" && <p>{description}</p>}
        </Col>
      </Row>
    </button>
  );
};

export default ButtonMenu;
