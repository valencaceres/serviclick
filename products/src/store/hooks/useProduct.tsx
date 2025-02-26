import { shallow } from "zustand/shallow";

import { productStore } from "@/store/zustand";

const useProduct = () => {
  const {
    product,
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
  } = productStore(
    (state) => ({
      product: state.product,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const { setProduct, getByPlanId, reset: resetProduct, setNewProduct } = productStore();

  return {
    product,
    productIsLoading,
    productIsError,
    productError,
    setProduct,
    getByPlanId,
    resetProduct,
    setNewProduct
  };
};

export default useProduct;
