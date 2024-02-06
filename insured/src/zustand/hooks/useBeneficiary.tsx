import { shallow } from "zustand/shallow";
import { beneficiaryStore } from "../stores";
const useBeneficiary = () => {
  const {
    isLoading: beneficiaryLoading,
    isError: beneficiaryError,
    error: beneficiaryErr,
  } = beneficiaryStore(
    (state) => ({
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const { upsertBeneficiary, removeLeadBeneficiary } = beneficiaryStore();
  return {
    beneficiaryLoading,
    beneficiaryError,
    beneficiaryErr,
    upsertBeneficiary,
    removeLeadBeneficiary,
  };
};

export default useBeneficiary;
