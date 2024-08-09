import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

import { IInsured } from "../../interfaces/insured";

const getByRut = async (rut: string) => {
  const value = await apiInstance.get<IInsured>(`/insured/getByRut/${rut}`);
  return value.data;
};

const GetByRut = () => {
  const [insuredRut, setInsuredRut] = useState("");

  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["insured"],
    queryFn: () => getByRut(insuredRut),
    enabled: insuredRut !== null && insuredRut !== "",
  });

  useEffect(() => {
    insuredRut !== "" && refetch();
  }, [insuredRut]);

  return {
    setInsuredRut,
    refetch,
    isLoading,
    data,
    isError,
    error,
    status,
  };
};

const GetCache = () => {
  const queryClient = useQueryClient();
  const insured = queryClient.getQueryData<IInsured>(["insured"]);
  return insured;
};

const InvalidateQueries = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["insured"] });
};

export { GetByRut, GetCache, InvalidateQueries };
