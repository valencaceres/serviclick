import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

import { ILead } from "../../interfaces/lead";

const getById = async (id: string) => {
  const { data } = await apiInstance.get(`/lead/getById/${id}`);
  return data;
};

const create = async (lead: ILead) => {
  const { data } = await apiInstance.post(`/lead/create`, lead);
  return data;
};

const GetById = () => {
  const [leadid, setLeadId] = useState("");

  const { refetch, isLoading, data, isError, error, status } = useQuery({
    queryKey: ["lead"],
    queryFn: () => getById(leadid),
    enabled: leadid !== null && leadid !== "",
  });

  return {
    setLeadId,
    refetch,
    isLoading,
    data: <ILead>data,
    isError,
    error,
    status,
  };
};

const Create = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation(
    (lead: ILead) => create(lead),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["lead"]);
      },
    }
  );

  return { mutate, isLoading, isError, error, isSuccess, data };
};

const GetCache = () => {
  const queryClient = useQueryClient();
  const lead = queryClient.getQueryData<ILead>(["lead"]);
  return lead;
};

export { GetById, Create, GetCache };
