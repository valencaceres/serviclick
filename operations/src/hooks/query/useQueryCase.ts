import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const createCase = async (caseData: any) => {
  const { data } = await apiInstance.post(`/case/create`, caseData);
  return data;
};

const getAll = async () => {
  const { data } = await apiInstance.get(`/case/all`);
  return data;
};

const getCaseById = async (id: string) => {
  const { data } = await apiInstance.get(`/case/getById/${id}`);
  return data;
};

const uploadDocument = async (formData: any) => {
  const { data } = await apiInstance.post(`/case/uploadDocument`, formData);
  return data;
};

const getAttach = async (case_id: string, casestage_id: string) => {
  const { data } = await apiInstance.get(
    `/case/getAttachById/${case_id}/${casestage_id}`
  );
  return data;
};

const getNewCaseNumber = async () => {
  const { data } = await apiInstance.get(`/case/getNewCaseNumber`);
  return data;
};

const assignPartner = async (newPartner: any) => {
  const { data } = await apiInstance.post(`/case/assignPartner`, newPartner);
  return data;
};

const getAssignedPartner = async (case_id: string, casestage_id: string) => {
  const { data } = await apiInstance.get(
    `/case/getAssignedPartner/${case_id}/${casestage_id}`
  );
  return data;
};

const reimburse = async (reimburseData: any) => {
  const { data } = await apiInstance.post(`/case/reimburse`, reimburseData);
  return data;
};

const assignSpecliast = async (newSpecialist: any) => {
  const { data } = await apiInstance.post(
    `/case/assignSpecialist`,
    newSpecialist
  );
  return data;
};

const getAssignedSpecialist = async (case_id: string, casestage_id: string) => {
  const { data } = await apiInstance.get(
    `/case/getAssignedSpecialist/${case_id}/${casestage_id}`
  );
  return data;
};

const useGetAll = () => {
  return useQuery(["cases"], getAll);
};

const useGetById = (id: string) => {
  return useQuery(["case", id], () => getCaseById(id));
};

const useCreate = () => {
  return useMutation(["case"], createCase, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useUploadDocument = () => {
  return useMutation(["case"], uploadDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useGetAttach = (case_id: string, casestage_id: string) => {
  return useQuery(
    ["case", case_id, casestage_id],
    () => getAttach(case_id, casestage_id),
    {
      enabled: !!case_id && !!casestage_id,
    }
  );
};

const useGetNewCaseNumber = () => {
  return useQuery(["newCase"], getNewCaseNumber);
};

const useAssignPartner = () => {
  return useMutation(["case"], assignPartner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useGetAssignedPartner = (case_id: string, casestage_id: string) => {
  return useQuery(
    ["case", case_id, casestage_id],
    () => getAssignedPartner(case_id, casestage_id),
    {
      enabled: !!case_id && !!casestage_id,
    }
  );
};

const useAssignSpecialist = () => {
  return useMutation(["case"], assignSpecliast, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useGetAssignedSpecialist = (case_id: string, casestage_id: string) => {
  return useQuery(
    ["case", case_id, casestage_id],
    () => getAssignedSpecialist(case_id, casestage_id),
    {
      enabled: !!case_id && !!casestage_id,
    }
  );
};

const useReimburse = () => {
  return useMutation(["case"], reimburse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["case"]);
    },
  });
};

const useQueryCase = () => {
  return {
    useCreate,
    useGetAll,
    useGetById,
    useUploadDocument,
    useGetAttach,
    useGetNewCaseNumber,
    useAssignPartner,
    useGetAssignedPartner,
    useAssignSpecialist,
    useGetAssignedSpecialist,
    useReimburse,
  };
};

export default useQueryCase;
