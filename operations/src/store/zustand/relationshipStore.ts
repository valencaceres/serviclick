import { create } from "zustand";
import { apiInstance } from "~/utils/api";
export interface IRelationship {
  id: string;
  name: string;
}

interface relationshipState {
  relationshipList: IRelationship[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  getAll: () => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IRelationship = {
  id: "",
  name: "",
};

export const relationshipStore = create<relationshipState>((set, get) => ({
  relationship: initialData,
  relationshipList: [],
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



  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/relationship/getAll`);
      set((state) => ({ ...state, relationshipList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, relationship: initialData })),

  resetAll: () => set({}, true),
}));
