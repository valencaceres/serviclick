import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import RetailLogo from "./RetailLogo";
import RetailForm from "./RetailForm";
import RetailProducts from "./RetailProducts";
import RetailUsers from "./RetailUsers";
import RetailProductsItem from "./RetailProductsItem";
import RetailUsersItem from "./RetailUsersItem";

import { ContentCell, ContentRow } from "../../../layout/Content";

import {
  LoadingMessage,
  SuccessMessage,
  ErrorMessage,
} from "../../../ui/ModalMessage";
import ModalWindow from "../../../ui/ModalWindow";

import { useRetail } from "../../../../hooks";

const RetailDetail = ({ setEnableButtonSave, isSaving, setIsSaving }: any) => {
  const router = useRouter();

  const { retail, setRetail, retailLoading, retailError } = useRetail();

  const initialDataRetailForm = {
    rut: { value: "", isValid: false },
    name: { value: "", isValid: false },
    legalRepresentative: {
      value: "",
      isValid: false,
    },
    line: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
    logo: { value: "", isValid: false },
  };

  const initialDataRetailProductForm = {
    product_id: { value: "", isValid: false },
    name: { value: "", isValid: true },
    campaign: { value: "", isValid: true },
    price: {
      company: { value: 0, isValid: false },
    },
    currency: { value: "", isValid: true },
  };

  const initialDataRetailUserForm = {
    rut: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    email: { value: "", isValid: false },
    profileCode: { value: "", isValid: false },
    profileName: { value: "", isValid: false },
  };

  const [retailForm, setRetailForm] = useState(initialDataRetailForm);
  const [retailProductForm, setRetailProductForm] = useState(
    initialDataRetailProductForm
  );
  const [retailUserForm, setRetailUserForm] = useState(
    initialDataRetailUserForm
  );
  const [showModalProducts, setShowModalProducts] = useState(false);
  const [showModalUsers, setShowModalUsers] = useState(false);

  const handleClickAddNewProduct = () => {
    setRetailProductForm(initialDataRetailProductForm);
    setShowModalProducts(true);
  };

  const handleClickEditProduct = (item: any) => {
    setRetailProductForm({
      product_id: { value: item.product_id, isValid: true },
      name: { value: item.name, isValid: true },
      campaign: { value: item.campaign, isValid: true },
      price: {
        company: { value: item.price.company, isValid: true },
      },
      currency: { value: item.currency, isValid: true },
    });
    setShowModalProducts(true);
  };

  const handleClickDeleteProduct = (item: any) => {
    setRetailProductForm(initialDataRetailProductForm);
    setRetail({
      ...retail,
      products: [
        ...retail.products.filter(
          (product: any) => product.product_id !== item.product_id
        ),
      ],
    });
  };

  const handleClickAddNewUser = () => {
    setRetailUserForm(initialDataRetailUserForm);
    setShowModalUsers(true);
  };

  const handleClickEditUser = (item: any) => {
    setRetailUserForm({
      rut: { value: item.rut, isValid: true },
      name: { value: item.name, isValid: true },
      paternalLastName: { value: item.paternalLastName, isValid: true },
      maternalLastName: { value: item.maternalLastName, isValid: true },
      email: { value: item.email, isValid: true },
      profileCode: { value: item.profileCode, isValid: true },
      profileName: { value: item.profileName, isValid: true },
    });
    setShowModalUsers(true);
  };

  const handleClickDeleteUser = (item: any) => {
    setRetailUserForm(initialDataRetailUserForm);
    setRetail({
      ...retail,
      users: [...retail.users.filter((user: any) => user.rut !== item.rut)],
    });
  };

  const handleClickSaveProduct = () => {
    setRetail({
      ...retail,
      products: [
        ...retail.products.filter(
          (product: any) =>
            product.product_id !== retailProductForm.product_id.value
        ),
        {
          product_id: retailProductForm.product_id.value,
          name: retailProductForm.name.value,
          campaign: retailProductForm.campaign.value,
          price: {
            company: retailProductForm.price.company.value,
          },
          currency: "P",
        },
      ],
    });
  };

  const handleClickSaveUser = () => {
    setRetail({
      ...retail,
      users: [
        ...retail.users.filter(
          (user: any) => user.rut !== retailUserForm.rut.value
        ),
        {
          rut: retailUserForm.rut.value,
          name: retailUserForm.name.value,
          paternalLastName: retailUserForm.paternalLastName.value,
          maternalLastName: retailUserForm.maternalLastName.value,
          email: retailUserForm.email.value,
          profileCode: retailUserForm.profileCode.value,
          profileName: retailUserForm.profileName.value,
        },
      ],
    });
  };

  const handleClickSendCredentials = () => {};

  const handleCallbakAfterError = () => {};

  useEffect(() => {
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (retail.rut === "") {
      setRetailForm(initialDataRetailForm);
    }
  }, [router]);

  return (
    <Fragment>
      <ContentRow gap="20px">
        <ContentCell gap="5px">
          <RetailLogo />
          <RetailForm
            retailForm={retailForm}
            setRetailForm={setRetailForm}
            setEnableButtonSave={setEnableButtonSave}
          />
        </ContentCell>
        <ContentCell gap="20px">
          <RetailProducts
            addNewProduct={handleClickAddNewProduct}
            editProduct={handleClickEditProduct}
            deleteProduct={handleClickDeleteProduct}
            setRetailProductForm={setRetailProductForm}
          />
          <RetailUsers
            addNewUser={handleClickAddNewUser}
            editUser={handleClickEditUser}
            deleteUser={handleClickDeleteUser}
            setRetailUserForm={setRetailUserForm}
          />
        </ContentCell>
      </ContentRow>
      <ModalWindow
        showModal={showModalProducts}
        title="Producto"
        setClosed={() => setShowModalProducts(false)}>
        <RetailProductsItem
          saveProduct={handleClickSaveProduct}
          retailProductForm={retailProductForm}
          setRetailProductForm={setRetailProductForm}
          setShowModal={setShowModalProducts}
        />
      </ModalWindow>
      <ModalWindow
        showModal={showModalUsers}
        title="User"
        setClosed={() => setShowModalUsers(false)}>
        <RetailUsersItem
          saveUser={handleClickSaveUser}
          retailUserForm={retailUserForm}
          setRetailUserForm={setRetailUserForm}
          setShowModal={setShowModalUsers}
          sendCredentials={handleClickSendCredentials}
        />
      </ModalWindow>
      {retailLoading ? (
        <LoadingMessage showModal={retailLoading} />
      ) : retailError ? (
        <ErrorMessage
          showModal={retailError}
          callback={handleCallbakAfterError}>
          Ha ocurrido un error al intentar registrar
        </ErrorMessage>
      ) : isSaving ? (
        <SuccessMessage
          showModal={!retailError}
          callback={handleCallbakAfterError}>
          Se ha registrado la información correctamente
        </SuccessMessage>
      ) : (
        <p>Espere</p>
      )}
    </Fragment>
  );
};

export default RetailDetail;
