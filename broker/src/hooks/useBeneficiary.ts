import * as Beneficiary from "../redux/slices/beneficiarySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useBeneficiary = () => {
  const dispatch = useAppDispatch();

  const { beneficiary, list } = useAppSelector(
    (state) => state.beneficiarySlice
  );

  const getBeneficiaryByRut = (rut: string) => {
    dispatch(Beneficiary.getByRut(rut));
  };

  const addBeneficiary = (beneficiary: Beneficiary.BeneficiaryT) => {
    dispatch(Beneficiary.addBeneficiary(beneficiary));
  };

  const deleteBeneficiary = (rut: string) => {
    dispatch(Beneficiary.deleteBeneficiary(rut));
  };

  const resetBeneficiary = () => {
    dispatch(Beneficiary.reset());
  };

  return {
    addBeneficiary,
    deleteBeneficiary,
    getBeneficiaryByRut,
    resetBeneficiary,
    beneficiary,
    list,
  };
};

export default useBeneficiary;
