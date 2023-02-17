import { shallow } from "zustand/shallow";

import { districtStore } from "@/store/zustand";

const useDistrict = () => {
  const {
    district,
    districtList,
    isLoading: districtIsLoading,
    isError: districtIsError,
    error: districtError,
  } = districtStore(
    (state) => ({
      district: state.district,
      districtList: state.districtList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    setDistrict,
    getAll: getAllDistricts,
    reset: resetDistrict,
  } = districtStore();

  return {
    district,
    districtList,
    districtIsLoading,
    districtIsError,
    districtError,
    setDistrict,
    getAllDistricts,
    resetDistrict,
  };
};

export default useDistrict;
