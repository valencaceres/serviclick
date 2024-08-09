import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get(`/relationship/getAll`);
  return data;
};

const GetAll = () => {
  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["relationship"],
    queryFn: () => getAll(),
  });

  return { refetch, isLoading, data, isError, error, status };
};

const GetCache = () => {
  const queryClient = useQueryClient();
  const relationship = queryClient.getQueryData(["relationship"]);
  return relationship;
};

export { GetAll, GetCache };
