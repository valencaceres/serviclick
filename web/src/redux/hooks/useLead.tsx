import * as Lead from "../slices/leadSlice";
import { useAppDispatch, useAppSelector } from ".";

const useLead = () => {
  const dispatch = useAppDispatch();

  const {
    lead,
    list: leadList,
    loading: leadLoading,
    error: leadError,
  } = useAppSelector((state) => state.leadSlice);

  const getLeadById = (leadId: string) => {
    dispatch(Lead.getLeadById(leadId));
  };

  const getLeadBySubscriptionId = (subscriptionId: number) => {
    dispatch(Lead.getLeadBySubscriptionId(subscriptionId));
  };

  const createLead = (
    lead: Lead.LeadT,
    sendPaymentLink: boolean,
    createSubscription: boolean
  ) => {
    dispatch(Lead.createLead(lead, sendPaymentLink, createSubscription));
  };

  const updateLead = (id: string, name: string, isBroker: boolean) => {
    dispatch(Lead.updateLead(id, name, isBroker));
  };

  const deleteLead = (id: string) => {
    dispatch(Lead.deleteLead(id));
  };

  const createSubscription = (
    plan_id: number,
    email: string,
    name: string,
    amount: number,
    address: string,
    rut: string,
    phone: string
  ) => {
    dispatch(
      Lead.createSubscription(plan_id, email, name, amount, address, rut, phone)
    );
  };

  const setLeadAgent = (agent_id: string) => {
    dispatch(Lead.setLeadAgent(agent_id));
  };

  const setLeadCustomer = (customer: Lead.CustomerT) => {
    dispatch(Lead.setLeadCustomer(customer));
  };

  const setLeadCompany = (company: Lead.CompanyT) => {
    dispatch(Lead.setLeadCompany(company));
  };

  const setLeadInsured = (insured: Lead.InsuredT[]) => {
    dispatch(Lead.setLeadInsured(insured));
  };

  const setLeadProduct = (product: Lead.ProductT) => {
    dispatch(Lead.setLeadProduct(product));
  };

  const resetLeadSubscription = () => {
    dispatch(Lead.resetLeadSubscription());
  };

  const resetLead = () => {
    dispatch(Lead.resetLead());
  };

  return {
    setLeadAgent,
    setLeadCustomer,
    setLeadCompany,
    setLeadInsured,
    setLeadProduct,
    resetLeadSubscription,
    resetLead,
    getLeadById,
    getLeadBySubscriptionId,
    createLead,
    updateLead,
    deleteLead,
    createSubscription,
    lead,
    leadList,
    leadLoading,
    leadError,
  };
};

export default useLead;
