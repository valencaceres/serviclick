import { create } from "zustand";

import { IRelationship } from "../interfaces/relationship";

interface relationshipState {
  list: IRelationship[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setList: (list: IRelationship[]) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IRelationship = {
  id: "",
  name: "",
};

export const relationshipStore = create<relationshipState>((set, get) => ({
  list: [],
  isLoading: false,
  isError: false,
  error: "",

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },

  setIsError: (isError: boolean) => {
    set((state) => ({ ...state, isError }));
  },

  setError: (error: string) => {
    set((state) => ({ ...state, error }));
  },

  setList: (list: IRelationship[]) => {
    set((state) => ({ ...state, list }));
  },

  reset: () => set((state) => ({ ...state, relationship: [] })),

  resetAll: () => set({}, true),
}));
