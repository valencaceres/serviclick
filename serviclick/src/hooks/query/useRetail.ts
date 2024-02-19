import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const getAgents = async (retailId: string) => {
  const { data } = await apiInstance.get(`/retail/getAgents/${retailId}`);

  return data;
};

const useGetAgents = (retailId: string) => {
  return useQuery(["retailAgents", retailId], () => getAgents(retailId), {
    enabled: !!retailId,
  });
};

const updateAgent = async (payload: any) => {
  const { data } = await apiInstance.put(
    `/retail/updateAgent/${payload.retailId}`,
    payload
  );

  return data;
};

const useUpdateAgent = () => {
  return useMutation(["updateAgent"], (payload: any) => updateAgent(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["retailAgents"]);
    },
  });
};

const removeAgent = async (payload: any) => {
  const { data } = await apiInstance.delete(`/retail/removeAgent`,  { data: payload } );

  return data;
}

const useRemoveAgent = () => {
  return useMutation(["removeAgent"], (payload: any) => removeAgent(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["retailAgents"]);
    },
  });
}



const useRetail = () => {
  return {
    useGetAgents,
    useUpdateAgent,
    useRemoveAgent,
  };
};

export default useRetail;
