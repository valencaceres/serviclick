import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get(`/import/getAll`);
  return data;
};

const useGetAll = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["import"],
    queryFn: getAll,
  });

  return { data, isLoading, error };
};

const useQueryImport = () => {
  return { useGetAll };
};

export default useQueryImport;
