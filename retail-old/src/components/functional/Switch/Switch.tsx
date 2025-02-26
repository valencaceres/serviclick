import {
  PageHeader,
  LayoutScreen,
  LayoutHeader,
  LayoutBody,
} from "../../layout/Generic";

import Header from "../Header";

import Main from "../Main";
import Login from "../Login";

import useUI from "../../../hooks/useUI";

const Switch = ({ children }: any) => {
  const { user } = useUI();

  return (
    <LayoutScreen>
      <PageHeader />
      <LayoutHeader>
        <Header />
      </LayoutHeader>
      <LayoutBody>
        {user.rut !== "" ? <Main>{children}</Main> : <Login />}
      </LayoutBody>
    </LayoutScreen>
  );
};

export default Switch;
