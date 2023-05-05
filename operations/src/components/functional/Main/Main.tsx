import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";

import { Content } from "../../layout/Content";

import { Menu } from "../Menu/Menu";

import { useDistrict } from "../../../hooks";

const Main = ({ children }: any) => {
  const { listAllDistrict } = useDistrict();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isSignedIn } = useSession();

  useEffect(() => {
    listAllDistrict();
  }, []);

  return (
    <Content>
      {isSignedIn && <Menu isOpen={isOpen} setIsOpen={setIsOpen} />}
      {children}
    </Content>
  );
};

export default Main;
