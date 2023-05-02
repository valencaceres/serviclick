import { uiStore } from "../uiStore";

const useUI = () => {
  const { title } = uiStore((state) => ({
    title: state.title,
  }));

  const { setTitle } = uiStore();

  return {
    title,
    setTitle,
  };
};

export default useUI;
