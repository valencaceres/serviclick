import * as CompanySlice from "../redux/slices/companySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useCompany = () => {
  const dispatch = useAppDispatch();

  const { company, isLoading, isError, error } = useAppSelector(
    (state) => state.companySlice
  );

  const getCompanyLeadsByRut = (rut: string) => {
    dispatch(CompanySlice.getCompanyLeadsByRut(rut));
  };

  const resetCompany = () => {
    dispatch(CompanySlice.resetCompany());
  };

  const resetCompanyAll = () => {
    dispatch(CompanySlice.resetCompanyAll());
  };

  return {
    getCompanyLeadsByRut,
    resetCompany,
    resetCompanyAll,
    company,
    companyIsLoading: isLoading,
    companyIsError: isError,
    companyError: error,
  };
};

export default useCompany;
