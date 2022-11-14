import * as Retail from "../redux/slices/retailSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useRetail = () => {
  const dispatch = useAppDispatch();

  const {
    retail,
    list: retailList,
    familyList,
    productList,
    loading,
  } = useAppSelector((state) => state.retailSlice);

  const createRetail = (retail: Retail.RetailT) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.create(retail));
  };

  const getRetailById = (id: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.getById(id));
  };

  const getRetailByRut = (rut: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.getByRut(rut));
  };

  const getAllRetails = () => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.getAll());
  };

  const getFamiliesByRetailId = (id: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.getFamiliesByRetailId(id));
  };

  const getProductsByRetailIdAndFamilyId = (id: string, family_id: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.getProductsByRetailIdAndFamilyId(id, family_id));
  };

  const uploadLogo = (logo: any) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.uploadLogo(logo));
  };

  const deleteRetailById = (id: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.deleteById(id));
  };

  const setRetailList = (data: any) => {
    dispatch(Retail.setList(data));
  };

  const setRetail = (data: any) => {
    dispatch(Retail.setRetail(data));
  };

  const setRetailLogo = (base64: any) => {
    dispatch(Retail.setLogo(base64));
  };

  const resetRetail = () => {
    dispatch(Retail.resetRetail());
  };

  const resetLogo = () => {
    dispatch(Retail.resetLogo());
  };

  const reset = () => {
    dispatch(Retail.resetRetail());
  };

  return {
    createRetail,
    getAllRetails,
    getRetailById,
    getRetailByRut,
    getFamiliesByRetailId,
    getProductsByRetailIdAndFamilyId,
    uploadLogo,
    deleteRetailById,
    setRetailList,
    setRetail,
    setRetailLogo,
    resetLogo,
    resetRetail,
    reset,
    retail,
    retailList,
    familyList,
    productList,
    loading,
  };
};

export default useRetail;
