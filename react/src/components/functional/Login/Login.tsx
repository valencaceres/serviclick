import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";

import Screen from "../../layout/Principal/Screen";

import {
  Component,
  Row,
  Cell,
  CellSeparator,
  CellAlign,
} from "../../layout/Generic";

import InputText from "../../ui/InputText";
import Button from "../../ui/Button";
import Link from "../../ui/Link";

import styles from "./Login.module.scss";

import { validateUser } from "../../../redux/slices/userSlice";

import logo from "../../../img/logo.jpg";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickEnter = () => {
    dispatch(validateUser(email, password));
    navigate("/");
  };

  return (
    <Screen>
      <Component>
        <Row>
          <Cell>
            <div
              className={styles.logo}
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
          </Cell>
        </Row>
        <Row>
          <CellSeparator />
        </Row>
        <Row>
          <Cell>
            <InputText
              id="login_email"
              label="Correo electrónico"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              width="300px"
            />
            <InputText
              id="login_password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              width="300px"
            />
          </Cell>
        </Row>
        <Row>
          <CellSeparator />
        </Row>
        <Row>
          <Cell>
            <Button onClick={handleClickEnter} text="Ingresar" width="200px" />
          </Cell>
        </Row>
        <Row>
          <CellSeparator />
        </Row>
        <Row>
          <Cell>
            <Link url="#" label="Olvidé mi contraseña" />
          </Cell>
        </Row>
      </Component>
    </Screen>
  );
};

export default Login;
