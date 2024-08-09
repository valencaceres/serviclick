import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiInstance } from "../utils/api";

export const getAll = async () => {
  const { data } = await apiInstance.get(`/channel/list`);
  return data;
};
