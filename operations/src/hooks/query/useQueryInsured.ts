import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const getByRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/insured/getByRut/${rut}`);
  return data;
}

const useGetByRut = (rut: string) => {
  return useQuery(
    ["insured", rut],
    () => getByRut(rut), {
      enabled: rut?.length >= 10,

    }
  );
}

const useQueryInsured = () => {
  return { useGetByRut };
}

export default useQueryInsured;

