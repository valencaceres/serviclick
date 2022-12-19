import { ContentCell, ContentRow } from "../../layout/Content";
import Button from "../Button";
import Icon from "../Icon";
import ModalWindow from "../ModalWindow";

import styles from "./ModalWarning.module.scss";

const ModalWarning = ({
  showModal,
  title,
  message,
  setClosed,
  iconName,
  buttons,
}: any) => {
  return (
    <ModalWindow showModal={showModal} title={title} setClosed={setClosed}>
      <ContentCell gap="20px" align="center">
        <ContentRow gap="20px">
          {iconName && (
            <Icon iconName="warning" className={styles.orange} size="50px" />
          )}
          <ContentCell align="center">
            <div className={styles.message}>{message}</div>
          </ContentCell>
        </ContentRow>
        <ContentRow gap="5px">
          {buttons.map((button: any, idx: number) => (
            <Button
              key={idx}
              text={button.text}
              width="100px"
              onClick={button.function}
            />
          ))}
        </ContentRow>
      </ContentCell>
    </ModalWindow>
  );
};

export default ModalWarning;
