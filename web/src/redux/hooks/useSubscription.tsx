import { getActivesByRutAndProductId } from "../slices/subscriptionSlice";
import { useAppDispatch, useAppSelector } from ".";

const useSubscription = () => {
  const dispatch = useAppDispatch();

  const { active } = useAppSelector((state) => state.subscriptionSlice);

  const getActiveSubscriptions = (
    customer_type: string,
    rut: string,
    product_id: string
  ) => {
    dispatch(getActivesByRutAndProductId(customer_type, rut, product_id));
  };

  return {
    getActiveSubscriptions,
    active,
  };
};

export default useSubscription;
