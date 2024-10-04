import { Fragment, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { PageHeader, Screen, Header } from "../../layout/Generic";

import Navigate, { Back } from "../../ui/Navigate";

import Main from "../Main";
import Login from "../Login";
import RestorePassword from "../RestorePassword";

import { useUI, useUser, useUserInsured } from "../../../zustand/hooks";

import styles from "../../layout/Generic/Generic.module.scss";

const Switch = ({ children }: any) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const { userInsured } = useUserInsured();
  const { ui } = useUI();

  const handleClickBack = () => {
    router.push(ui.pathButtonBack);
  };

  useEffect(() => {
    if (!userInsured?.email && currentRoute !== '/') {
      router.push('/');
    }
  }, [userInsured, currentRoute, router]);

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
        {userInsured.email !== "" ? (
          <Main>{children}</Main>
        ) : (
          currentRoute === '/restorePassword' ? (
            <RestorePassword />
          ) : (
            <Login />
          )
        )}
      </Screen>
    </Fragment>
  );
};

export default Switch;
