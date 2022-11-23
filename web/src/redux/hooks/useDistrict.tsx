import { listAll } from "../slices/districtSlice";
import { useAppDispatch, useAppSelector } from "./";

const useDistrict = () => {
  const dispatch = useAppDispatch();

  const { district, list } = useAppSelector((state) => state.districtSlice);

  const listAllDistrict = () => {
    dispatch(listAll());
  };

  return {
    list,
    listAllDistrict,
  };
};

export default useDistrict;
