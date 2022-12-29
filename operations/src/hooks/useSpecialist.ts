import * as SpecialistSlice from "../redux/slices/specialistSlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { ISpecialist } from "../interfaces/specialist";

const useSpecialist = () => {
  const dispatch = useAppDispatch();

  const {
    specialist,
    families,
    assistances,
    list: specialistList,
    loading: specialistLoading,
    error: specialistError,
  } = useAppSelector((state) => state.specialistSlice);

  const createSpecialist = (specialist: ISpecialist) => {
    dispatch(SpecialistSlice.create(specialist));
  };

  const deleteSpecialistById = (id: string) => {
    dispatch(SpecialistSlice.deleteById(id));
  };

  const getAllSpecialists = () => {
    dispatch(SpecialistSlice.getAll());
  };

  const getSpecialistById = (id: string) => {
    dispatch(SpecialistSlice.getById(id));
  };

  const getFamilies = () => {
    dispatch(SpecialistSlice.getFamilies());
  };

  const getAssistances = (family_id: string) => {
    dispatch(SpecialistSlice.getAssistances(family_id));
  };

  const getByFamilyAssistance = (family_id: string, assistance_id: string) => {
    dispatch(SpecialistSlice.getByFamilyAssistance(family_id, assistance_id));
  };

  const setSpecialist = (specialist: ISpecialist) => {
    dispatch(SpecialistSlice.setSpecialist(specialist));
  };

  const resetSpecialist = () => {
    dispatch(SpecialistSlice.resetSpecialist());
  };

  return {
    createSpecialist,
    deleteSpecialistById,
    getAllSpecialists,
    getSpecialistById,
    getFamilies,
    getAssistances,
    getByFamilyAssistance,
    setSpecialist,
    resetSpecialist,
    specialist,
    specialistList,
    specialistLoading,
    specialistError,
    families,
    assistances,
  };
};

export default useSpecialist;
