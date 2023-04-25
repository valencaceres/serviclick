import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const create = async (data: any) => {
  const response = await apiInstance.post("/contractor/create", data);
  return response.data;
};

const useCreate = () => {
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["contractor"]);
    },
  });
};

const getAll = async (query: any) => {
  const { data } = await apiInstance.post("/contractor/getAll", query);

  return data;
};

const useGetAll = (query: any) => {
  return useQuery(["contractor", query], () => getAll(query));
};

const getByRut = async (rut: string, type: "P" | "C") => {
  const { data } = await apiInstance.get(`/contractor/getByRut/${rut}/${type}`);
  return data;
};

const useGetByRut = (rut: string, type: "P" | "C") => {
  return useQuery(["contractor", rut, type], () => getByRut(rut, type), {
    enabled: rut?.length >= 10
  });
};

const getById = async (id: string) => {
  const { data } = await apiInstance.get(`/contractor/getById/${id}`);
  return data;
};

const useGetById = (id: string) => {
  return useQuery(["contractor", id], () => getById(id), {
    enabled: !!id,
  });
};

const useQueryContractor = () => {
  return { useCreate, useGetAll, useGetByRut, useGetById };
};

export default useQueryContractor;
