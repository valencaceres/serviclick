import Image from "next/image";
import { useRouter } from "next/router";

import Card from "../../ui/Card";
import Button from "../../ui/Button";

import style from "./CardProduct.module.scss";

import { currencyFormat } from "../../../utils/format";

const CardProduct = ({ product, onClick }: any) => {
  return (
    <Card>
      <div className={style.cardContain}>
        <div className={style.left}>
          <Image
            src={`/images/products/thumbs/${product.product_id}.jpg`}
            alt={product.id}
            width={300}
            height={247}
          />
        </div>
        <div className={style.right}>
          <h2>{product.name}</h2>
          <div className={style.info}>Podrás obtener hasta copago $0</div>
          <div className={style.promotional}>{product.promotional}</div>
          <div className={style.price}>
            Contrátalo por solo {currencyFormat(product.price.company)}
          </div>
          <div className={style.priceNormal}>
            Valor Normal <span>{currencyFormat(product.price.base)}</span>
          </div>
          <Button
            width="135px"
            type="web"
            text="¡Lo quiero!"
            onClick={() => onClick(product.productPlan_id.customer)}
          />
          <a
            className={style.link}
            href={`/pdf/products/${product.product_id}.pdf`}
            target="_blank"
            rel="noreferrer">
            Descargar PDF
          </a>
          <div className={style.freeMonth}></div>
        </div>
      </div>
    </Card>
  );
};

export default CardProduct;
