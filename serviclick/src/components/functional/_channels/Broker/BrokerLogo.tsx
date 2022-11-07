import { useState, useEffect } from "react";

import styles from "./Broker.module.scss";

import { useBroker } from "../../../../hooks";

const BrokerLogo = () => {
  const { broker, setBrokerLogo } = useBroker();

  const [base64, setBase64] = useState<any>("");

  const changeHandler = async (event: any) => {
    const image = event.target.files && event.target.files[0];
    const b64 = await convertBase64(image);
    setBrokerLogo(b64);
  };

  const convertBase64 = (image: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={styles.logo}>
      <label
        htmlFor="logoFile"
        style={{ backgroundImage: `url(${broker.logo})` }}>
        <div>Click acá para subir imagen del logo</div>
        <input
          type="file"
          id="logoFile"
          onChange={changeHandler}
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default BrokerLogo;
