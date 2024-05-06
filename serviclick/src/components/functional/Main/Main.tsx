import { useEffect, useState } from "react";

import { Content } from "../../layout/Content";

import { Menu } from "../Menu/Menu";

import { useDistrict } from "../../../hooks";
import {useUser} from "../../../store/hooks";

const Main = ({ children }: any) => {
  const { listAllDistrict } = useDistrict();
  const {user} = useUser()
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    listAllDistrict();
  }, []);

  return (
    <Content>
        {user.email ? <Menu isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {children}
    </Content>
  );
};

export default Main;