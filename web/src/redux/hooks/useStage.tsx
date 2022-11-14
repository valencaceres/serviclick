import { useAppDispatch, useAppSelector } from ".";

import * as Stage from "../slices/stageSlice";

const useStage = () => {
  const dispatch = useAppDispatch();

  const { list, stage } = useAppSelector((state) => state.stageSlice);

  const setStageList = (list: Stage.StageT[]) => {
    dispatch(Stage.setStageList(list));
  };

  const setStage = (stage: Stage.StageT) => {
    dispatch(Stage.setStage(stage));
  };

  const resetStage = () => {
    dispatch(Stage.resetStage());
  };

  return {
    setStageList,
    setStage,
    resetStage,
    list,
    stage,
  };
};

export default useStage;
