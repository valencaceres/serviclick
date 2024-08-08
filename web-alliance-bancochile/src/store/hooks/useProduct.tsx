import { productProduct } from "../productStore";

const useProduct = () => {
  const {
    product: product,
    list: productList,
    isLoading,
    isError,
  } = productProduct((state) => ({
    product: state.product,
    list: state.productList,
    isLoading: state.isLoading,
    isError: state.isError,
  }));

  const { getProductList, getAssistancesByBrokerIdAndProductId } =
    productProduct();

  return {
    product,
    productList,
    isLoading,
    isError,
    getProductList,
    getAssistancesByBrokerIdAndProductId,
  };
};

export default useProduct;
