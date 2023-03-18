import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get(`/import/getAll`);
  return data;
};

const getById_BCI = async (id: string) => {
  const { data } = await apiInstance.get(`/import/getById_BCI/${id}`);
  return data;
};

const useGetAll = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["import"],
    queryFn: getAll,
  });

  return { data, isLoading, error };
};

const useGetById_BCI = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["importBCI", id],
    queryFn: () => getById_BCI(id),
  });

  return { data, isLoading, error };
};

const useQueryImport = () => {
  return { useGetAll, useGetById_BCI };
};

export default useQueryImport;
