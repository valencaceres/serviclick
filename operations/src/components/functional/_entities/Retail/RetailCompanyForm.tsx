import { ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";

import { useRetail } from "~/hooks";

import styles from "./Retail.module.scss";

const RetailCompanyForm = () => {
  const { retail } = useRetail();

  return (
    <ContentCell gap="5px" className={styles.contentCell}>
      <ContentRow gap="5px">
        <InputText
          label="Rut"
          width={"100%"}
          value={retail?.rut}
          disabled={true}
        />
        <div style={{ width: "100%" }}></div>
      </ContentRow>
      <InputText
        label="Razón Social"
        width="100%"
        value={retail?.name}
        disabled={true}
      />
      <InputText
        label="Repsesentante Legal"
        width="100%"
        value={retail?.legalRepresentative}
        disabled={true}
      />
      <InputText
        label="Giro"
        width="100%"
        value={retail?.line}
        disabled={true}
      />
      <InputText
        label="Dirección"
        width="100%"
        value={retail?.address}
        disabled={true}
      />
      <InputText
        label="Comuna"
        width="100%"
        value={retail?.district}
        disabled={true}
      />
      <InputText
        label="Correo"
        width="100%"
        type="email"
        value={retail?.email}
        disabled={true}
      />
      <InputText
        label="Teléfono"
        width="100%"
        type="tel"
        value={retail?.phone}
        disabled={true}
      />
    </ContentCell>
  );
};

export default RetailCompanyForm;
