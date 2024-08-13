import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get(`/district/listAll`);
  return data;
};

const GetAll = () => {
  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["district"],
    queryFn: () => getAll(),
  });

  return { refetch, isLoading, districts: data, isError, error, status };
};

const GetCache = () => {
  const queryClient = useQueryClient();
  const district = queryClient.getQueryData(["district"]);
  return district;
};

export { GetAll, GetCache };
