import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const getBrokerAgents = async (brokerId: string) => {
  const { data } = await apiInstance.get(`/broker/getBrokerAgents/${brokerId}`);

  return data;
};

const useGetBrokerAgents = (brokerId: string) => {
  return useQuery(["brokerAgents", brokerId], () => getBrokerAgents(brokerId), {
    enabled: !!brokerId,
  });
};

const useBroker = () => {
  return {
    useGetBrokerAgents,
  };
};

export default useBroker;
