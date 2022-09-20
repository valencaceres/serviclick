import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { Body } from "../../layout/Generic";

import { useAppDispatch } from "../../../redux/hooks";

import { setDevice } from "../../../redux/slices/uiSlice";

const Main = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery({ minWidth: 1200 });

  useEffect(() => {
    dispatch(setDevice(isDesktop));
  }, [dispatch, isDesktop]);

  return <Body>{children}</Body>;
};

export default Main;
