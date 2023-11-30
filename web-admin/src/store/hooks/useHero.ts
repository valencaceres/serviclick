import { heroStore } from "../zustand";

const useHero = () => {
  const { list, isLoading, isError, error, categoryList, familyList } =
    heroStore((state) => ({
      list: state.list,
      categoryList: state.categoryList,
      familyList: state.familyList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }));

  const {
    getAll,
    post,
    updateOrder,
    deleteById,
    update,
    getCategories,
    getFamilies,
  } = heroStore();

  return {
    list,
    categoryList,
    familyList,
    getFamilies,
    getAll,
    post,
    updateOrder,
    update,
    deleteById,
    getCategories,
    isLoading,
    isError,
    error,
  };
};

export default useHero;
