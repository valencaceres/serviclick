import { filterStore } from "../zustand";

const useFilter = () => {
  const { filters } = filterStore((state) => ({
    filters: state.filters,
  }));

  const { setFilters, resetFilters } = filterStore();

  return {
    setFilters,
    filters,
    resetFilters,
  };
};

export default useFilter;
