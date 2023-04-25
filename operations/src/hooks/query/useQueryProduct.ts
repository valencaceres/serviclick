import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get(`/product/getAll`);
  return data;
};

const useGetAll = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAll,
  });
};

const useQueryProduct = () => {
  return {
    useGetAll,
  };
};

export default useQueryProduct;
