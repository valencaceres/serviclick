import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  setProductList,
  setProduct,
  resetProduct,
  ProductT,
} from "../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useProduct = () => {
  const dispatch = useAppDispatch();

  const { product, list } = useAppSelector((state) => state.productSlice);

  const create = (value: ProductT) => {
    const {
      family_id,
      name,
      cost,
      price,
      isSubject,
      frequency,
      term,
      beneficiaries,
      coverages,
      familyValues,
    } = value;
    dispatch(
      createProduct(
        family_id,
        name,
        cost,
        price,
        isSubject,
        frequency,
        term,
        beneficiaries,
        coverages,
        familyValues
      )
    );
  };

  const update = (value: ProductT) => {
    const {
      id,
      family_id,
      name,
      cost,
      price,
      isSubject,
      frequency,
      term,
      beneficiaries,
      coverages,
      familyValues,
    } = value;
    dispatch(
      updateProduct(
        id,
        family_id,
        name,
        cost,
        price,
        isSubject,
        frequency,
        term,
        beneficiaries,
        coverages,
        familyValues
      )
    );
  };

  const deleteById = (value: string) => {
    dispatch(deleteProduct(value));
  };

  const getById = (value: string) => {
    dispatch(getProduct(value));
  };

  const listAll = () => {
    dispatch(listProducts());
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
    create,
    update,
    deleteById,
    getById,
    listAll,
    setList,
    set,
    reset,
    product,
    list,
  };
};

export default useProduct;
