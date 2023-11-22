import create from "zustand";
import { apiInstance } from "../../utils/api";
import { IFilters } from "~/interfaces/filters";

interface FilterState {
  filters: IFilters;
  setFilters: (newFilters: Partial<IFilters>) => void;
  resetFilters: () => void;
}

const initialData: IFilters = {
  name: "",
  page: 1,
  records: 10,
  rut: "",
};

export const filterStore = create<FilterState>((set, get) => ({
  filters: initialData,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: initialData }),
}));
