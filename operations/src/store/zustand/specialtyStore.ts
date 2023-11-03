import { create } from "zustand";

import { apiInstance } from "../../utils/api";
interface specialtyStore {
  specialtyList: {
    id: string;
    name: string;
    family_id: string;
    family_name: string;
  }[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByFamilyId: (id: string) => void;
  getSpecialitiesByAssistance: (id: string, assistance_id: string) => void;
  getSpecialitiesByPartner: (id: string, assistance_id: string) => void;
}

export const specialtyStore = create<specialtyStore>((set) => ({
  specialtyList: [],
  isLoading: false,
  isError: false,
  error: "",

  getByFamilyId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/specialty/getSpecialtiesByFamilyId/${id}`
      );
      set((state) => ({ ...state, specialtyList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getSpecialitiesByAssistance: async (id: string, assistance_id: string) => {
    console.log(id, assistance_id);
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/specialty/getSpecialitiesByAssistance/${id}/${assistance_id}/`
      );
      set((state) => ({ ...state, specialtyList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getSpecialitiesByPartner: async (id: string, assistance_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/specialty/getSpecialitiesByPartner/${id}/${assistance_id}/`
      );
      set((state) => ({ ...state, specialtyList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
}));
