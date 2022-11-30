import * as ContractorSlice from "../redux/slices/contractorSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useContractor = () => {
  const dispatch = useAppDispatch();

  const {
    contractor,
    list: contractorList,
    loading: contractorLoading,
    error: contractorError,
  } = useAppSelector((state) => state.contractorSlice);

  const createContractor = (contractor: ContractorSlice.ContractorT) => {
    dispatch(ContractorSlice.create(contractor));
  };

  const getAllContractors = (
    contractorType: string,
    nameLike: string,
    active: boolean
  ) => {
    dispatch(ContractorSlice.getAll(contractorType, nameLike, active));
  };

  const getContractorById = (id: string) => {
    dispatch(ContractorSlice.getById(id));
  };

  const getContractorByRut = (rut: string, type: string) => {
    dispatch(ContractorSlice.getByRut(rut, type));
  };

  const setContractorList = (value: ContractorSlice.ContractorT[]) => {
    dispatch(ContractorSlice.setContractorList(value));
  };

  const setContractor = (value: ContractorSlice.ContractorT) => {
    dispatch(ContractorSlice.setContractor(value));
  };

  const resetContractor = () => {
    dispatch(ContractorSlice.resetContractor());
  };

  const resetContractorAll = () => {
    dispatch(ContractorSlice.resetContractorAll());
  };

  return {
    createContractor,
    getAllContractors,
    getContractorById,
    getContractorByRut,
    setContractorList,
    setContractor,
    resetContractor,
    resetContractorAll,
    contractorLoading,
    contractorError,
    contractor,
    contractorList,
  };
};

export default useContractor;
