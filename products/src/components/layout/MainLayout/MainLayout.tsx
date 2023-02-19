import Image from "next/image";

import styles from "./MainLayout.module.scss";

import Back from "@/components/functional/navigation/Back";

import { useUI, useProduct } from "@/store/hooks";

import { currencyFormat } from "@/utils/format";
import Badge from "@/components/ui/Badge/Badge";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: Props) => {
  return (
    <Screen>
      <HeaderServiClick />
      <Content>{children}</Content>
    </Screen>
  );
};

const Screen = ({ children }: Props) => {
  return <div className={styles.screen}>{children}</div>;
};

const HeaderServiClick = () => {
  const { ui } = useUI();
  const { product } = useProduct();

  return (
    <div className={styles.screenHeader}>
      <div className={styles.left}>
        {ui.stage.code !== "description" && ui.stage.code !== "contractor" && (
          <Back />
        )}
      </div>
      <div className={styles.right}>
        <h1>{ui.stage.name}</h1>
        {ui.stage.code !== "description" && (
          <Badge>{currencyFormat(product?.plan.price || 0)}</Badge>
        )}
      </div>
    </div>
  );
};

const Content = ({ children }: Props) => {
  return <div className={styles.screenContent}>{children}</div>;
};

export default MainLayout;
