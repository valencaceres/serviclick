import { shallow } from "zustand/shallow";

import { beneficiaryStore } from "@/store/zustand";

const useBeneficiary = () => {
  const {
    beneficiary,
    beneficiaryList,
    isLoading: beneficiaryIsLoading,
    isError: beneficiaryIsError,
    error: beneficiaryError,
  } = beneficiaryStore(
    (state) => ({
      beneficiary: state.beneficiary,
      beneficiaryList: state.beneficiaryList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    setBeneficiary,
    getByRut: getBeneficiaryByRut,
    reset: resetBeneficiary,
    setBeneficiaryList,
  } = beneficiaryStore();

  return {
    beneficiary,
    beneficiaryList,
    beneficiaryIsLoading,
    beneficiaryIsError,
    beneficiaryError,
    setBeneficiary,
    setBeneficiaryList,
    getBeneficiaryByRut,
    resetBeneficiary,
  };
};

export default useBeneficiary;
