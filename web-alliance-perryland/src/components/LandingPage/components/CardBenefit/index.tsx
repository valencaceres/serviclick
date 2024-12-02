import Image from "next/image"
import { CardHiring } from "../CardHiring"
import { ICardBenefit } from "@/utils/interfaces/CardBenefit"

interface Props extends ICardBenefit{}

import ServiceImage1 from './images/service-1.png';
import ServiceImage2 from './images/service-2.png';
import ServiceImage3 from './images/service-1.png';

const jsonImage: { [key: string]: any } = {
    "c1426dd4-3133-4b94-b24a-d64bb0964b3e": ServiceImage1,
    "cc2ab9c0-3999-42ff-ba86-0689276cff04": ServiceImage2,
    "e9164b41-04f4-4a5a-900f-3507765b6dc5": ServiceImage3,
};

export default function CardBenefit({id, productplan_id, hiring_conditions, image, name, price, detail, assistances}: Props){
    return(
        <div>
            <div className="bg-primary h-5 rounded-t-3xl mb-2"></div>
            <div className="rounded-b-3xl overflow-hidden">
                <Image src={jsonImage[id]} width={288} height={176} alt="" className="w-full"/>
            </div>
            <div className="text-center pt-4 pb-5">
                <h3 className="text-2xl">{name}</h3>
                <p className="text-3xl font-bold my-1">{new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 0}).format(Number(price))}</p>
                <p className="font-medium">{detail}</p>
            </div>
            <div className="bg-gray-light pt-4 pb-8 px-8 flex flex-col items-center rounded-b-3xl mb-10">
                <button className="bg-secondary h-10 px-8 text-white rounded-full text-xl mb-7">¡Lo quiero!🤩</button>
                <h4 className="font-black text-lg mb-3.5">Beneficios</h4>
                {assistances?.map((benefit, i) => (
                    <div key={`card-benefit-detail-${i}`} className="w-full mb-3.5 text-sm">
                        <h5 className="font-extrabold">{benefit.name}</h5>
                        <ul>
                            <li>{ benefit.maximun } tope {benefit.currency == 'U' ? `${benefit.amount}UF`: new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 0}).format(benefit.amount)} </li>
                            <li>{ benefit.events } Evento al año</li>
                        </ul>
                    </div>
                ))}
            </div>
            <div className="bg-primary h-5 rounded-t-3xl mb-2"></div>
            <div className="py-2">
                <h4 className="text-center text-2xl font-bold">{name}</h4>
            </div>
            <CardHiring
                hiringConditions={hiring_conditions}
                productPlanId={productplan_id}
                name={name}
            />
        </div>
    )
}