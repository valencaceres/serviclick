import * as FamilySlice from "../redux/slices/familySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFamily = () => {
  const dispatch = useAppDispatch();

  const { family, list } = useAppSelector((state) => state.familySlice);

  const create = (name: string) => {
    dispatch(FamilySlice.createFamily(name));
  };

  const update = (id: string, name: string) => {
    dispatch(FamilySlice.updateFamily(id, name));
  };

  const deleteById = (id: string) => {
    dispatch(FamilySlice.deleteFamily(id));
  };

  const getById = (id: string) => {
    dispatch(FamilySlice.getFamily(id));
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
    reset,
    family,
    list,
  };
};

export default useFamily;
