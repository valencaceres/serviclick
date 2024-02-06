import { useQuery } from "react-query"; 

import { apiInstance } from "../../utils/api";

const getByRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/beneficiary/getByRut/${rut}`);
  return data;
}

const useGetByRut = (rut: string) => {
  return useQuery(
    ["beneficiary", rut],
    () => getByRut(rut), {
      enabled: rut?.length >= 10,
    }
  );
}

const useQueryBeneficiary = () => {
  return { useGetByRut };
}

export default useQueryBeneficiary;

