import Image from "next/image";
import Link from "next/link";

import config from "@/utils/config";

import ServiceImage1 from "./images/service-1.jpg";
import ServiceImage2 from "./images/service-2.jpg";
import ServiceImage3 from "./images/service-3.jpg";
import { CardHiring } from "../CardHiring";

interface Props {
  index: number;
  title: string;
  price: number;
  productId: string;
  assistances: Array<any>;
  hiringConditions: string;
}

const jsonImage: { [key: string]: any } = {
  "49983457-f1c0-40ff-89c4-eac9814f02d7": ServiceImage1,
  "a333990d-e33f-46ee-a4da-17512ce2b01a": ServiceImage2,
  "8801cbcd-139f-4603-86e2-0b8276a06ffd": ServiceImage3,
};

const color: { [key: string]: any } = {
  0: "bg-copec",
  1: "bg-laiki",
  2: "bg-secondary",
};

export const Card = ({
  title,
  price,
  productId,
  assistances,
  index,
  hiringConditions,
}: Props) => {
  return (
    <div>
      <div className={`h-8 rounded-t-3xl mb-4 ${color[index]}`}></div>
      <div className="rounded-b-3xl overflow-hidden">
        <Image
          src={jsonImage[productId]}
          width={288}
          height={176}
          alt="Servicio 1"
          className="w-full"
        />
      </div>
      <div className="text-center py-3 sm:py-6">
        <h3 className="text-lg sm:text-2xl">{title}</h3>
        <h4 className="text-2xl sm:text-3xl font-bold">
          {new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
          }).format(price)}
        </h4>
        <h4 className="font-bold">ANUAL</h4>
      </div>
      <div className="p-4 bg-slate-200 rounded-b-3xl flex flex-col items-center mb-8">
        <Link
          href={`${config.products}${productId}`}
          className={`text-xl text-white font-bold py-2 px-6 rounded-full mb-8 ${color[index]}`}>
          ¡Lo quiero!🤩
        </Link>
        <h4 className="font-black mb-4">Beneficios</h4>
        <ul>
          {assistances.map((assistance, i) => (
            <li className="text-center mb-4" key={`assistance-${i}`}>
              <h5 className="font-bold">✅ {assistance.name}</h5>
              <p>
                ({assistance.maximun ? `${assistance.maximun}, ` : ""}
                {assistance.amount
                  ? assistance?.currency == "U"
                    ? `${assistance.maximun && "tope "}${assistance.amount} UF,`
                    : "tope " +
                      new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      }).format(assistance.amount) +
                      ", "
                  : ""}
                {assistance.events
                  ? ` ${assistance.events} eventos en el año`
                  : "ilimitado"}
                ).
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <div className={`rounded-t-3xl ${color[index]} h-8`}></div>
        <div className="text-center text-2xl p-4">{title}</div>
        <CardHiring
          hiringConditions={hiringConditions}
          productPlanId={productId}
          name={title}
        />
      </div>
    </div>
  );
};
