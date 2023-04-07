import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { Body } from "../../layout/Generic";

import { useUI } from "../../../zustand/hooks";

const Main = ({ children }: any) => {
  const { setIsDesktop } = useUI();

  const isDesktop = useMediaQuery({ minWidth: 1200 });

  useEffect(() => {
    setIsDesktop(isDesktop);
  }, [isDesktop]);

  return <Body>{children}</Body>;
};

export default Main;
