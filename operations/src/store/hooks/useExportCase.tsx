import { caseExportStore } from "../zustand";

const useExportCase = () => {
  const {
    list,
    retailsList,
    isLoading: isLoading,
    caseEventDate,
    caseDate,
    excel,
    isError: isError,
    error: error,
  } = caseExportStore((state) => ({
   list: state.caseList,
   retailsList: state.retailList,
   caseDate: state.caseDates,
   excel: state.excel,
   caseEventDate: state.caseEventDates,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
 getAll ,getRetails, getCaseDates, exportCases, resetExcel,
  } = caseExportStore();

  return {
  getAll,
  caseDate,
  getCaseDates,
  resetExcel,
   caseEventDate,
   exportCases, excel,
  getRetails,
  list,
  retailsList,
  isLoading,
  isError,
  error
  };
};

export default useExportCase;
