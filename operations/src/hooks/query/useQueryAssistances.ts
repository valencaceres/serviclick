import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";
const queryClient = new QueryClient();

const assignValue = async (data: any) => {
  const { data: result } = await apiInstance.post(
    "/assistance/assignValue",
    data
  );
  return result;
};

const getAll = async () => {
  const { data } = await apiInstance.get(`/assistance/getAll`);
  return data;
};

const getValues = async (id: string) => {
  const { data } = await apiInstance.get(`/assistance/getValues/${id}`);
  return data;
};

const getValuesById = async (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  const { data } = await apiInstance.get(
    `/assistance/getValuesById/${insured_id}/${assistance_id}/${product_id}`
  );
  return data;
};

const getDocumentsById = async (assistance_id: string) => {
  const { data } = await apiInstance.get(
    `/assistance/getDocumentsById/${assistance_id}`
  );
  return data;
};

const useGetAll = () => {
  return useQuery({
    queryKey: ["assistance"],
    queryFn: getAll,
  });
};

const useGetValues = (id: string) => {
  return useQuery({
    queryKey: ["assistanceValue", id],
    queryFn: () => getValues(id),
    enabled: !!id,
  });
};

const useGetValuesById = (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  return useQuery({
    queryKey: ["assistanceValueById", insured_id, assistance_id, product_id],
    queryFn: () => getValuesById(insured_id, assistance_id, product_id),
    enabled: !!insured_id && !!assistance_id && !!product_id,
  });
};

const useGetDocumentsById = (assistance_id: string) => {
  return useQuery({
    queryKey: ["assistanceDocumentsById", assistance_id],
    queryFn: () => getDocumentsById(assistance_id),
    enabled: !!assistance_id,
  });
};

const useAssignValue = () => {
  return useMutation(["productValue"], assignValue);
};
const uploadDocument = async (formData: any) => {
  const { data } = await apiInstance.post(`/case/uploadDocument`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const useUploadDocument = () => {
  return useMutation(["case"], uploadDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useQueryAssistances = () => {
  return {
    useGetAll,
    useGetValues,
    useGetValuesById,
    useGetDocumentsById,
    useAssignValue,
    useUploadDocument,
  };
};

export default useQueryAssistances;
