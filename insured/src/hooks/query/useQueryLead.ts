import { useQuery, useMutation } from "react-query"; 

import { apiInstance } from "../../utils/api";



const addBeneficiary = async (data: any) => {
  const { data: result } = await apiInstance.post("/lead/addBeneficiary", data);
  return result;
};

const useAddBeneficiary = () => {
  return useMutation(addBeneficiary);
};


const useQueryLead = () => {
  return {
  
    useAddBeneficiary

  };
};

export default useQueryLead;
