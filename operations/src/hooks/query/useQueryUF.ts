import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const formatDate = (date: any) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

const getUFValue = async () => {
  const currentDate = formatDate(new Date());
  const { data } = await axios.get(
    `https://mindicador.cl/api/uf/${currentDate}`
  );
  return data;
};

const useGetUFValue = () => {
  return useQuery({
    queryKey: ["uf", "getValue"],
    queryFn: getUFValue,
    refetchOnWindowFocus: false,

    staleTime: Infinity,
  });
};

const useQueryUF = () => {
  return { useGetUFValue };
};

export default useQueryUF;
