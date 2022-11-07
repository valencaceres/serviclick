import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Product from "../../components/functional/_menu/Product";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useBroker } from "../../hooks";

const ProductPage = () => {
  const router = useRouter();

  const { broker, family, setTitleUI } = useUI();
  const { getProductsByBrokerIdAndFamilyId } = useBroker();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/menu/family");
  };

  useEffect(() => {
    setTitleUI("Producto");
    getProductsByBrokerIdAndFamilyId(broker.id, family.id);
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
