import { useQuery } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const getByFamilyId = async (family_id: string) => {
  const { data } = await apiInstance.get(
    `/document/getDocumentsByFamilyId/${family_id}`
  );
  return data;
};

const useGetByFamilyId = (family_id: string) => {
  return useQuery({
    queryKey: ["document", family_id],
    queryFn: () => getByFamilyId(family_id),
    enabled: !!family_id,
  });
};

const useQueryDocument = () => {
  return {
    useGetByFamilyId,
  };
};

export default useQueryDocument;
