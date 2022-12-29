import * as StageSlice from "../redux/slices/stageSlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { IStage } from "../interfaces/stage";

import stageSlice from "../redux/slices/stageSlice";

const useStage = () => {
  const dispatch = useAppDispatch();

  const {
    stage,
    list: stageList,
    loading: stageLoading,
    error: stageError,
  } = useAppSelector((state) => state.stageSlice);

  const createStage = (name: string) => {
    dispatch(StageSlice.createStage(name));
  };

  const updateStage = (id: string, name: string) => {
    dispatch(StageSlice.updateStage(id, name));
  };

  const deleteStage = (id: string) => {
    dispatch(StageSlice.deleteStage(id));
  };

  const getStage = (id: string) => {
    dispatch(StageSlice.getStage(id));
  };

  const getAllStages = () => {
    dispatch(StageSlice.getAllStages());
  };

  const setStageList = (value: IStage[]) => {
    dispatch(StageSlice.setStageList(value));
  };

  const setStage = (value: IStage) => {
    dispatch(StageSlice.setStage(value));
  };

  const resetStage = () => {
    dispatch(StageSlice.resetStage());
  };

  return {
    createStage,
    updateStage,
    deleteStage,
    getStage,
    getAllStages,
    setStageList,
    setStage,
    resetStage,
    stage,
    stageList,
    stageLoading,
    stageError,
  };
};

export default useStage;
