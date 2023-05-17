import * as Status from "../redux/slices/statusSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useStatus = () => {
  const dispatch = useAppDispatch();

  const { status, list: statusList } = useAppSelector(
    (state) => state.statusSlice
  );

  const getAllStatus = () => {
    dispatch(Status.getAll());
  };

  const setStatusList = (value: Status.StatusT[]) => {
    dispatch(Status.setStatusList(value));
  };

  const setStatus = (value: Status.StatusT) => {
    dispatch(Status.setStatus(value));
  };

  const resetStatus = () => {
    dispatch(Status.resetStatus());
  };

  return {
    getAllStatus,
    setStatusList,
    setStatus,
    resetStatus,
    status,
    statusList,
  };
};

export default useStatus;
