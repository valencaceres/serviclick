import * as Customer from "../redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useCustomer = () => {
  const dispatch = useAppDispatch();

  const { customer } = useAppSelector((state) => state.customerSlice);

  const getCustomerByRut = (rut: string) => {
    dispatch(Customer.setLoading(true));
    dispatch(Customer.getByRut(rut));
  };

  const resetCustomer = () => {
    dispatch(Customer.reset());
  };

  return {
    getCustomerByRut,
    resetCustomer,
    customer,
  };
};

export default useCustomer;
