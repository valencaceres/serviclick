import * as Lead from "../redux/slices/leadSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useLead = () => {
  const dispatch = useAppDispatch();

  const { lead } = useAppSelector((state) => state.leadSlice);

  // Create

  const setLeadCompany = (company: Lead.CompanyT) => {
    dispatch(Lead.setLeadCompany(company));
  };

  const setLeadCustomer = (customer: Lead.CustomerT) => {
    dispatch(Lead.setLeadCustomer(customer));
  };

  const setLeadProduct = (product: Lead.ProductT) => {
    dispatch(Lead.setLeadProduct(product));
  };

  const setLeadInsured = (insured: Lead.InsuredT[]) => {
    dispatch(Lead.setLeadInsured(insured));
  };

  const addLeadInsured = (insured: Lead.InsuredT) => {
    dispatch(Lead.addLeadInsured(insured));
  };

  const resetLead = () => {
    dispatch(Lead.resetLead());
  };

  return {
    lead,
    setLeadCompany,
    setLeadCustomer,
    setLeadProduct,
    setLeadInsured,
    addLeadInsured,
    resetLead,
  };
};

export default useLead;
