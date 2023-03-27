import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getByFamilyId = async (id: string) => {
  const { data } = await apiInstance.get(`/partner/getByFamilyId/${id}`);
  return data;
};

const useGetByFamilyId = (id: string) => {
  return useQuery(["partner/getByFamilyId", id], () => getByFamilyId(id));
};

const useQueryPartner = () => {
  return { useGetByFamilyId };
};

export default useQueryPartner;
