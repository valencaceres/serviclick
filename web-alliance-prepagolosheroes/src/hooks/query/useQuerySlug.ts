import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

import { ISlug } from "../../interfaces/slug";

const getByCode = async (slugCode: string) => {
  const value = await apiInstance.get<ISlug>(`/slug/getByCode/${slugCode}`);
  return value.data;
};

const GetByCode = () => {
  const [slugCode, setSlugCode] = useState("");

  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["slug"],
    queryFn: () => getByCode(slugCode),
    enabled: slugCode !== null && slugCode !== "",
  });

  return {
    setSlugCode,
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
  const slug = queryClient.getQueryData<ISlug>(["slug"]);
  return slug;
};

export { GetByCode, GetCache };
