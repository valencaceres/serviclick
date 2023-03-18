import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const uploadFile = async (data: any) => {
  const { data: response } = await apiInstance.post(`/import/uploadFile`, data);
  return response;
};

const getAll = async () => {
  const { data } = await apiInstance.get(`/import/getAll`);
  return data;
};

const getById_BCI = async (id: string) => {
  const { data } = await apiInstance.get(`/import/getById_BCI/${id}`);
  return data;
};

const useUploadFile = () => {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: uploadFile,
    onSettled: () => {
      queryClient.refetchQueries(["import"]);
    },
  });

  return { mutate, isLoading, error };
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
  return { useUploadFile, useGetAll, useGetById_BCI };
};

export default useQueryImport;
