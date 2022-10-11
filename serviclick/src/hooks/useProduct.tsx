import {
  createProduct,
  updateProduct,
  createProductPlans,
  deleteProduct,
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

  const create = (
    family_id: string,
    name: string,
    cost: number,
    price: any,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    minInsuredCompanyPrice: number,
    dueDay: number,
    coverages: any,
    familyValues: any
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
        minInsuredCompanyPrice,
        dueDay,
        coverages,
        familyValues
      )
    );
  };

  const update = (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    price: any,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    minInsuredCompanyPrice: number,
    dueDay: number,
    coverages: any,
    familyValues: any
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
        minInsuredCompanyPrice,
        dueDay,
        coverages,
        familyValues
      )
    );
  };

  const createPlans = (
    id: string,
    dueDay: number,
    trialCicles: any,
    discount: any
  ) => {
    dispatch(createProductPlans(id, dueDay, trialCicles, discount));
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
    create,
    update,
    createPlans,
    deleteById,
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
