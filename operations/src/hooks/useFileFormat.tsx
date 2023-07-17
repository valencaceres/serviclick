import * as FileFormatSlice from "../redux/slices/fileFormatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFileFormat = () => {
  const dispatch = useAppDispatch();

  const { fileFormat, list, isLoading, isError, error } = useAppSelector(
    (state) => state.fileFormatSlice
  );

  const createFileFormat = (
    company_id: string,
    field_id: string,
    number: number
  ) => {
    dispatch(FileFormatSlice.createFileFormat(company_id, field_id, number));
  };

  const getFileFormatByCompanyId = (company_id: string) => {
    dispatch(FileFormatSlice.getFileFormatByCompanyId(company_id));
  };

  const getAllFileFormat = () => {
    dispatch(FileFormatSlice.getAllFileFormat());
  };

  const deleteFileFormatByCompanyId = (id: string) => {
    dispatch(FileFormatSlice.deleteFileFormatByCompanyId(id));
  };

  const setFileFormat = (fileFormat: any) => {
    dispatch(FileFormatSlice.setFileFormat(fileFormat));
  };

  const resetFileFormat = () => {
    dispatch(FileFormatSlice.resetFileFormat());
  };

  return {
    createFileFormat,
    getFileFormatByCompanyId,
    getAllFileFormat,
    deleteFileFormatByCompanyId,
    setFileFormat,
    resetFileFormat,
    fileFormat,
    fileFormatList: list,
    fileFormatIsLoading: isLoading,
    fileFormatIsError: isError,
    fileFormatError: error,
  };
};

export default useFileFormat;
