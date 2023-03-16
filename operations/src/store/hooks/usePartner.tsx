import { partnerStore } from "../zustand";

const usePartner = () => {
  const {
    families,
    list: partnerList,
    partner,
    isLoading: partnerIsLoading,
    isError: partnerIsError,
    error: partnerError,
  } = partnerStore((state) => ({
    families: state.families,
    list: state.list,
    partner: state.partner,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    set: setPartner,
    getFamilies: getPartnersFamilies,
    getAll: getAllPartners,
    getByRut: getPartnerByRut,
    getById: getPartnerById,
    create: createPartner,
    reset: resetPartner,
  } = partnerStore();

  return {
    families,
    partnerList,
    partner,
    partnerIsLoading,
    partnerIsError,
    partnerError,
    setPartner,
    getPartnersFamilies,
    getAllPartners,
    getPartnerByRut,
    getPartnerById,
    createPartner,
    resetPartner,
  };
};

export default usePartner;
