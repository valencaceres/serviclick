import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get(`/assistance/getAll`);
  return data;
};

const useGetAll = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["assistance"],
    queryFn: getAll,
  });

  return { data, isLoading, error, refetch };
};

const useQueryAssistances = () => {
  return { useGetAll };
};

export default useQueryAssistances;
