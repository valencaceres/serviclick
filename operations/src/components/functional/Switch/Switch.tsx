import {
  PageHeader,
  LayoutScreen,
  LayoutHeader,
  LayoutBody,
} from "../../layout/Generic";

import Header from "../Header";

import Main from "../Main";

const Switch = ({ children }: any) => {
  return (
    <LayoutScreen>
      <PageHeader />
      <LayoutHeader>
        <Header />
      </LayoutHeader>
      <LayoutBody>
        <Main>{children}</Main>
      </LayoutBody>
    </LayoutScreen>
  );
};

export default Switch;
