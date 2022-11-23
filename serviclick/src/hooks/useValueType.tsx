import { useAppDispatch, useAppSelector } from "../redux/hooks";

import * as ValueType from "../redux/slices/valueTypeSlice";

const useValueType = () => {
  const dispatch = useAppDispatch();

  const {
    valueType,
    list: valueTypeList,
    loading: valueTypeLoading,
    error: valueTypeError,
  } = useAppSelector((state) => state.valueTypeSlice);

  const createValueType = (valueType: ValueType.ValueTypeT) => {
    dispatch(ValueType.create(valueType));
  };

  const updateValueTypeById = (valueType: ValueType.ValueTypeT) => {
    dispatch(ValueType.updateById(valueType));
  };

  const getAllValueTypes = () => {
    dispatch(ValueType.getAll());
  };

  const getValueTypeById = (id: string) => {
    dispatch(ValueType.getById(id));
  };

  const setValueType = (valueType: ValueType.ValueTypeT) => {
    dispatch(ValueType.set(valueType));
  };

  const resetValueType = () => {
    dispatch(ValueType.reset());
  };

  const resetValueTypeList = () => {
    dispatch(ValueType.resetList());
  };

  const resetValueTypeAll = () => {
    dispatch(ValueType.resetAll());
  };

  return {
    createValueType,
    updateValueTypeById,
    getAllValueTypes,
    getValueTypeById,
    setValueType,
    resetValueType,
    resetValueTypeList,
    resetValueTypeAll,
    valueType,
    valueTypeList,
    valueTypeLoading,
    valueTypeError,
  };
};

export default useValueType;
