import Image from "next/image";

import { Content } from "../../layout/Content";

import Menu from "../../functional/Menu";

const Main = ({ children }: any) => {
  return (
    <Content>
      <Menu />
      {children}
    </Content>
  );
};

export default Main;
