import { useQuery, useMutation } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const createCase = async (data: any) => {
  const { data: response } = await apiInstance.post(`/case/create`, data);
  return response;
};

const getBeneficiaryData = async (rut: string) => {
  const { data } = await apiInstance.get(`/case/getBeneficiaryByRut/${rut}`);
  return data;
};

const useCreate = () => {
  const { mutate, isLoading, error, isError, isSuccess } = useMutation({
    mutationFn: createCase,
  });

  return { mutate, isLoading, error, isError, isSuccess };
};

const useBeneficiaryData = (rut: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["case", rut],
    queryFn: () => getBeneficiaryData(rut),
  });

  return { data, isLoading, error, refetch };
};

const useQueryCase = () => {
  return { useCreate, useBeneficiaryData };
};

export default useQueryCase;
