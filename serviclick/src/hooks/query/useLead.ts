import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const getStatistics = async () => {
  console.log(apiInstance)
  const { data } = await apiInstance.get(`/lead/getStatistics`);

  return data;
}

const useGetStatistics = () => {
  return useQuery(["leadStatistics"], () => getStatistics());
}

const useLead = () => {
  return {
    useGetStatistics
  };
}

export default useLead;