import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getAll = async () => {
  const { data } = await apiInstance.get("/company/getAll");
  return data;
};

const useGetAll = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["company"],
    queryFn: getAll,
  });

  return { data, isLoading, error };
};

const useQueryCompany = () => {
  return { useGetAll };
};

export default useQueryCompany;
