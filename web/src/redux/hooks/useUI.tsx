import { setDevice, setAgent, resetDevice } from "../slices/uiSlice";
import { useAppDispatch, useAppSelector } from ".";

const useUI = () => {
  const dispatch = useAppDispatch();

  const { isDesktop, agentId } = useAppSelector((state) => state.uiSlice);

  const setDeviceUI = (value: boolean) => {
    dispatch(setDevice(value));
  };

  const setAgentUI = (value: string) => {
    dispatch(setAgent(value));
  };

  const resetDeviceUI = () => {
    dispatch(resetDevice());
  };

  return {
    setDeviceUI,
    setAgentUI,
    resetDeviceUI,
    isDesktop,
    agentId,
  };
};

export default useUI;
