import * as Subscription from "../slices/subscriptionSlice";
import { useAppDispatch, useAppSelector } from ".";

const useSubscription = () => {
  const dispatch = useAppDispatch();

  const { list, active, subscription, loading } = useAppSelector(
    (state) => state.subscriptionSlice
  );

  const getActiveSubscriptions = (
    customer_type: string,
    rut: string,
    product_id: string
  ) => {
    dispatch(
      Subscription.getActivesByRutAndProductId(customer_type, rut, product_id)
    );
  };

  const setSubscription = (subscription: Subscription.SubscriptionT) => {
    dispatch(Subscription.setSubscription(subscription));
  };

  const setActiveSubscriptions = (subscriptions: any[]) => {
    dispatch(Subscription.setActiveSubscriptions(subscriptions));
  };

  const resetSubscription = () => {
    dispatch(Subscription.resetSubscription());
  };

  return {
    setSubscription,
    setActiveSubscriptions,
    resetSubscription,
    getActiveSubscriptions,
    list,
    active,
    subscription,
    loading,
  };
};

export default useSubscription;
