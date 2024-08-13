import Image from "next/image";

import Card from "../../ui/Card";
import Button from "../../ui/Button";

import style from "./CardProduct.module.scss";

import { currencyFormat } from "../../../utils/format";

import freeMonth from "./images/free-month.png";

import img0e0566e816f6489888cccf98c6b37bed from "./images/thumbs/0e0566e8-16f6-4898-88cc-cf98c6b37bed.jpg";
import img0f1827b5a1f64b758392171f83870ebe from "./images/thumbs/0f1827b5-a1f6-4b75-8392-171f83870ebe.jpg";
import img8ec49ad42d6447cf949e18e05155221e from "./images/thumbs/8ec49ad4-2d64-47cf-949e-18e05155221e.jpg";
import img3239e6c902174bd595ad7a0bc3fe07e6 from "./images/thumbs/3239e6c9-0217-4bd5-95ad-7a0bc3fe07e6.jpg";
import img8370162d68fb417b8630180331832d26 from "./images/thumbs/8370162d-68fb-417b-8630-180331832d26.jpg";
import imgca51624eb2d84b30a2d48eade94d47c3 from "./images/thumbs/ca51624e-b2d8-4b30-a2d4-8eade94d47c3.jpg";

const jsonImage: { [key: string]: any } = {
  "0e0566e8-16f6-4898-88cc-cf98c6b37bed": img0e0566e816f6489888cccf98c6b37bed,
  "0f1827b5-a1f6-4b75-8392-171f83870ebe": img0f1827b5a1f64b758392171f83870ebe,
  "8ec49ad4-2d64-47cf-949e-18e05155221e": img8ec49ad42d6447cf949e18e05155221e,
  "3239e6c9-0217-4bd5-95ad-7a0bc3fe07e6": img3239e6c902174bd595ad7a0bc3fe07e6,
  "8370162d-68fb-417b-8630-180331832d26": img8370162d68fb417b8630180331832d26,
  "ca51624e-b2d8-4b30-a2d4-8eade94d47c3": imgca51624eb2d84b30a2d48eade94d47c3,
};

const CardProduct = ({ product, onClick }: any) => {
  const img = jsonImage[product.product_id];

  console.log(product);

  return (
    <Card>
      <div className={style.cardContain}>
        <div className={style.left}>
          <Image
            src={img}
            alt={`producto-${product.product_id}`}
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
          <div
            className={style.freeMonth}
            style={{ backgroundImage: `url(${freeMonth.src})` }}></div>
        </div>
      </div>
    </Card>
  );
};

export default CardProduct;
