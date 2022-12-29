import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

import useUI from "./useUI";
import useStage from "./useStage";
import useFamily from "./useFamily";
import useProduct from "./useProduct";
import useSubscription from "./useSubscription";
import useDonation from "./useDonation";
import useDonor from "./useDonor";
import useBroker from "./useBroker";
import useLead from "./useLead";
import useDistrict from "./useDistrict";
import useCustomer from "./useCustomer";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  useUI,
  useStage,
  useFamily,
  useProduct,
  useSubscription,
  useDonation,
  useDonor,
  useBroker,
  useLead,
  useDistrict,
  useCustomer,
};
