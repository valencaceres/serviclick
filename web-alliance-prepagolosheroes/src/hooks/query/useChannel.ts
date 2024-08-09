import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const GetAll = () => {
  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["channelList"],
    queryFn: async () => await apiInstance.get(`/channel/list`),
    select: (data) => data.data,
  });

  return { refetch, isLoading, channels: data, isError, error, status };
};

const GetById = (id: string) => {
  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["channelList", id],
    queryFn: async () => await apiInstance.get(`/channel/getByid/${id}`),
    select: (data) => data.data,
  });

  return { refetch, isLoading, channels: data, isError, error, status };
};

export { GetAll, GetById };
