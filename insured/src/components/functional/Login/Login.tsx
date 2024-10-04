import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Component, Row, Cell, CellSeparator } from "../../layout/Component";

import InputText from "../../ui/InputText";
import Button from "../../ui/Button";

import { useUserInsured, useUser } from "../../../zustand/hooks";

import styles from './Login.module.scss'

const Login = () => {
  const { validate, restorePassword } = useUserInsured();
  const router = useRouter()

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleClickRestorePassword = () => {
    router.push('/restorePassword')
  }

  const handleClickEnter = () => {
    validate(loginForm.email, loginForm.password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100% - 70px)",
      }}>
      <Component>
        <Row>
          <Cell align="center">
            <InputText
              label="Correo electrónico"
              type="email"
              width="250px"
              value={loginForm.email}
              onChange={(e: any) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
          </Cell>
        </Row>
        <Row>
          <Cell align="center">
            <InputText
              label="Contraseña"
              type="password"
              width="250px"
              value={loginForm.password}
              onChange={(e: any) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </Cell>
        </Row>
        <Row>
          <CellSeparator />
        </Row>
        <Row>
          <Cell align="center">
            <Button text="Ingresar" width="200px" onClick={handleClickEnter} />
          </Cell>
        </Row>
        <Row>
          <Cell align='center'>
            <p className={styles.password} onClick={handleClickRestorePassword}>Olvidé mi contraseña</p>
          </Cell>
        </Row>
      </Component>
    </div>
  );
};

export default Login;
