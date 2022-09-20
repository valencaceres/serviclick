import { useMediaQuery } from "react-responsive";
import Image from "next/image";

import { Screen } from "../Generic";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setDevice } from "../../../redux/slices/uiSlice";

import styles from "./Principal.module.scss";

const Principal = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery({ minWidth: 1200 });
  dispatch(setDevice(isDesktop));

  return (
    <Screen>
      <div className={styles.header}>
        <div className={styles.left}>
          <Image alt="Next.js logo" src="/logo.jpg" width={243} height={51} />
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.body}>{children}</div>
    </Screen>
  );
};

export default Principal;
