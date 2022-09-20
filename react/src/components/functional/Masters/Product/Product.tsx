import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Modal, Window } from "../../../ui/Modal";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  setProduct,
  resetProduct,
} from "../../../../redux/slices/productSlice";

const Product = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { product } = useAppSelector((state) => state.productSlice);

  const [isLoadingSave, setIsLoadingSave] = useState(false);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const addModal = () => {
    dispatch(resetProduct());
    navigate("/masters/product");
  };

  const editModal = (id: string) => {
    dispatch(resetProduct());
    navigate(`/masters/product/${id}`);
  };

  const deleteModal = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const saveProduct = () => {
    if (product.id === "") {
      dispatch(
        createProduct(
          product.family_id,
          product.name,
          product.cost,
          product.price,
          product.isSubject,
          product.frequency,
          product.term,
          product.beneficiaries,
          product.coverages,
          product.familyValues
        )
      );
    } else {
      dispatch(
        updateProduct(
          product.id,
          product.family_id,
          product.name,
          product.cost,
          product.price,
          product.isSubject,
          product.frequency,
          product.term,
          product.beneficiaries,
          product.coverages,
          product.familyValues
        )
      );
    }
    setTimeout(() => {
      setIsLoadingSave(false);
    }, 1000);
  };

  return (
    <Fragment>
      {location.pathname.split("/")[2] === "products" ? (
        <ProductList
          addProduct={addModal}
          editProduct={editModal}
          deleteProduct={deleteModal}
        />
      ) : (
        <ProductDetail
          saveProduct={saveProduct}
          setIsLoadingSave={setIsLoadingSave}
          isLoadingSave={isLoadingSave}
        />
      )}
    </Fragment>
  );
};

export default Product;
