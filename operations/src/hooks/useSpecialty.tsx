import * as SpecialtySlice from "../redux/slices/specialtySlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { specialty } from "../interfaces";

const useSpecialty = () => {
  const dispatch = useAppDispatch();

  const {
    families,
    specialty,
    list: specialtyList,
    loading: specialtyLoading,
    error: specialtyError,
  } = useAppSelector((state) => state.specialtySlice);

  const createSpecialty = (specialty: specialty.ISpecialty) => {
    dispatch(SpecialtySlice.createSpecialty(specialty));
  };

  const updateSpecialty = (specialty: specialty.ISpecialty) => {
    dispatch(SpecialtySlice.updateSpecialty(specialty));
  };

  const deleteSpecialtyById = (id: string) => {
    dispatch(SpecialtySlice.deleteSpecialty(id));
  };

  const getSpecialtyById = (id: string) => {
    dispatch(SpecialtySlice.getSpecialty(id));
  };

  const getAllSpecialties = () => {
    dispatch(SpecialtySlice.getAllSpecialties());
  };

  const getSpecialtiesByFamilyId = (family_id: string) => {
    dispatch(
      family_id !== ""
        ? SpecialtySlice.getSpecialtiesByFamilyId(family_id)
        : SpecialtySlice.getAllSpecialties()
    );
  };

  const getFamilies = () => {
    dispatch(SpecialtySlice.getFamilies());
  };

  const setSpecialtyList = (specialties: specialty.ISpecialty[]) => {
    dispatch(SpecialtySlice.setSpecialtyList(specialties));
  };

  const setSpecialty = (specialty: specialty.ISpecialty) => {
    dispatch(SpecialtySlice.setSpecialty(specialty));
  };

  const resetSpecialty = () => {
    dispatch(SpecialtySlice.resetSpecialty());
  };

  return {
    createSpecialty,
    updateSpecialty,
    deleteSpecialtyById,
    getSpecialtyById,
    getAllSpecialties,
    getSpecialtiesByFamilyId,
    getFamilies,
    setSpecialtyList,
    setSpecialty,
    resetSpecialty,
    families,
    specialty,
    specialtyList,
    specialtyLoading,
    specialtyError,
  };
};

export default useSpecialty;
