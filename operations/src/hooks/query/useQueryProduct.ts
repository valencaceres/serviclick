import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductT } from "~/interfaces/product";

import { apiInstance } from "~/utils/api";

const create = async (data: any) => {
  const { data: response } = await apiInstance.post(`/product/create`, data);
  return response;
};

const useCreate = () => {
  return useMutation(create);
};

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

const getById = async (id: string) => {
  const { data } = await apiInstance.get(`/product/getById/${id}`);
  return data;
};

const useGetById = (id: string) => {
  return useQuery(["product", id], () => getById(id), {
    enabled: !!id,
  });
};

const listProducts = async (agent_id: string | undefined) => {
  const { data } = await apiInstance.get(`/product/list/${agent_id}`);
  return data;
};

const useListProducts = (agent_id: string | undefined) => {
  return useQuery(["products", agent_id], () => listProducts(agent_id));
  
};

const useQueryProduct = () => {
  return {
    useGetAll,
    useGetById,
    useCreate,
    useListProducts,
  };
};


export default useQueryProduct;
