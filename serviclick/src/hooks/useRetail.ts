import * as Retail from "../redux/slices/retailSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useRetail = () => {
  const dispatch = useAppDispatch();

  const {
    retail,
    list: retailList,
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

  const uploadLogo = (logo: any) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.uploadLogo(logo));
  };

  const deleteRetailById = (id: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.deleteById(id));
    dispatch(Retail.getAll());
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

  const addProduct = (id: string, product: Retail.ProductT, number: number) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.addProduct(id, product, number));
  };

  const removeProduct = (id: string, product_id: string) => {
    dispatch(Retail.setLoading(true));
    dispatch(Retail.removeProduct(id, product_id));
  };

  return {
    createRetail,
    getAllRetails,
    getRetailById,
    getRetailByRut,
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
    loading,
    addProduct,
    removeProduct,
  };
};

export default useRetail;
