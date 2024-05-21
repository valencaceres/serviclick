import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { PageHeader, Screen, Header } from "../../layout/Generic";

import Navigate, { Back } from "../../ui/Navigate";

import Main from "../Main";
import Login from "../Login";

import { useUI, useUser } from "../../../zustand/hooks";

import styles from "../../layout/Generic/Generic.module.scss";

const Switch = ({ children }: any) => {
  const router = useRouter();

  const { user } = useUser();
  const { ui } = useUI();

  const handleClickBack = () => {
    router.push(ui.pathButtonBack);
  };

  return (
    <Fragment>
      <PageHeader />
      <Screen>
        <Header>
          <div className={styles.left}>
            {ui.showButtonBack && (
              <Navigate>
                <Back onClick={handleClickBack} />
              </Navigate>
            )}
            <Image alt="Next.js logo" src="/logo.jpg" width={243} height={51} />
          </div>
          <div className={styles.right}>{ui.title}</div>
        </Header>
        {user.email !== "" ? (
          <Main>{children}</Main>
        ) : (
          <Login />
        )}
      </Screen>
    </Fragment>
  );
};

export default Switch;
