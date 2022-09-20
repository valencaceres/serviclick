import { useState } from "react";

import { Component, Row, Cell, CellSeparator } from "../../layout/Component";

import InputText from "../../ui/InputText";
import Button from "../../ui/Button";

import { validateUserCompany } from "../../../redux/slices/userCompanySlice";
import { useAppDispatch } from "../../../redux/hooks";

const Login = () => {
  const dispatch = useAppDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleClickEnter = () => {
    dispatch(validateUserCompany(loginForm.email, loginForm.password));
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
      </Component>
    </div>
  );
};

export default Login;
