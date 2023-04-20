import { useQuery, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const getAll = async (query: any) => {
  const { data } = await apiInstance.post("/contractor/getAll", query);

  return data;
};

const useGetAll = (query: any) => {
  return useQuery(["contractor", query], () => getAll(query));
};

const useQueryContractor = () => {
  return { useGetAll };
};

export default useQueryContractor;
