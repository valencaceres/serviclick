import * as Retail from "../redux/slices/retailSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useRetail = () => {
  const dispatch = useAppDispatch();

  const {
    retail,
    customers,
    selectedProduct,
    list: retailList,
    loading: retailLoading,
    error: retailError,
  } = useAppSelector((state) => state.retailSlice);

  const createRetail = (retail: Retail.RetailT) => {
    dispatch(Retail.create(retail));
  };

  const getRetailById = (id: string) => {
    dispatch(Retail.getById(id));
  };

  const getRetailByRut = (rut: string) => {
    dispatch(Retail.getByRut(rut));
  };

  const getAllRetails = () => {
    dispatch(Retail.getAll());
  };

  const getBySearchValues = (rut: string, name: string) => {
    dispatch(Retail.getBySearchValues(rut, name));
  };

  const getCustomersByRetailIdAndProductId = (
    retaail_id: string,
    product_id: string
  ) => {
    dispatch(Retail.getCustomersByRetailIdAndProductId(retaail_id, product_id));
  };

  const uploadLogo = (logo: any) => {
    dispatch(Retail.uploadLogo(logo));
  };

  const uploadExcel = (excel: any) => {
    dispatch(Retail.uploadExcel(excel));
  };

  const deleteRetailById = (id: string) => {
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

  const setSelectedProduct = (product: any) => {
    dispatch(Retail.setSelectedProduct(product));
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
    getBySearchValues,
    getCustomersByRetailIdAndProductId,
    getRetailById,
    getRetailByRut,
    uploadLogo,
    uploadExcel,
    deleteRetailById,
    setRetailList,
    setRetail,
    setRetailLogo,
    setRetailSelectedProduct: setSelectedProduct,
    resetLogo,
    resetRetail,
    reset,
    retail,
    retailProductCustomers: customers,
    retailSelectedProduct: selectedProduct,
    retailList,
    retailLoading,
    retailError,
  };
};

export default useRetail;
