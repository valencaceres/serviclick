import { specialtyStore } from "../zustand/index";

const useSpecialty = () => {
  const { specialtyList, isLoading, isError, error } = specialtyStore(
    (state) => ({
      specialtyList: state.specialtyList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getAll } = specialtyStore();

  return {
    specialtyList,
    isLoading,
    isError,
    error,
    getAll,
  };
};

export default useSpecialty;
