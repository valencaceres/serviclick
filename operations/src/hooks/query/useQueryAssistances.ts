import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

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

const useQueryAssistances = () => {
  return { useGetAll, useGetValues, useGetValuesById };
};

export default useQueryAssistances;
