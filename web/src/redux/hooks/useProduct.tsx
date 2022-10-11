import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  getProductsByFamilyId,
  setProductList,
  setProduct,
  resetProduct,
  resetProductList,
  ProductT,
  PriceT,
  CoverageT,
  FamilyValueT,
} from "../slices/productSlice";
import { useAppDispatch, useAppSelector } from ".";

const useProduct = () => {
  const dispatch = useAppDispatch();

  const { product, list } = useAppSelector((state) => state.productSlice);

  const create = (
    family_id: string,
    name: string,
    cost: number,
    price: PriceT,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    coverages: CoverageT[],
    familyValues: FamilyValueT[],
    currency: string
  ) => {
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
        familyValues,
        currency
      )
    );
  };

  const update = (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    price: PriceT,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    coverages: CoverageT[],
    familyValues: FamilyValueT[],
    currency: string
  ) => {
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
        familyValues,
        currency
      )
    );
  };

  const deleteById = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const getById = (id: string) => {
    dispatch(getProduct(id));
  };

  const getAll = () => {
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

  const resetList = () => {
    dispatch(resetProductList());
  };

  return {
    create,
    update,
    deleteById,
    getById,
    getAll,
    getByFamilyId,
    setList,
    set,
    reset,
    resetList,
    product,
    list,
  };
};

export default useProduct;
