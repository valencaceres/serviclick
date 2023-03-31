import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getByFamilyAssistance = async (
  family_id: string,
  assistance_id: string
) => {
  const { data } = await apiInstance.get(
    `/specialist/getByFamilyAssistance/${family_id}/${assistance_id}`
  );
  return data;
};

const getByDistrict = async (district: string, assistance_id: string) => {
  const { data } = await apiInstance.get(
    `/specialist/getByDistrict/${district}/${assistance_id}`
  );
  return data;
};

const getAssignedSpecialist = async (case_id: string, casestage_id: string) => {
  const { data } = await apiInstance.get(
    `/caseStageSpecialist/getAssignedSpecialist/${case_id}/${casestage_id}`
  );
  return data;
};

const useGetByFamilyAssistance = (family_id: string, assistance_id: string) => {
  return useQuery(["getByFamilyAssistance", family_id, assistance_id], () =>
    getByFamilyAssistance(family_id, assistance_id)
  );
};

const useGetByDistrict = (district: string, assistance_id: string) => {
  return useQuery(
    ["getByDistrict", district, assistance_id],
    () => getByDistrict(district, assistance_id),
    {
      enabled: !!district && !!assistance_id,
    }
  );
};

const useGetAssignedSpecialist = (case_id: string, casestage_id: string) => {
  return useQuery(
    ["getAssignedSpecialist", case_id, casestage_id],
    () => getAssignedSpecialist(case_id, casestage_id),
    {
      enabled: !!case_id && !!casestage_id,
    }
  );
};

const useQuerySpecialist = () => {
  return {
    getByFamilyAssistance: useGetByFamilyAssistance,
    getByDistrict: useGetByDistrict,
    getAssignedSpecialist: useGetAssignedSpecialist,
  };
};

export default useQuerySpecialist;
