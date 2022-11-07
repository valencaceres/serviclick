import {
  getProduct,
  listProducts,
  getProductsByFamilyId,
  setProductList,
  setProduct,
  resetProduct,
  ProductT,
} from "../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useProduct = () => {
  const dispatch = useAppDispatch();

  const { product, list } = useAppSelector((state) => state.productSlice);

  const getById = (value: string) => {
    dispatch(getProduct(value));
  };

  const listAll = () => {
    dispatch(listProducts());
  };

  const getByFamilyId = (family_id: string) => {
    dispatch(getProductsByFamilyId(family_id));
  };

  const setList = (value: ProductT[]) => {
    dispatch(setProductList(value));
  };

  const set = (value: ProductT) => {
    dispatch(setProduct(value));
  };

  const reset = () => {
    dispatch(resetProduct());
  };

  return {
    getById,
    listAll,
    getByFamilyId,
    setList,
    set,
    reset,
    product,
    list,
  };
};

export default useProduct;
