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
  FamilyT,
  ValueT,
} from "../redux/slices/familySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFamily = () => {
  const dispatch = useAppDispatch();

  const { family, list } = useAppSelector((state) => state.familySlice);

  const create = (value: FamilyT) => {
    const { name, values } = value;
    dispatch(createFamily(name, values));
  };

  const update = (value: FamilyT) => {
    const { id, name, values } = value;
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
