import * as Insured from "../redux/slices/insuredSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useInsured = () => {
  const dispatch = useAppDispatch();

  const { insured } = useAppSelector((state) => state.insuredSlice);

  const getInsuredByRut = (rut: string) => {
    dispatch(Insured.setLoading(true));
    dispatch(Insured.getByRut(rut));
  };

  const resetInsured = () => {
    dispatch(Insured.reset());
  };

  return {
    getInsuredByRut,
    resetInsured,
    insured,
  };
};

export default useInsured;
