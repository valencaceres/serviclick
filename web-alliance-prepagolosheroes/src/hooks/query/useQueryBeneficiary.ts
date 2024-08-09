import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

import { IBeneficiary } from "../../interfaces/beneficiary";

const getByRut = async (rut: string) => {
  const value = await apiInstance.get<IBeneficiary>(
    `/beneficiary/getByRut/${rut}`
  );
  return value.data;
};

const GetByRut = () => {
  const [beneficiaryRut, setBeneficiaryRut] = useState("");

  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["beneficiary"],
    queryFn: () => getByRut(beneficiaryRut),
    enabled: beneficiaryRut !== null && beneficiaryRut !== "",
  });

  useEffect(() => {
    beneficiaryRut !== "" && refetch();
  }, [beneficiaryRut]);

  return {
    setBeneficiaryRut,
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
  const beneficiary = queryClient.getQueryData<IBeneficiary>(["beneficiary"]);
  return beneficiary;
};

const InvalidateQueries = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["beneficiary"] });
};

export { GetByRut, GetCache, InvalidateQueries };
