import Image from "next/image";
import { useRouter } from "next/router";

import Card from "../../ui/Card";
import Button from "../../ui/Button";

import style from "./CardProduct.module.scss";

import { currencyFormat } from "../../../utils/format";

const CardProduct = ({ product, onClick }: any) => {
  return (
    <Card>
      <Image
        src={`/images/products/thumbs/${product.product_id}.png`}
        alt={product.name}
        width={300}
        height={247}
      />
      <h2>{product.name}</h2>
      <div className={style.info}>Podrás obtener hasta copago $0</div>
      <div className={style.promotional}>{product.promotional}</div>
      <div className={style.price}>
        Contrátalo por solo {currencyFormat(product.price.company)}
      </div>
      <div className={style.priceNormal}>
        Valor Normal <span>{currencyFormat(product.price.normal)}</span>
      </div>
      <Button
        width="135px"
        type="web"
        text="¡Lo quiero!"
        onClick={() => onClick(product.productplan_id)}
      />
      <a className={style.link}>Descargar PDF</a>
    </Card>
  );
};

export default CardProduct;
