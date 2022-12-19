import * as FamilySlice from "../redux/slices/familySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFamily = () => {
  const dispatch = useAppDispatch();

  const { family, list } = useAppSelector((state) => state.familySlice);

  const create = (name: string, values: FamilySlice.ValueT) => {
    dispatch(FamilySlice.createFamily(name, values));
  };

  const update = (id: string, name: string, values: FamilySlice.ValueT) => {
    dispatch(FamilySlice.updateFamily(id, name, values));
  };

  const deleteById = (value: string) => {
    dispatch(FamilySlice.deleteFamily(value));
  };

  const getById = (value: string) => {
    dispatch(FamilySlice.getFamily(value));
  };

  const listAll = () => {
    dispatch(FamilySlice.listFamilies());
  };

  const setList = (value: FamilySlice.FamilyT[]) => {
    dispatch(FamilySlice.setFamilyList(value));
  };

  const set = (value: FamilySlice.FamilyT) => {
    dispatch(FamilySlice.setFamily(value));
  };

  const addValue = (value: FamilySlice.ValueT) => {
    dispatch(FamilySlice.addFamilyValue(value));
  };

  const reset = () => {
    dispatch(FamilySlice.resetFamily());
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
    family,
    list,
  };
};

export default useFamily;
