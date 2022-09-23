import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  ProductDetail,
  ProductList,
} from "../../components/functional/_masters/Product";

import useUI from "../../hooks/useUI";

import { listProducts } from "../../redux/slices/productSlice";
import { useAppDispatch } from "../../redux/hooks";

const Product = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Producto");
    dispatch(listProducts());
  }, []);

  return router.isReady && router.query.id ? (
    <ProductDetail />
  ) : (
    <ProductList />
  );
};

export default Product;
