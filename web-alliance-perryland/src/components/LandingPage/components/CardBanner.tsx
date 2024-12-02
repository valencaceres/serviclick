import Image, { StaticImageData } from "next/image"
import Wrapper from "../../Wrapper"

interface Props{
    dcto: string,
    name: string,
    image: StaticImageData
}

export default function CardBanner({dcto, name, image}: Props){
    return (
        <div className="flex flex-col items-center max-w-[250px] mx-auto">
            <Image src={image.src} width={160} height={160} alt="" className="mb-4"/>
            <p className="text-center text-white">
                <span className="font-extrabold">{ dcto }% de dscto. </span>
                <span>{ name }</span>
            </p>
        </div>
    )
}