import { districtStore } from "../stores";

const useDistrict = () => {
  const {
    list: districtList,
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = districtStore((state) => ({
    list: state.districts,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getDistricts } = districtStore();

  return {
    districtList,
    isLoading,
    isError,
    error,
    getDistricts,
  };
};

export default useDistrict;
