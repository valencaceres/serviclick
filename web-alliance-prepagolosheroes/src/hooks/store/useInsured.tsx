import { useEffect } from "react";
import shallow from "zustand/shallow";

import { insuredStore } from "../../store/insuredStore";
import { GetByRut } from "../query/useQueryInsured";

const useInsured = () => {
  const { data, setInsuredRut, isLoading, isError, error } = GetByRut();

  const getByRut = (rut: string) => {
    setInsuredRut(rut);
  };

  const { insured } = insuredStore(
    (state) => ({
      insured: state.insured,
    }),
    shallow
  );
  const { setInsured, reset: resetInsured } = insuredStore();

  useEffect(() => {
    if (data && data?.id !== "") {
      setInsured({ ...data });
    }
  }, [data?.id]);

  return {
    insured,
    isLoading,
    isError,
    error,
    getByRut,
    setInsured,
  };
};

export default useInsured;
