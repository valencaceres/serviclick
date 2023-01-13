import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import BrokerLogo from "./BrokerLogo";
import BrokerForm from "./BrokerForm";
import BrokerProducts from "./BrokerProducts";
import BrokerUsers from "./BrokerUsers";
import BrokerProductsItem from "./BrokerProductsItem";
import BrokerUsersItem from "./BrokerUsersItem";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ModalWindow from "../../../ui/ModalWindow";
import { Modal } from "../../../ui/Modal";
import Icon from "../../../ui/Icon";

import { useBroker } from "../../../../hooks";

import styles from "./Broker.module.scss";

interface IFormFieldString {
  value: string;
  isValid: boolean;
}

interface IFormFieldNumber {
  value: number;
  isValid: boolean;
}

interface IBrokerForm {
  rut: IFormFieldString;
  name: IFormFieldString;
  legalRepresentative: IFormFieldString;
  line: IFormFieldString;
  fantasyName: IFormFieldString;
  address: IFormFieldString;
  district: IFormFieldString;
  email: IFormFieldString;
  phone: IFormFieldString;
  logo: IFormFieldString;
}

interface IBrokerProductForm {
  product_id: IFormFieldString;
  name: IFormFieldString;
  price: {
    customer: IFormFieldNumber;
    company: IFormFieldNumber;
  };
  commisionTypeCode: IFormFieldString;
  value: IFormFieldNumber;
  currency: IFormFieldString;
  discount: {
    type: IFormFieldString;
    percent: IFormFieldNumber;
    cicles: IFormFieldNumber;
  };
}

interface IBrokerUserForm {
  rut: IFormFieldString;
  name: IFormFieldString;
  paternalLastName: IFormFieldString;
  maternalLastName: IFormFieldString;
  email: IFormFieldString;
  profileCode: IFormFieldString;
  profileName: IFormFieldString;
}

const BrokerDetail = ({ setEnableButtonSave }: any) => {
  const router = useRouter();

  const { broker, setBroker, loading } = useBroker();

  const initialDataBrokerForm: IBrokerForm = {
    rut: { value: "", isValid: false },
    name: { value: "", isValid: false },
    legalRepresentative: {
      value: "",
      isValid: false,
    },
    line: { value: "", isValid: false },
    fantasyName: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
    logo: { value: "", isValid: false },
  };

  const initialDataBrokerProductForm: IBrokerProductForm = {
    product_id: { value: "", isValid: false },
    name: { value: "", isValid: true },
    price: {
      customer: { value: 0, isValid: false },
      company: { value: 0, isValid: false },
    },
    commisionTypeCode: {
      value: "",
      isValid: false,
    },
    value: { value: 0, isValid: false },
    currency: { value: "", isValid: false },
    discount: {
      type: { value: "", isValid: true },
      percent: { value: 0, isValid: true },
      cicles: { value: 0, isValid: true },
    },
  };

  const initialDataBrokerUserForm: IBrokerUserForm = {
    rut: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    email: { value: "", isValid: false },
    profileCode: { value: "", isValid: false },
    profileName: { value: "", isValid: false },
  };

  const [brokerForm, setBrokerForm] = useState<IBrokerForm>(
    initialDataBrokerForm
  );
  const [brokerProductForm, setBrokerProductForm] =
    useState<IBrokerProductForm>(initialDataBrokerProductForm);
  const [brokerUserForm, setBrokerUserForm] = useState<IBrokerUserForm>(
    initialDataBrokerUserForm
  );
  const [showModalProducts, setShowModalProducts] = useState(false);
  const [showModalUsers, setShowModalUsers] = useState(false);

  const handleClickAddNewProduct = () => {
    setBrokerProductForm(initialDataBrokerProductForm);
    setShowModalProducts(true);
  };

  const handleClickEditProduct = (item: any) => {
    setBrokerProductForm({
      product_id: { value: item.product_id, isValid: true },
      name: { value: item.name, isValid: true },
      price: {
        customer: { value: item.price.customer, isValid: true },
        company: { value: item.price.company, isValid: true },
      },
      commisionTypeCode: {
        value: item.commisionTypeCode,
        isValid: true,
      },
      value: { value: item.value, isValid: true },
      currency: { value: item.currency, isValid: true },
      discount: {
        type: { value: item.discount.type, isValid: true },
        percent: { value: item.discount.percent, isValid: true },
        cicles: { value: item.discount.cicles, isValid: true },
      },
    });
    setShowModalProducts(true);
  };

  const handleClickDeleteProduct = (item: any) => {
    setBrokerProductForm(initialDataBrokerProductForm);
    setBroker({
      ...broker,
      products: [
        ...broker.products.filter(
          (product: any) => product.product_id !== item.product_id
        ),
      ],
    });
  };

  const handleClickAddNewUser = () => {
    setBrokerUserForm(initialDataBrokerUserForm);
    setShowModalUsers(true);
  };

  const handleClickEditUser = (item: any) => {
    setBrokerUserForm({
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
    setBrokerUserForm(initialDataBrokerUserForm);
    setBroker({
      ...broker,
      users: [...broker.users.filter((user: any) => user.rut !== item.rut)],
    });
  };

  const handleClickSaveProduct = () => {
    setBroker({
      ...broker,
      products: [
        ...broker.products.filter(
          (product: any) =>
            product.product_id !== brokerProductForm.product_id.value
        ),
        {
          product_id: brokerProductForm.product_id.value,
          name: brokerProductForm.name.value,
          price: {
            customer: brokerProductForm.price.customer.value,
            company: brokerProductForm.price.company.value,
          },
          commisionTypeCode: brokerProductForm.commisionTypeCode.value,
          value: brokerProductForm.value.value,
          currency: "P",
          discount: {
            type: brokerProductForm.discount.type.value,
            percent: brokerProductForm.discount.percent.value,
            cicles: brokerProductForm.discount.cicles.value,
          },
        },
      ],
    });
  };

  const handleClickSaveUser = () => {
    setBroker({
      ...broker,
      users: [
        ...broker.users.filter(
          (user: any) => user.rut !== brokerUserForm.rut.value
        ),
        {
          rut: brokerUserForm.rut.value,
          name: brokerUserForm.name.value,
          paternalLastName: brokerUserForm.paternalLastName.value,
          maternalLastName: brokerUserForm.maternalLastName.value,
          email: brokerUserForm.email.value,
          profileCode: brokerUserForm.profileCode.value,
          profileName: brokerUserForm.profileName.value,
        },
      ],
    });
  };

  const handleClickSendCredentials = () => {};

  useEffect(() => {
    if (broker.rut === "") {
      setBrokerForm(initialDataBrokerForm);
    }
  }, [router]);

  return (
    <Fragment>
      <ContentRow gap="20px">
        <ContentCell gap="5px">
          <BrokerLogo />
          <BrokerForm
            brokerForm={brokerForm}
            setBrokerForm={setBrokerForm}
            setEnableButtonSave={setEnableButtonSave}
          />
        </ContentCell>
        <ContentCell gap="20px">
          <BrokerProducts
            addNewProduct={handleClickAddNewProduct}
            editProduct={handleClickEditProduct}
            deleteProduct={handleClickDeleteProduct}
            setBrokerProductForm={setBrokerProductForm}
          />
          <BrokerUsers
            addNewUser={handleClickAddNewUser}
            editUser={handleClickEditUser}
            deleteUser={handleClickDeleteUser}
            setBrokerUserForm={setBrokerUserForm}
          />
        </ContentCell>
      </ContentRow>
      <ModalWindow
        showModal={showModalProducts}
        title="Producto"
        setClosed={() => setShowModalProducts(false)}>
        <BrokerProductsItem
          saveProduct={handleClickSaveProduct}
          brokerProductForm={brokerProductForm}
          setBrokerProductForm={setBrokerProductForm}
          setShowModal={setShowModalProducts}
        />
      </ModalWindow>
      <ModalWindow
        showModal={showModalUsers}
        title="User"
        setClosed={() => setShowModalUsers(false)}>
        <BrokerUsersItem
          saveUser={handleClickSaveUser}
          brokerUserForm={brokerUserForm}
          setBrokerUserForm={setBrokerUserForm}
          setShowModal={setShowModalUsers}
          sendCredentials={handleClickSendCredentials}
        />
      </ModalWindow>
      <Modal showModal={loading}>
        <div className={styles.message}>
          <Icon iconName="refresh" />
          Por favor espere
        </div>
      </Modal>
    </Fragment>
  );
};

export default BrokerDetail;
