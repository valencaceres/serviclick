import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

import useFamily from "./useFamily";
import useProduct from "./useProduct";
import useSubscription from "./useSubscription";
import useDonation from "./useDonation";
import useDonor from "./useDonor";
import useUI from "./useUI";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useFamily, useProduct, useSubscription, useDonation, useDonor, useUI };
