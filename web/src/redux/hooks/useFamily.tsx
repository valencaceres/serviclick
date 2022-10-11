import {
  createFamily,
  updateFamily,
  deleteFamily,
  getFamily,
  listFamilies,
  setFamilyList,
  setFamily,
  addFamilyValue,
  resetFamily,
  resetFamilyList,
  FamilyT,
  ValueT,
} from "../slices/familySlice";
import { useAppDispatch, useAppSelector } from ".";

const useFamily = () => {
  const dispatch = useAppDispatch();

  const { family, list } = useAppSelector((state) => state.familySlice);

  const create = (name: string, values: ValueT) => {
    dispatch(createFamily(name, values));
  };

  const update = (id: string, name: string, values: ValueT) => {
    dispatch(updateFamily(id, name, values));
  };

  const deleteById = (value: string) => {
    dispatch(deleteFamily(value));
  };

  const getById = (value: string) => {
    dispatch(getFamily(value));
  };

  const listAll = () => {
    dispatch(listFamilies());
  };

  const setList = (value: FamilyT[]) => {
    dispatch(setFamilyList(value));
  };

  const set = (value: FamilyT) => {
    dispatch(setFamily(value));
  };

  const addValue = (value: ValueT) => {
    dispatch(addFamilyValue(value));
  };

  const reset = () => {
    dispatch(resetFamily());
  };

  const resetList = () => {
    dispatch(resetFamilyList());
  };

  return {
    create,
    update,
    deleteById,
    getById,
    listAll,
    setList,
    set,
    addValue,
    reset,
    resetList,
    family,
    list,
  };
};

export default useFamily;
