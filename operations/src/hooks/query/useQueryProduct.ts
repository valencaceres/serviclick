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

const getAllRetails = async () => {
  const { data } = await apiInstance.get(`/retail/getAll`);
  return data;
};

const useGetAllRetails = () => {
  return useQuery({
    queryKey: ["retails"],
    queryFn: getAllRetails,
  });
};

const getById = async (id: string) => {
  const { data } = await apiInstance.get(`/product/getById/${id}`);
  return data;
};

const getContractByProductPlanId = async (
  product_id: string,
  agent_id: string
) => {
  const { data } = await apiInstance.get(
    `/product/getContract/${product_id}/${agent_id}`
  );
  return data;
};

const useGetContractByProductPlanId = (
  product_id: string,
  agent_id: string
) => {
  return useQuery(
    ["product", product_id, agent_id],
    () => getContractByProductPlanId(product_id, agent_id),
    {
      enabled: !!product_id,
    }
  );
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

const getByRetailRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/product/getByRetailRut/${rut}`);
  return data;
};

const useGetByRetailRut = (rut: string) => {
  return useQuery(["product", rut], () => getByRetailRut(rut), {
    enabled: !!rut,
  });
};

const useQueryProduct = () => {
  return {
    useGetAll,
    useGetById,
    useCreate,
    useListProducts,
    useGetByRetailRut,
    useGetContractByProductPlanId,
    useGetAllRetails,
  };
};

export default useQueryProduct;
