import { useState, useEffect, Fragment } from "react";
import { useUser } from "@clerk/nextjs";

import { Content, ContentCell } from "../../layout/Content";

import Icon from "../../ui/Icon";
import ButtonLink from "../../ui/ButtonLink";
import ModalWindow from "../../ui/ModalWindow";
import InputText from "../../ui/InputText";
import Button from "../../ui/Button";

import styles from "./Welcome.module.scss";

import { useUI } from "../../../hooks";
import Image from "next/image";

const Welcome = () => {
  const { user } = useUser();
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Inicio");
  }, []);

  return (
    <Fragment>
      <Content align="center">
        <ContentCell align="center" gap="20px">
          <div className="h-48 w-48">
            <Image
              alt="User profile picture"
              src={user?.profileImageUrl!}
              width={200}
              height={200}
              className={"h-48 w-48 rounded-full object-cover"}
            />
          </div>
          <div className="text-2xl font-bold text-teal-blue">
            Bienvenido {user?.firstName ? user?.firstName : ""}
          </div>
        </ContentCell>
      </Content>
    </Fragment>
  );
};

export default Welcome;
