import * as Product from "../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useProduct = () => {
  const dispatch = useAppDispatch();

  const {
    product,
    list: productList,
    loading: productLoading,
  } = useAppSelector((state) => state.productSlice);

  const createProduct = (
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    minInsuredCompanyPrice: number,
    dueDay: number,
    coverages: Product.CoverageT[],
    familyValues: Product.FamilyValueT[],
    currency: string
  ) => {
    dispatch(
      Product.createProduct(
        family_id,
        name,
        cost,
        isSubject,
        frequency,
        term,
        beneficiaries,
        minInsuredCompanyPrice,
        dueDay,
        coverages,
        familyValues,
        currency
      )
    );
  };

  const assignProductPrices = (
    id: string,
    agent_id: string,
    customerprice: number,
    companyprice: number
  ) => {
    dispatch(
      Product.assignProductPrices(id, agent_id, customerprice, companyprice)
    );
  };

  const updateProduct = (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    minInsuredCompanyPrice: number,
    dueDay: number,
    coverages: Product.CoverageT[],
    familyValues: Product.FamilyValueT[],
    currency: string
  ) => {
    dispatch(
      Product.updateProduct(
        id,
        family_id,
        name,
        cost,
        isSubject,
        frequency,
        term,
        beneficiaries,
        coverages,
        minInsuredCompanyPrice,
        dueDay,
        familyValues,
        currency
      )
    );
  };

  const deleteProductById = (id: string) => {
    dispatch(Product.deleteProduct(id));
  };

  const getAllProducts = (agent_id: string) => {
    dispatch(Product.getAllProducts(agent_id));
  };

  const getProductByFamilyId = (family_id: string, agent_id: string) => {
    dispatch(Product.getProductsByFamilyId(family_id, agent_id));
  };

  const getProductById = (id: string, agent_id: string) => {
    dispatch(Product.getProductById(id, agent_id));
  };

  const setProductList = (value: Product.ProductT[]) => {
    dispatch(Product.setProductList(value));
  };

  const setProduct = (value: Product.ProductT) => {
    dispatch(Product.setProduct(value));
  };

  const resetProduct = () => {
    dispatch(Product.resetProduct());
  };

  const resetProductList = () => {
    dispatch(Product.resetProductList());
  };

  return {
    createProduct,
    assignProductPrices,
    updateProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    getProductByFamilyId,
    setProductList,
    setProduct,
    resetProduct,
    resetProductList,
    product,
    productList,
    productLoading,
  };
};

export default useProduct;
