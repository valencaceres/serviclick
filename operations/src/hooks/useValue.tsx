import { useAppDispatch, useAppSelector } from "../redux/hooks";

import * as Value from "../redux/slices/valueSlice";

const useValue = () => {
  const dispatch = useAppDispatch();

  const {
    families,
    value,
    list: valueList,
    loading: valueLoading,
    error: valueError,
  } = useAppSelector((state) => state.valueSlice);

  const createValue = (
    family_id: string,
    name: string,
    valuetype_code: string
  ) => {
    dispatch(Value.create(family_id, name, valuetype_code));
  };

  const updateValueById = (
    id: string,
    family_id: string,
    name: string,
    valuetype_code: string
  ) => {
    dispatch(Value.updateById(id, family_id, name, valuetype_code));
  };

  const getAllValues = () => {
    dispatch(Value.getAll());
  };

  const getValueById = (id: string) => {
    dispatch(Value.getById(id));
  };

  const getValueFamilies = () => {
    dispatch(Value.getFamilies());
  };

  const getValuesByFamilyId = (family_id: string) => {
    dispatch(Value.getByFamilyId(family_id));
  };

  const setValue = (value: Value.ValueT) => {
    dispatch(Value.set(value));
  };

  const resetValue = () => {
    dispatch(Value.reset());
  };

  const resetValueList = () => {
    dispatch(Value.resetList());
  };

  const resetValueAll = () => {
    dispatch(Value.resetAll());
  };

  return {
    createValue,
    updateValueById,
    getAllValues,
    getValueById,
    getValueFamilies,
    getValuesByFamilyId,
    setValue,
    resetValue,
    resetValueList,
    resetValueAll,
    families,
    value,
    valueList,
    valueLoading,
    valueError,
  };
};

export default useValue;
