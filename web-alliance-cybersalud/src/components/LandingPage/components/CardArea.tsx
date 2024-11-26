import Image, { StaticImageData } from "next/image"

interface Props{
    image: StaticImageData,
    name: string
}

export default function CardArea({image, name}: Props){
    return (
        <div className="w-48 h-48 relative">
            <Image src={image.src} width={100} height={100} alt="" className="w-full h-full absolute rounded-3xl"/>
            <div className="absolute border-4 text-lg transition-[opacity] rounded-3xl w-full h-full flex items-center justify-center text-green font-bold uppercase text-center px-8 hover:opacity-100 opacity-0 w-full h-full bg-white">
                {name}
            </div>
        </div>
    )
}