import { create } from "zustand";
import { apiInstance } from "../../utils/api";

interface District {
    id: string;
    district_name: string;
  }
  interface districtStore {
    districts: District[];
    isLoading: boolean;
    isError: boolean;
    error: string;
    getDistricts: () => void;
  }
    

  export const districtStore = create<districtStore>((set) => ({
    districts: [],
    isLoading: false,
    isError: false,
    error: "",
  
    getDistricts: async () => {
      try {
        set((state) => ({ ...state, isLoading: true }));
        const { data } = await apiInstance.get(`/district/listAll`);
        set((state) => ({ ...state, districts: data, isLoading: false }));
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
  