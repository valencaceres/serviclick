import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { apiInstance } from "../../utils/api";

const queryClient = new QueryClient();

const createCase = async (caseData: any) => {
  const { data } = await apiInstance.post(`/case/create`, caseData);
  return data;
};

const getBeneficiaryByRut = async (rut: string) => {
  const { data } = await apiInstance.get(`/case/getBeneficiaryByRut/${rut}`);

  return data;
};

const getAll = async () => {
  const { data } = await apiInstance.get(`/case/all`);
  return data;
};

const getStatistics = async () => {
  const { data } = await apiInstance.get(`/case/getStatistics`);
  return data;
};

const uploadDocument = async (formData: any) => {
  const { data } = await apiInstance.post(`/case/uploadDocument`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

const getAssistanceData = async (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  const { data } = await apiInstance.get(
    `/case/getAssistanceData/${insured_id}/${assistance_id}/${product_id}`
  );
  return data;
};

const discountAssistanceData = async (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  const { data } = await apiInstance.put(
    `/case/discountAssistanceData/${insured_id}/${assistance_id}/${product_id}`
  );
  return data;
};

const getReimbursment = async (case_id: string) => {
  const { data } = await apiInstance.get(`/case/getReimbursment/${case_id}`);
  return data;
};

const getAllReimbursements = async () => {
  const { data } = await apiInstance.get(`/case/getAllReimbursements`);
  return data;
};

const updateReimbursementStatus = async (reimbursementData: any) => {
  const { data } = await apiInstance.put(
    `/case/updateReimbursementStatus`,
    reimbursementData
  );
  return data;
};

const createChatMessage = async (messageData: any) => {
  const { data } = await apiInstance.post(
    `/case/createChatMessage`,
    messageData
  );
  return data;
};

const getUserByClerkId = async (ids: string[]) => {
  try {
    const { data } = await apiInstance.post(`/user/getByIds`, { ids });

    return data;
  } catch (error) {
    throw error;
  }
};

const getChatByCase = async (case_id: string | null) => {
  if (case_id === null || case_id === "") {
    return null;
  }

  const { data } = await apiInstance.get(`/case/getChatByCase/${case_id}`);
  return data;
};

const useGetAll = () => {
  return useQuery(["cases"], getAll);
};

const useGetStatistics = () => {
  return useQuery(["cases"], getStatistics);
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

const useGetAssistanceData = (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  return useQuery(
    ["case", insured_id, assistance_id, product_id],
    () => getAssistanceData(insured_id, assistance_id, product_id),
    {
      enabled: !!insured_id && !!assistance_id && !!product_id,
    }
  );
};

const useDiscountAssistanceData = (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  return useMutation(["case", insured_id, assistance_id, product_id], () =>
    discountAssistanceData(insured_id, assistance_id, product_id)
  );
};

const useGetReimbursment = (case_id: string) => {
  return useQuery(["caseReimburse", case_id], () => getReimbursment(case_id), {
    enabled: !!case_id,
  });
};

const useGetAllReimbursements = () => {
  return useQuery(["allReimbursements"], getAllReimbursements);
};

const useUpdateReimbursementStatus = () => {
  return useMutation(["caseReimburse"], updateReimbursementStatus);
};

const useCreateChatMessage = () => {
  return useMutation(["caseMessage"], createChatMessage);
};

const useGetChatByCase = (case_id: string) => {
  return useQuery(["caseMessages", case_id], () => getChatByCase(case_id), {
    enabled: !!case_id,
  });
};

const useGetBeneficiaryByRut = (rut: string) => {
  return useQuery(["beneficiary", rut], () => getBeneficiaryByRut(rut), {
    enabled: rut?.length > 10,
  });
};
const useGetUserByClerkId = (ids: string[]) => {
  return useQuery(["user", ids], () => getUserByClerkId(ids));
};

const createCaseSummary = async (caseSummaryData: any) => {
  const { data } = await apiInstance.post(
    `/case/createCaseSummary`,
    caseSummaryData
  );
  return data;
};

const useCreateCaseSummary = () => {
  return useMutation(["casesummary"], createCaseSummary, {
    onSuccess: () => {
      queryClient.invalidateQueries(["casesummary"]);
    },
  });
};

const useQueryCase = () => {
  return {
    useCreate,
    useGetAll,
    useUploadDocument,
    useGetAttach,
    useGetNewCaseNumber,
    useAssignPartner,
    useGetAssignedPartner,
    useAssignSpecialist,
    useGetAssignedSpecialist,
    useReimburse,
    useGetAssistanceData,
    useDiscountAssistanceData,
    useGetReimbursment,
    useGetAllReimbursements,
    useUpdateReimbursementStatus,
    useCreateChatMessage,
    useGetChatByCase,
    useGetBeneficiaryByRut,
    useGetUserByClerkId,
    useGetStatistics,
    useCreateCaseSummary,
  };
};

export default useQueryCase;
