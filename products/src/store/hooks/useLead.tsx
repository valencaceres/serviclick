import { shallow } from "zustand/shallow";

import { leadStore } from "../zustand";

const useLead = () => {
  const {
    lead,
    isLoading: leadIsLoading,
    isError: leadIsError,
    error: leadError,
  } = leadStore(
    (state) => ({
      lead: state.lead,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    set: setLead,
    getById: getLeadById,
    create: createLead,
    reset: resetLead,
  } = leadStore();

  return {
    lead,
    leadIsLoading,
    leadIsError,
    leadError,
    setLead,
    getLeadById,
    createLead,
    resetLead,
  };
};

export default useLead;
