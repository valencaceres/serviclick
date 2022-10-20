import {
  create,
  getById,
  getBySubscriptionId,
  set,
  setDonor,
  setSubscription,
  resetSubscription,
  reset,
  DonorT,
  DonationT,
} from "../slices/donationSlice";
import { useAppDispatch, useAppSelector } from ".";

const useDonation = () => {
  const dispatch = useAppDispatch();

  const { donation, list } = useAppSelector((state) => state.donationSlice);

  const createDonation = (donation: DonationT) => {
    dispatch(create(donation));
  };

  const getDonationById = (id: string) => {
    dispatch(getById(id));
  };

  const getDonationBySubscriptionId = (subscription_id: number) => {
    dispatch(getBySubscriptionId(subscription_id));
  };

  const setDonation = (donation: DonationT) => {
    dispatch(set(donation));
  };

  const setDonationDonor = (donor: DonorT) => {
    dispatch(setDonor(donor));
  };

  const setDonationSubscription = (subscription_id: number) => {
    dispatch(setSubscription(subscription_id));
  };

  const resetDonationSubscription = () => {
    dispatch(resetSubscription());
  };

  const resetDonation = () => {
    dispatch(reset());
  };

  return {
    createDonation,
    getDonationById,
    getDonationBySubscriptionId,
    setDonation,
    setDonationDonor,
    setDonationSubscription,
    resetDonationSubscription,
    resetDonation,
    donation,
    list,
  };
};

export default useDonation;
