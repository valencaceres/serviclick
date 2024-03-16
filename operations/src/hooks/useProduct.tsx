import * as Product from "../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useProduct = () => {
  const dispatch = useAppDispatch();

  const {
    product,
    list: productList,
    families,
    error: productError,
    loading: productLoading,
  } = useAppSelector((state) => state.productSlice);

  const createProduct = (
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: Product.FrequencyT,
    term: number,
    beneficiaries: number,
    currency: string,
    dueDay: number,
    minInsuredCompanyPrice: number,
    title: string,
    subTitle: string,
    description: string,
    territorialScope: string,
    hiringConditions: string,
    assistances: Product.AssistanceT[]
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
        currency,
        dueDay,
        minInsuredCompanyPrice,
        title,
        subTitle,
        description,
        territorialScope,
        hiringConditions,
        assistances
      )
    );
  };

  const assignProductPrices = (
    id: string,
    agent_id: string,
    customerprice: number,
    companyprice: number,
    yearlyprice: number
  ) => {
    dispatch(
      Product.assignProductPrices(
        id,
        agent_id,
        customerprice,
        companyprice,
        yearlyprice
      )
    );
  };

  const updateProduct = (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: Product.FrequencyT,
    term: number,
    beneficiaries: number,
    currency: string,
    dueDay: number,
    minInsuredCompanyPrice: number,
    title: string,
    subTitle: string,
    description: string,
    territorialScope: string,
    hiringConditions: string,
    assistances: Product.AssistanceT[]
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
        currency,
        dueDay,
        minInsuredCompanyPrice,
        title,
        subTitle,
        description,
        territorialScope,
        hiringConditions,
        assistances
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

  const getOnlyProductById = (id: string) => {
    dispatch(Product.getOnlyProductById(id));
  };

  const getByProductPlanId = (productPlan_id: string) => {
    dispatch(Product.getByProductPlanId(productPlan_id));
  };

  const getProductFamilies = () => {
    dispatch(Product.getFamilies());
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
    getOnlyProductById,
    getProductById,
    getByProductPlanId,
    getProductByFamilyId,
    getProductFamilies,
    setProductList,
    setProduct,
    resetProduct,
    resetProductList,
    product,
    productList,
    families,
    productError,
    productLoading,
  };
};

export default useProduct;
