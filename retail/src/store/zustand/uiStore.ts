import { create } from "zustand";

import { type IFamily } from "~/interfaces/family";
import { type Retail } from "~/interfaces/retail";

interface IUIState {
  title: string;
  setTitle: (title: string) => void;
  retail: Retail | null;
  setRetail: (retail: Retail | null) => void;
  family: IFamily | null;
  setFamily: (family: IFamily | null) => void;
}

export const uiStore = create<IUIState>((set) => {
  const initialState = {
    title: "",
    retail: null,
    family: null,
  };
  if (typeof window !== "undefined") {
    const storedState = localStorage.getItem("uiState");
    const parsedState = storedState ? JSON.parse(storedState) : {};

    parsedState.retail = initialState.retail || parsedState.retail;
    const mergedState = { ...initialState, ...parsedState };
    set(mergedState);
  }
  return {
    ...initialState,
    setTitle: (title: string) => {
      set((state) => {
        const newState = { ...state, title };
        if (typeof window !== "undefined") {
          localStorage.setItem("uiState", JSON.stringify({ ...state, title }));
        }
        return newState;
      });
    },
    setRetail: (retail: Retail | null) => {
      set((state) => {
        const newState = { ...state, retail };
        if (typeof window !== "undefined") {
          localStorage.setItem("uiState", JSON.stringify({ ...state, retail }));
        }
        return newState;
      });
    },
    setFamily: (family: IFamily | null) => {
      set((state) => {
        const newState = { ...state, family };
        if (typeof window !== "undefined") {
          localStorage.setItem("uiState", JSON.stringify({ ...state, family }));
        }
        return newState;
      });
    },
  };
});
