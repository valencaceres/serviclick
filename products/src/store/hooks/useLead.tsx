import { shallow } from "zustand/shallow";

import { leadStore } from "@/store/zustand";

const useLead = () => {
  const {
    lead,
    service,
    isLoading: leadIsLoading,
    isError: leadIsError,
    error: leadError,
  } = leadStore(
    (state) => ({
      lead: state.lead,
      service: state.service,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    set: setLead,
    getById: getLeadById,
    getBySubscriptionId: getLeadBySubscriptionId,
    getService: getServiceByLeadId,
    create: createLead,
    reset: resetLead,
  } = leadStore();

  return {
    lead,
    service,
    leadIsLoading,
    leadIsError,
    leadError,
    setLead,
    getLeadById,
    getLeadBySubscriptionId,
    getServiceByLeadId,
    createLead,
    resetLead,
  };
};

export default useLead;
