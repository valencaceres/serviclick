import { shallow } from "zustand/shallow";

import { binStore } from "../zustand/binStore";

const useBin = () => {
  const {
    bin,
    list,
    isLoading: binIsLoading,
    isError: binIsError,
  } = binStore(
    (state) => ({
      bin: state.bin,
      list: state.list,
      isLoading: state.isLoading,
      isError: state.isError,
    }),
    shallow
  );

  const { getById } = binStore();

  return {
    bin, 
    list,
    binIsLoading,
    binIsError,
    getById
  };
};

export default useBin;
