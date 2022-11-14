import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

import { Screen } from "../Generic";

import { useUI } from "../../../redux/hooks";

import styles from "./Principal.module.scss";

const Principal = ({ children }: any) => {
  const { setDeviceUI } = useUI();

  const isDesktop = useMediaQuery({ minWidth: 1200 });

  useEffect(() => {
    setDeviceUI(isDesktop);
  }, []);

  return (
    <Screen>
      <div className={styles.header}>
        <div className={styles.left}>
          <Image alt="ServiClick" src="/logo.jpg" width={243} height={51} />
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.body}>{children}</div>
    </Screen>
  );
};

export default Principal;
