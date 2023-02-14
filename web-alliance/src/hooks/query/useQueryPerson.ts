import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

import { IPerson } from "../../interfaces/person";

const getByRut = async (rut: string, type: string) => {
  const value = await apiInstance.get<IPerson>(
    `/contractor/getByRut/${rut}/${type}`
  );
  return value.data;
};

const GetByRut = () => {
  const [personRut, setPersonRut] = useState("");

  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["person"],
    queryFn: () => getByRut(personRut, "P"),
    enabled: personRut !== null && personRut !== "",
  });

  useEffect(() => {
    personRut !== "" && refetch();
  }, [personRut]);

  return {
    setPersonRut,
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
  const person = queryClient.getQueryData<IPerson>(["person"]);
  return person;
};

export { GetByRut, GetCache };
