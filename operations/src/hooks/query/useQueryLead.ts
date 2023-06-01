import { useMutation, useQuery } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const create = async (data: any) => {
  const { data: result } = await apiInstance.post("/lead/create", data);
  return result;
};

const addProduct = async (data: any) => {
  const { data: result } = await apiInstance.post("/lead/addProduct", data);
  return result;
};

const useAddProduct = () => {
  return useMutation(addProduct);
};

const addInsured = async (data: any) => {
  const { data: result } = await apiInstance.post("/lead/addInsured", data);
  return result;
};

const useAddInsured = () => {
  return useMutation(addInsured);
};

const addBeneficiary = async (data: any) => {
  const { data: result } = await apiInstance.post(
    "/lead/addBeneficiary",
    data
  );
  return result;
};

const useAddBeneficiary = () => {
  return useMutation(addBeneficiary);
};

const getContract = async (lead_id: string) => {
  const { data: result } = await apiInstance.get(
    `/lead/getContract/${lead_id}`
  );
  return result;
};

const useGetContract = (lead_id: string) => {
  return useQuery(["getContract"], () => getContract(lead_id), {
    enabled: !!lead_id,
  });
};

const useQueryLead = () => {
  return {
    useAddProduct,
    useAddInsured,
    useAddBeneficiary,
    useGetContract,
  };
};

export default useQueryLead;
