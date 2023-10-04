import * as ContractorSlice from "../redux/slices/contractorSlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { contractor } from "../interfaces";

const useContractor = () => {
  const dispatch = useAppDispatch();

  const {
    contractorList,
    contractor,
    subscriptionItem,
    processing: contractorProcessing,
    loading: contractorLoading,
    error: contractorError,
  } = useAppSelector((state) => state.contractorSlice);

  const createContractor = (contractor: contractor.IContractor) => {
    dispatch(ContractorSlice.create(contractor));
  };

  const getAllContractors = (
    contractorType: string,
    rut: string,
    nameLike: string,
    active: boolean
  ) => {
    dispatch(ContractorSlice.getAll(contractorType, rut, nameLike, active));
  };

  const getContractorById = (id: string) => {
    dispatch(ContractorSlice.getById(id));
  };

  const getContractorByRut = (rut: string, type: string) => {
    dispatch(ContractorSlice.getByRut(rut, type));
  };

  const getSubscriptionById = (id: number) => {
    dispatch(ContractorSlice.getSubscriptionById(id));
  };

  const setContractor = (value: contractor.IContractor) => {
    dispatch(ContractorSlice.setContractor(value));
  };

  const setContractorProcessing = (value: boolean) => {
    dispatch(ContractorSlice.setProcessing(value));
  };

  const resetContractor = () => {
    dispatch(ContractorSlice.resetContractor());
  };

  const resetContractorAll = () => {
    dispatch(ContractorSlice.resetContractorAll());
  };

  return {
    contractorList,
    contractor,
    subscriptionItem,
    contractorProcessing,
    contractorLoading,
    contractorError,
    createContractor,
    getAllContractors,
    getContractorById,
    getContractorByRut,
    getSubscriptionById,
    setContractor,
    setContractorProcessing,
    resetContractor,
    resetContractorAll,
  };
};

export default useContractor;
