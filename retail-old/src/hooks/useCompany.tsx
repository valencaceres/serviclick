import * as Company from "../redux/slices/companySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useCompany = () => {
  const dispatch = useAppDispatch();

  const { company } = useAppSelector((state) => state.companySlice);

  const getCompanyByRut = (rut: string) => {
    dispatch(Company.setLoading(true));
    dispatch(Company.getByRut(rut));
  };

  const resetCompany = () => {
    dispatch(Company.reset());
  };

  return {
    getCompanyByRut,
    resetCompany,
    company,
  };
};

export default useCompany;
