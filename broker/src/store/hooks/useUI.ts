import { uiStore } from "../uiStore";

const useUI = () => {
  const { title, broker } = uiStore((state) => ({
    title: state.title,
    broker: state.broker,
  }));

  const { setTitle, setBroker } = uiStore();

  return {
    title,
    setTitle,
    broker,
    setBroker,
  };
};

export default useUI;
