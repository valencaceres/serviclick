import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ProductDetail } from "~/components/functional/_masters/Product";
import { useUI } from "~/hooks";
import { useQueryProduct } from "~/hooks/query";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();

  const { data: product } = useQueryProduct().useGetById(
    router.query.id as string
  );

  useEffect(() => {
    if (!product) return;
    setTitleUI(`Producto - ${product?.name}`);
  }, [product, setTitleUI]);

  if (!product) return null;

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
