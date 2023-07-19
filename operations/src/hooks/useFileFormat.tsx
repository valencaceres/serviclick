import * as FileFormatSlice from "../redux/slices/fileFormatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFileFormat = () => {
  const dispatch = useAppDispatch();

  const { fileFormat, list, isLoading, isError, error } = useAppSelector(
    (state) => state.fileFormatSlice
  );

  const createFileFormat = (fileFormat: FileFormatSlice.IFileFormat) => {
    dispatch(FileFormatSlice.createFileFormat(fileFormat));
  };

  const getFileFormatByLeadId = (lead_id: string) => {
    dispatch(FileFormatSlice.getFileFormatByLeadId(lead_id));
  };

  const getAllFileFormat = () => {
    dispatch(FileFormatSlice.getAllFileFormat());
  };

  const deleteFileFormatByLeadId = (lead_id: string) => {
    dispatch(FileFormatSlice.deleteFileFormatByLeadId(lead_id));
  };

  const setFileFormat = (fileFormat: any) => {
    dispatch(FileFormatSlice.setFileFormat(fileFormat));
  };

  const resetFileFormat = () => {
    dispatch(FileFormatSlice.resetFileFormat());
  };

  return {
    createFileFormat,
    getFileFormatByLeadId,
    getAllFileFormat,
    deleteFileFormatByLeadId,
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
