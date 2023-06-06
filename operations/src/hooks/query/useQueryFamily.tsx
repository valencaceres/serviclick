import { useMutation, useQuery } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get("/family/list");
  return data;
}

const useGetAll = () => {
  return useQuery(["families"], getAll);
}

const useQueryProduct = () => {
  return {
    useGetAll,
  }
};

export default useQueryProduct;
