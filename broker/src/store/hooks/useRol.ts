import { rolStore } from "../zustand/rolStore";

const useRol = () => {
  const { rolList, rol, isLoading, isError, error } = rolStore(
    (state) => ({
      rolList: state.rolList,
      rol: state.rol,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getRolById } = rolStore();

  return {
    rolList,
    rol,
    isLoading,
    isError,
    error,
    getRolById
  };
};

export default useRol;
