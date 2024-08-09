import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

import { IProduct } from "../../interfaces/product";

const getByProductPlanId = async (productPlan_id: string) => {
  const { data } = await apiInstance.get(
    `/product/getByProductPlanId/${productPlan_id}`
  );
  return data;
};

const GetByPlanId = () => {
  const [productPlanId, setProductPlanId] = useState("");

  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["product"],
    queryFn: () => getByProductPlanId(productPlanId),
    enabled: productPlanId !== null && productPlanId !== "",
  });

  return {
    setProductPlanId,
    refetch,
    isLoading,
    data,
    isError,
    error,
    status,
  };
};

const GetCache = () => {
  const queryClient = useQueryClient();
  const product = queryClient.getQueryData<IProduct>(["product"]);
  return product;
};

export { GetByPlanId, GetCache };
