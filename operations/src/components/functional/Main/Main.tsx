import { useEffect } from "react";
import Image from "next/image";

import { Content } from "../../layout/Content";

import Menu from "../../functional/Menu";

import { useDistrict } from "../../../hooks";

const Main = ({ children }: any) => {
  const { listAllDistrict } = useDistrict();

  useEffect(() => {
    listAllDistrict();
  }, []);

  return (
    <Content>
      <Menu />
      {children}
    </Content>
  );
};

export default Main;
