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

const updateAgent = async (payload: any) => {
  const { data } = await apiInstance.put(`/broker/updateAgent/${payload.brokerId}`, payload);

  return data;
};

const useUpdateAgent = () => {
  return useMutation(["updateAgent"], (payload: any) => updateAgent(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["brokerAgents"]);
    },
  });
};

const useBroker = () => {
  return {
    useGetBrokerAgents,
    useUpdateAgent
  };
};

export default useBroker;
