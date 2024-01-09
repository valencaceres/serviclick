import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "~/utils/api";

const queryClient = new QueryClient();

const getByRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/insured/getByRut/${rut}`);
  return data;
}

const useGetByRut = (rut: string) => {
  return useQuery(
    ["insured", rut],
    () => getByRut(rut), {
    enabled: rut?.length >= 10,
    retry: false,
  }
  );
}

const getById = async (id: string) => {
  const { data } = await apiInstance.get(`/insured/getById/${id}`);
  return data;
}

const useGetById = (id: string) => {
  return useQuery(
    ["insured", id],
    () => getById(id), {
    enabled: !!id,
  }
  );
}

const getCustomerAccountByInsuredRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/customer/getCustomerAccount/${rut}`);
  return data;
}

const useGetCustomerAccountByInsuredRut = (rut: string) => {
  return useQuery(
    ["insured", rut],
    () => getCustomerAccountByInsuredRut(rut), {
    enabled: rut?.length >= 10,
    retry: false,
  }
  );
}

const updateCustomerAccount = async (customerAccountData: any) => {
  const { data } = await apiInstance.put(`/customer/updateCustomerAccount`, customerAccountData);
  return data;
};

const useUpdateCustomerAccount = () => {
  return useMutation(["customer"], updateCustomerAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(["customer"]);
    },
  });
};

const useQueryInsured = () => {
  return { useGetByRut, useGetById, useGetCustomerAccountByInsuredRut, useUpdateCustomerAccount };
}

export default useQueryInsured;

