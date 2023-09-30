import * as FieldSlice from "../redux/slices/fieldSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useField = () => {
  const dispatch = useAppDispatch();

  const { field, list, isLoading, isError, error } = useAppSelector(
    (state) => state.fieldSlice
  );

  const getFieldByProductPlanId = (productPlan_id: string) => {
    dispatch(FieldSlice.getFieldByProductPlanId(productPlan_id));
  };

  const resetField = () => {
    dispatch(FieldSlice.resetField());
  };

  return {
    getFieldByProductPlanId,
    resetField,
    field,
    fieldList: list,
    fieldIsLoading: isLoading,
    fieldIsError: isError,
    fieldError: error,
  };
};

export default useField;
