import { useEffect } from "react";
import shallow from "zustand/shallow";

import { beneficiaryStore } from "../../store/beneficiaryStore";
import { GetByRut, InvalidateQueries } from "../query/useQueryBeneficiary";

const useBeneficiary = () => {
  const { data, setBeneficiaryRut, isLoading, isError, error } = GetByRut();

  const getByRut = (rut: string) => {
    setBeneficiaryRut(rut);
  };

  const { beneficiary } = beneficiaryStore(
    (state) => ({
      beneficiary: state.beneficiary,
    }),
    shallow
  );
  const { setBeneficiary, reset: resetBeneficiary } = beneficiaryStore();

  useEffect(() => {
    if (data && data?.id !== "") {
      setBeneficiary({ ...data });
    }
  }, [data?.id]);

  return {
    beneficiary,
    isLoading,
    isError,
    error,
    getByRut,
    setBeneficiary,
  };
};

export default useBeneficiary;
