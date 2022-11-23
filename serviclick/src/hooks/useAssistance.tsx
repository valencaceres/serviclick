import { useAppDispatch, useAppSelector } from "../redux/hooks";

import * as Assistance from "../redux/slices/assistanceSlice";

const useAssistance = () => {
  const dispatch = useAppDispatch();

  const {
    families,
    assistance,
    list: assistanceList,
    loading: assistanceLoading,
    error: assistanceError,
  } = useAppSelector((state) => state.assistanceSlice);

  const createAssistance = (assistance: Assistance.AssistanceT) => {
    dispatch(Assistance.create(assistance));
  };

  const updateAssistanceById = (assistance: Assistance.AssistanceT) => {
    dispatch(Assistance.updateById(assistance));
  };

  const getAllAssistances = () => {
    dispatch(Assistance.getAll());
  };

  const getAssistanceById = (id: string) => {
    dispatch(Assistance.getById(id));
  };

  const getAssistanceFamilies = () => {
    dispatch(Assistance.getFamilies());
  };

  const getAssistancesByFamilyId = (family_id: string) => {
    dispatch(Assistance.getByFamilyId(family_id));
  };

  const setAssistance = (assistance: Assistance.AssistanceT) => {
    dispatch(Assistance.set(assistance));
  };

  const resetAssistance = () => {
    dispatch(Assistance.reset());
  };

  const resetAssistanceList = () => {
    dispatch(Assistance.resetList());
  };

  const resetAssistanceAll = () => {
    dispatch(Assistance.resetAll());
  };

  return {
    createAssistance,
    updateAssistanceById,
    getAllAssistances,
    getAssistanceById,
    getAssistanceFamilies,
    getAssistancesByFamilyId,
    setAssistance,
    resetAssistance,
    resetAssistanceList,
    resetAssistanceAll,
    families,
    assistance,
    assistanceList,
    assistanceLoading,
    assistanceError,
  };
};

export default useAssistance;
