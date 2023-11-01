import { specialistStore } from "../zustand";

const useSpecialist = () => {
  const {
    families,
    assistances,
    list: specialistList,
    specialist,
    isLoading: specialistIsLoading,
    isError: specialistIsError,
    error: specialistError,
  } = specialistStore((state) => ({
    families: state.families,
    assistances: state.assistances,
    list: state.list,
    specialist: state.specialist,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    set: setSpecialist,
    getFamilies: getSpecialistsFamilies,
    getAssistancesByFamilyId,
    getAll: getAllSpecialists,
    getByRut: getSpecialistByRut,
    getById: getSpecialistById,
    create: createSpecialist,
    reset: resetSpecialist,
    getBySpecialtyId: getSpecialistsBySpecialtyId,
    getByName: getSpecialistsByName,
    getSpecialistByDistrictAndAsssitance,
    delete: deleteSpecialist,
  } = specialistStore();

  return {
    families,
    assistances,
    specialistList,
    specialist,
    specialistIsLoading,
    specialistIsError,
    specialistError,
    setSpecialist,
    getSpecialistsFamilies,
    getAssistancesByFamilyId,
    getSpecialistByDistrictAndAsssitance,
    getAllSpecialists,
    getSpecialistByRut,
    getSpecialistById,
    createSpecialist,
    resetSpecialist,
    getSpecialistsBySpecialtyId,
    getSpecialistsByName,
    deleteSpecialist,
  };
};

export default useSpecialist;
