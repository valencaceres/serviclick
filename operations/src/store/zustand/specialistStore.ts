import { getByFamilyAssistance } from "./../../redux/slices/specialistSlice";
import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  ISpecialist,
  ISpecialistItem,
  ISpecialistFamily,
  ISpecialistAssistance,
} from "../../interfaces/specialist";

interface specialistState {
  list: ISpecialistItem[];
  specialist: ISpecialist;
  families: ISpecialistFamily[];
  assistances: ISpecialistAssistance[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  set: (specialist: ISpecialist) => void;
  getFamilies: () => void;
  getAssistancesByFamilyId: (family_id: string) => void;
  getAll: () => void;
  getByRut: (rut: string) => void;
  getById: (id: string) => void;
  create: (specialist: ISpecialist) => void;
  reset: () => void;
  resetAll: () => void;
  delete: (id: string) => void;
  getBySpecialtyId: (id: string) => void;
  getByName: (name: string) => void;
  getSpecialistByDistrictAndAsssitance: (
    district: string,
    assistance_id: string
  ) => void;
}

const initialData: ISpecialist = {
  id: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  phone: "",
  address: "",
  district: "",
  birthDate: "",
  districts: [],
  specialties: [],
  isRemote: false,
};

export const specialistStore = create<specialistState>((set, get) => ({
  list: [],
  specialist: initialData,
  families: [],
  assistances: [],
  isLoading: false,
  isError: false,
  error: "",

  set: (specialist: ISpecialist) => {
    set((state) => ({ ...state, specialist }));
  },

  getFamilies: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`specialist/getFamilies`);
      set((state) => ({
        ...state,
        families: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getAssistancesByFamilyId: async (family_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `specialist/getAssistances/${family_id}`
      );
      set((state) => ({
        ...state,
        assistances: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`specialist/getAll`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`specialist/getById/${id}`);
      set((state) => ({
        ...state,
        specialist: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getByRut: async (rut: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`specialist/getByRut/${rut}`);
      if (data === null) {
        return set((state) => ({
          ...state,
          specialist: { ...initialData, rut },
          isLoading: false,
          isError: false,
        }));
      }
      set((state) => ({
        ...state,
        specialist: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getSpecialistByDistrictAndAsssitance: async (
    district: string,
    assistance_id: string
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `specialist/getByAssistanceAndDistrict/${district}/${assistance_id}`
      );
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  create: async (specialist: ISpecialist) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.post(`specialist/create`, specialist);
      set((state) => ({
        ...state,
        specialist: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () =>
    set((state) => ({
      ...state,
      specialist: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),

  resetAll: () => set({}, true),

  delete: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      await apiInstance.delete(`specialist/deleteById/${id}`);
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getBySpecialtyId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `specialist/getBySpecialtyId/${id}`
      );
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getByName: async (name: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`specialist/getByName/${name}`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
      }));
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
