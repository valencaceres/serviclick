import { useEffect } from "react";
import shallow from "zustand/shallow";

import { productStore } from "../../store/productStore";
import { GetByPlanId } from "../query/useQueryProduct";

const useProduct = () => {
  const { data, setProductPlanId, isLoading, isError, error } = GetByPlanId();

  const getByPlanId = (planId: string) => {
    setProductPlanId(planId);
  };

  const { product } = productStore(
    (state) => ({
      product: state.product,
    }),
    shallow
  );
  const { setProduct, reset: resetProduct } = productStore();

  useEffect(() => {
    if (data && data?.id !== "") {
      setProduct({ ...data });
    }
  }, [data?.id]);

  return {
    product,
    isLoading,
    isError,
    error,
    getByPlanId,
    setProduct,
  };
};

export default useProduct;
