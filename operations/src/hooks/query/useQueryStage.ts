import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAllStages = async () => {
  const { data } = await apiInstance.get(`/stage/getAll`);
  return data;
};

const useGetAll = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["stage", "getAll"],
    queryFn: getAllStages,
  });

  return { data, isLoading, error, refetch };
};

const useQueryStage = () => {
  return { useGetAll };
};

export default useQueryStage;
