import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const getByRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/insured/getByRut/${rut}`);
  return data;
}

const useGetByRut = (rut: string) => {
  return useQuery(
    ["insured", rut],
    () => getByRut(rut), {
      enabled: rut?.length >= 10,
      retry: false,
    }
  );
}

const getById = async (id: string) => {
  const { data } = await apiInstance.get(`/insured/getById/${id}`);
  return data;
}

const useGetById = (id: string) => {
  return useQuery(
    ["insured", id],
    () => getById(id), {
      enabled: !!id,
    }
  );
}

const useQueryInsured = () => {
  return { useGetByRut, useGetById };
}

export default useQueryInsured;

