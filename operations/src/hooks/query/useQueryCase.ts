import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const createCase = async (caseData: any) => {
  const { data } = await apiInstance.post(`/case/create`, caseData);
  return data;
};

const getCaseById = async (id: string) => {
  const { data } = await apiInstance.get(`/case/getById/${id}`);
  return data;
};

const useCaseById = (id: string) => {
  return useQuery(["case", id], () => getCaseById(id));
};

const useCreate = () => {
  return useMutation(["case"], createCase, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useQueryCase = () => {
  return { useCreate, useCaseById };
};

export default useQueryCase;
