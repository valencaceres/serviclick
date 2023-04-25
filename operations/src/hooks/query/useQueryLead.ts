import { useMutation, useQuery } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const create = async (data: any) => {
  const { data: result } = await apiInstance.post("/lead/create", data);
  return result;
};

const addProduct = async (data: any) => {
  const { data: result } = await apiInstance.post("/lead/addProduct", data);
  return result;
};

const useAddProduct = () => {
  return useMutation(addProduct);
};

const useQueryLead = () => {
  return {
    useAddProduct,
  };
};

export default useQueryLead;
