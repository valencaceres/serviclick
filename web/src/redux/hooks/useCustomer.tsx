import * as Customer from "../slices/customerSlice";
import { useAppDispatch, useAppSelector } from "./";

const useCustomer = () => {
  const dispatch = useAppDispatch();

  const { customer, loading: customerLoading } = useAppSelector(
    (state) => state.customerSlice
  );

  const getCustomerByRut = (rut: string) => {
    dispatch(Customer.getByRut(rut));
  };

  const createCustomer = (customer: any) => {
    dispatch(Customer.create(customer));
  };

  const resetCustomer = () => {
    dispatch(Customer.reset());
  };

  return {
    getCustomerByRut,
    createCustomer,
    resetCustomer,
    customer,
    customerLoading,
  };
};

export default useCustomer;
