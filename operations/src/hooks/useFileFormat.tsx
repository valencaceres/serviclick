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

  const getFileFormatByProductPlanId = (productPlan_id: string) => {
    dispatch(FileFormatSlice.getFileFormatByProductPlanId(productPlan_id));
  };

  const getAllFileFormat = () => {
    dispatch(FileFormatSlice.getAllFileFormat());
  };

  const deleteFileFormatByProductPlanId = (productPlan_id: string) => {
    dispatch(FileFormatSlice.deleteFileFormatByProductPlanId(productPlan_id));
  };

  const setFileFormat = (fileFormat: any) => {
    dispatch(FileFormatSlice.setFileFormat(fileFormat));
  };

  const resetFileFormat = () => {
    dispatch(FileFormatSlice.resetFileFormat());
  };

  return {
    createFileFormat,
    getFileFormatByProductPlanId,
    getAllFileFormat,
    deleteFileFormatByProductPlanId,
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
