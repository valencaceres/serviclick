import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const createCase = async (caseData: any) => {
  const { data } = await apiInstance.post(`/case/create`, caseData);
  return data;
};

const getAll = async () => {
  const { data } = await apiInstance.get(`/case/all`);
  return data;
};

const getCaseById = async (id: string) => {
  const { data } = await apiInstance.get(`/case/getById/${id}`);
  return data;
};

const uploadDocument = async (formData: any) => {
  const { data } = await apiInstance.post(`/case/uploadDocument`, formData);
  return data;
};

const useGetAll = () => {
  return useQuery(["cases"], getAll);
};

const useGetById = (id: string) => {
  return useQuery(["case", id], () => getCaseById(id));
};

const useCreate = () => {
  return useMutation(["case"], createCase, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useUploadDocument = () => {
  return useMutation(["case"], uploadDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useQueryCase = () => {
  return { useCreate, useGetAll, useGetById, useUploadDocument };
};

export default useQueryCase;
