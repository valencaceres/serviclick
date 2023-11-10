import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Product from "../../components/functional/_menu/Product";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useRetail } from "../../hooks";

const ProductPage = () => {
  const router = useRouter();

  const { retail, family, setTitleUI } = useUI();
  const { getProductsByRetailIdAndFamilyId } = useRetail();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/menu/family");
  };

  useEffect(() => {
    setTitleUI("Producto");
    getProductsByRetailIdAndFamilyId(retail.id, family.id);
  }, []);

  return (
    <Fragment>
      <Product />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default ProductPage;
