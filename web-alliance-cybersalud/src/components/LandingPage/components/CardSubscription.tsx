import Image, { StaticImageData } from "next/image"

interface Props{
    name: string
    image: StaticImageData
}

export default function CardSubscription({image, name}: Props){
    return (
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border border-secondary overflow-hidden mb-4">
                <Image
                    src={image.src}
                    width={100}
                    height={100}
                    alt=""

                    className="w-full h-full"
                />
            </div>
            <h4 className="text-2xl">{name}</h4>
        </div>
    )
}