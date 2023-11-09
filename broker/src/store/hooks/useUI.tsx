import { uiStore } from "../zustand/index";

const useUI = () => {
  const { title, broker, family } = uiStore((state) => ({
    title: state.title,
    broker: state.broker,
    family: state.family,
  }));

  const { setTitle, setBroker, setFamily } = uiStore();

  return {
    title,
    setTitle,
    broker,
    setBroker,
    family,
    setFamily,
  };
};

export default useUI;
