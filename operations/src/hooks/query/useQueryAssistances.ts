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
  });
};

const useQueryAssistances = () => {
  return { useGetAll, useGetValues };
};

export default useQueryAssistances;
