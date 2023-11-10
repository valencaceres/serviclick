import { uiStore } from "../zustand/index";

const useUI = () => {
  const { title, retail, family } = uiStore((state) => ({
    title: state.title,
    retail: state.retail,
    family: state.family,
  }));

  const { setTitle, setRetail, setFamily } = uiStore();

  return {
    title,
    setTitle,
    retail,
    setRetail,
    family,
    setFamily,
  };
};

export default useUI;
