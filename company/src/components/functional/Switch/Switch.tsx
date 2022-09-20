import { Fragment } from "react";
import Image from "next/image";

import { PageHeader, Screen, Header } from "../../layout/Generic";

import Main from "../Main";
import Login from "../Login";

import { useAppSelector } from "../../../redux/hooks";

import styles from "../../layout/Generic/Generic.module.scss";

const Switch = ({ children }: any) => {
  const { userCompany } = useAppSelector((state) => state.userCompanySlice);

  return (
    <Fragment>
      <PageHeader />
      <Screen>
        <Header>
          <div className={styles.left}>
            <Image alt="Next.js logo" src="/logo.jpg" width={243} height={51} />
          </div>
          <div className={styles.right}></div>
        </Header>
        {userCompany.companyName ? <Main>{children}</Main> : <Login />}
      </Screen>
    </Fragment>
  );
};

export default Switch;
