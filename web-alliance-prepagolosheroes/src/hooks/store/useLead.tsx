import { useEffect } from "react";
import shallow from "zustand/shallow";

import { leadStore } from "../../store/leadStore";
import { GetById, Create } from "../query/useQueryLead";

import { ILead } from "../../interfaces/lead";

const useLead = () => {
  const {
    data: dataGet,
    setLeadId,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    error: errorGet,
  } = GetById();

  const {
    mutate,
    isLoading: isLoadingCreate,
    isError: isErrorCreate,
    error: errorCreate,
    isSuccess,
    data: dataCreate,
  } = Create();

  const create = (lead: ILead) => {
    mutate(lead);
  };

  const getById = (id: string) => {
    setLeadId(id);
  };

  const { lead, isLoading, isError, error } = leadStore(
    (state) => ({
      lead: state.lead,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    setLead,
    reset: resetLead,
    setIsError,
    setError,
    setIsLoading,
  } = leadStore();

  useEffect(() => {
    if (dataGet && dataGet?.id !== "") {
      setLead({ ...dataGet });
    }
  }, [dataGet?.id]);

  useEffect(() => {
    if (dataCreate && dataCreate?.id !== "") {
      setLead({ ...dataCreate });
    }
  }, [dataCreate?.id]);

  useEffect(() => {
    setIsLoading(isLoadingGet);
  }, [isLoadingGet]);

  useEffect(() => {
    setIsLoading(isLoadingCreate);
  }, [isLoadingCreate]);

  useEffect(() => {
    setIsError(isErrorGet);
  }, [isErrorGet]);

  useEffect(() => {
    setIsError(isErrorCreate);
  }, [isErrorCreate]);

  useEffect(() => {
    setError((errorCreate as Error)?.toString() || "");
  }, [errorCreate]);

  useEffect(() => {
    setError((errorGet as Error)?.toString() || "");
  }, [errorGet]);

  return {
    lead,
    isLoading,
    isError,
    isSuccess,
    error,
    getById,
    create,
    setLead,
    dataCreate,
  };
};

export default useLead;
