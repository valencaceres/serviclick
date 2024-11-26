import Image, { StaticImageData } from "next/image"

interface Props{
    image: StaticImageData,
    name: string,
    price: string,
    detail: string,
    benefits: Array<{
        name: string,
        details: Array<string>
    }>
}

export default function CardBenefit({image, name, price, detail, benefits}: Props){
    return(
        <div>
            <div className="bg-secondary h-5 rounded-t-3xl mb-2"></div>
            <div className="rounded-b-3xl overflow-hidden">
                <Image src={image.src} width={288} height={176} alt="" className="w-full"/>
            </div>
            <div className="text-center pt-4 pb-5">
                <h3 className="text-2xl">{name}</h3>
                <p className="text-3xl font-bold my-1">{price}</p>
                <p className="font-medium">{detail}</p>
            </div>
            <div className="bg-gray pt-4 pb-8 px-8 flex flex-col items-center rounded-b-3xl mb-10">
                <button className="bg-primary h-10 px-8 text-white rounded-full text-xl mb-7">¡Lo quiero!🤩</button>
                <h4 className="font-black text-lg mb-3.5">Beneficios</h4>
                {benefits.map((benefit, i) => (
                    <div key={`card-benefit-detail-${i}`} className="w-full mb-3.5 text-sm">
                        <h5 className="font-extrabold">{benefit.name}</h5>
                        <ul>
                            {benefit.details.map((detail,i) => (
                                <li key={`card-benefit-detail-list-${i}`}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="bg-primary h-5 rounded-t-3xl mb-2"></div>
            <div className="py-2">
                <h4 className="text-center text-2xl font-bold">{name}</h4>
            </div>
            <div className="bg-gray p-8 rounded-b-3xl">
                <p className="text-justify">Verificar carencia de asistencia al descargar brochure. Restricción edad contratante es de los 18 años hasta 69 a... </p>
                <button className="font-bold">Ver más.</button>
                <div className="flex">
                    <button className="bg-primary text-sm text-white h-8 px-4 rounded-lg ml-auto">Descargar PDF</button>
                </div>
            </div>
        </div>
    )
}