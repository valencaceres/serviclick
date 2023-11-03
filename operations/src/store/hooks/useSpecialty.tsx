import { specialtyStore } from "../zustand/index";

const useSpecialty = () => {
  const { specialties, isLoading, isError, error } = specialtyStore(
    (state) => ({
      specialties: state.specialtyList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getByFamilyId, getSpecialitiesByAssistance } = specialtyStore();

  return {
    specialties,
    getByFamilyId,
    getSpecialitiesByAssistance,
    isLoading,
    isError,
    error,
  };
};

export default useSpecialty;
