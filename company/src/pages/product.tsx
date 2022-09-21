import { useState, Fragment, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../components/layout/Wizard";

import Button from "../components/ui/Button";
import Tooltip from "../components/ui/Tooltip";
import Navigate, { Back } from "../components/ui/Navigate";

// 2464277
import { ProductList, ProductDetail } from "../components/functional/Product";

import { getProductsAndInsuredById } from "../redux/slices/companySlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

const ProductPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state) => state.productSlice);
  const { userCompany } = useAppSelector((state) => state.userCompanySlice);

  const [showTooltip, setShowTooltip] = useState(true);

  const handleClickBack = () => {
    router.push(router.query.id ? "/product" : "/");
  };

  const handleMenuClick = () => {
    router.push("/");
  };

  const handleInsuredClick = () => {
    router.push("/insured");
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    if (userCompany.id) {
      dispatch(getProductsAndInsuredById(userCompany.id));
    }
  }, [dispatch, userCompany.id]);

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          Mis productos
          <div></div>
        </Title>
        <Content>
          {router.isReady && router.query.id ? (
            <ProductDetail id={router.query.id} />
          ) : (
            <ProductList />
          )}
        </Content>
        <Buttons>
          {router.isReady && router.query.id ? (
            <Button
              onClick={handleInsuredClick}
              text="Asegurados"
              width="150px"
            />
          ) : (
            <Button onClick={handleMenuClick} text="Menú" width="150px" />
          )}
        </Buttons>
      </Wizard>
      {router.isReady && router.query.id ? (
        <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
          <div>
            Adicionalmente haciendo click sobre el botón <b>Asegurados</b>,
            podrás revisar el detalle de estos.
          </div>
        </Tooltip>
      ) : (
        <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
          <div>
            Mediante esta opción podrás revisar la información de los productos
            que has contratado con nosotros, su cobertura, límites, cantidad de
            eventos, etc.
            <br />
            <br />
            Debes seleccionar el producto que quieres ver.
          </div>
        </Tooltip>
      )}
    </Fragment>
  );
};

export default ProductPage;
