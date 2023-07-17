import * as FieldSlice from "../redux/slices/fieldSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useField = () => {
  const dispatch = useAppDispatch();

  const { field, list, isLoading, isError, error } = useAppSelector(
    (state) => state.fieldSlice
  );

  const getFieldByLeadId = (lead_id: string) => {
    dispatch(FieldSlice.getFieldsByLeadId(lead_id));
  };

  const resetField = () => {
    dispatch(FieldSlice.resetField());
  };

  return {
    getFieldByLeadId,
    resetField,
    field,
    fieldList: list,
    fieldIsLoading: isLoading,
    fieldIsError: isError,
    fieldError: error,
  };
};

export default useField;
