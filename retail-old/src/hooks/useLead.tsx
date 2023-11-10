import * as Lead from "../redux/slices/leadSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useLead = () => {
  const dispatch = useAppDispatch();

  const {
    lead,
    loading: leadLoading,
    error: leadError,
  } = useAppSelector((state) => state.leadSlice);

  const createLead = (
    lead: Lead.LeadT,
    sendPaymentLink: boolean,
    createSubscription: boolean
  ) => {
    dispatch(Lead.createLead(lead, sendPaymentLink, createSubscription));
  };

  const setLead = (lead: Lead.LeadT) => {
    dispatch(Lead.setLead(lead));
  };

  const setAgentId = (id: string) => {
    dispatch(Lead.setAgentId(id));
  };

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
    leadLoading,
    leadError,
    createLead,
    setLead,
    setAgentId,
    setLeadCompany,
    setLeadCustomer,
    setLeadProduct,
    setLeadInsured,
    addLeadInsured,
    resetLead,
  };
};

export default useLead;
