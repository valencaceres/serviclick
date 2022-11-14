import { useEffect } from "react";

import { Content, ContentCell, ContentRow } from "../../layout/Content";

import { useUI, useDistrict } from "../../../hooks";
import Icon from "../../ui/Icon";

import styles from "./Welcome.module.scss";

const Welcome = () => {
  const { user, setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Inicio");
  }, []);

  return (
    <Content align="center">
      <ContentCell align="center" gap="20px">
        <div className={styles.photo}>
          <Icon iconName="face" size="120px" />
        </div>
        <div className={styles.name}>
          Bienvenido {user.name} {user.paternalLastName} {user.maternalLastName}
        </div>
        <div className={styles.link}>
          <a href="#">Cerrar sesión</a>
        </div>
      </ContentCell>
    </Content>
  );
};

export default Welcome;
