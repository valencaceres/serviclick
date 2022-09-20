import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Screen, Header, Body, Content } from "../../layout/Principal";
import Icon, { icons } from "../../ui/Icon";
import Menu from "../Menu";

import ChannelsPage from "../../../pages/masters/ChannelsPage";
import FamiliesPage from "../../../pages/masters/FamiliesPage";
import ProductsPage from "../../../pages/masters/ProductsPage";

import styles from "./Main.module.scss";

import { useAppSelector } from "../../../redux/hooks";
import { useAppDispatch } from "../../../redux/hooks";
import { resetUser } from "../../../redux/slices/userSlice";

import logo from "../../../img/logo.jpg";

const Main = () => {
  const dispatch = useAppDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const { user } = useAppSelector((state) => state.userSlice);

  const handleClickMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeSession = () => {
    dispatch(resetUser());
  };

  return (
    <Screen>
      <Header>
        <div className={styles.header}>
          <div className={styles.left}>
            <Icon
              iconName={icons.faBars}
              className={styles.icon}
              onClick={handleClickMenu}
            />
            <div
              className={styles.logo}
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
          </div>
          <Icon
            iconName={icons.faUser}
            className={styles.icon}
            onClick={closeSession}
          />
        </div>
      </Header>
      <Body>
        <Menu show={showMenu} setShowMenu={setShowMenu} />
        <Content>
          <Routes>
            <Route path="/masters/channels" element={<ChannelsPage />} />
            <Route path="/masters/families" element={<FamiliesPage />} />
            <Route path="/masters/products" element={<ProductsPage />} />
            <Route path="/masters/product" element={<ProductsPage />} />
            <Route path="/masters/product/:id" element={<ProductsPage />} />
          </Routes>
        </Content>
      </Body>
    </Screen>
  );
};

export default Main;
